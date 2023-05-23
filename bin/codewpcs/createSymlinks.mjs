// createSymlinks.mjs
/* eslint-disable no-console */
import { execSync } from 'child_process';
import { symlinkSync, realpathSync, unlinkSync } from 'fs';

const createSymlinks = async ( src, dest, isFile = false ) => {
	const command = `powershell Start-Process powershell -Verb runAs -ArgumentList 'New-Item -ItemType SymbolicLink -Path "${ dest }" -Value "${ src }"'`;

	try {
		symlinkSync( src, dest, 'junction' );
		if ( realpathSync( dest ) !== src ) {
			throw new Error( 'Symlink creation failed' );
		}
		console.log( `Symlink created from ${ src } to ${ dest }` );
	} catch ( error ) {
		switch ( error.code ) {
			case 'ENOENT':
				if ( isFile ) {
					try {
						unlinkSync( dest );
						console.log(
							`Corrupted Symlink ${ dest } deleted successfully`
						);
						execSync( command );
						console.log(
							`Symlink created from ${ src } to ${ dest }`
						);
					} catch ( err ) {
						console.error(
							`Error while deleting file or executing command: ${ err.message }`
						);
					}
				} else {
					console.error(
						'Failed to create symlink. Directory does not exist.'
					);
				}
				break;
			case 'EPERM':
				console.error(
					'Failed to create symlink. Insufficient privileges.'
				);
				break;
			case 'EEXIST':
				console.error( `Symlink already exists: ${ dest }` );
				break;
			default:
				console.error(
					`Error while creating symlink: ${ error.message }`
				);
				break;
		}
	}
};

export default createSymlinks;
