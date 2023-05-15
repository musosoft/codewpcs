// createSymlinks.mjs
/* eslint-disable no-console */
import { symlinkSync } from 'fs';

const createSymlinks = async ( src, dest ) => {
	try {
		symlinkSync( src, dest, 'junction' );
		console.log( `Symlink created from ${ src } to ${ dest }` );
	} catch ( error ) {
		if ( error.code === 'EPERM' ) {
			console.error(
				'Failed to create symlink, try again with administrator privileges...'
			);
		} else if ( error.code !== 'EEXIST' ) {
			console.error( `Error while creating symlink: ${ error.message }` );
		}
	}
};

export default createSymlinks;
