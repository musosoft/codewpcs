/* eslint-disable no-console */
import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const vscodeExecutable = ( () => {
	try {
		execSync( `which codium`, { stdio: 'ignore' } );
		return 'codium';
	} catch ( error ) {
		return 'code';
	}
} )();

const diffFiles = async ( srcPath, destPath ) => {
	try {
		const srcStats = lstatSync( srcPath );
		if ( srcStats.isDirectory() ) {
			const subFiles = readdirSync( srcPath );
			for ( const subFile of subFiles ) {
				const subSrcPath = join( srcPath, subFile );
				const subDestPath = join( destPath, subFile );
				await diffFiles( subSrcPath, subDestPath );
			}
		} else {
			const command = `${ vscodeExecutable } --diff ${ srcPath } ${ destPath }`;
			const { stdout } = execSync( command, { encoding: 'utf-8' } );
			if ( stdout ) {
				console.log( `vscode.diff output: ${ stdout }` );
			}
		}
	} catch ( err ) {
		console.error( `Error while running vscode.diff: ${ err.message }` );
	}
};

export default diffFiles;
