// diffFiles.mjs
/* eslint-disable no-console */
import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const vscodeExecutable = ( () => {
	try {
		if ( process.platform === 'win32' ) {
			execSync( `powershell Get-Command -Name codium`, {
				stdio: 'ignore',
			} );
		} else {
			execSync( `which codium`, { stdio: 'ignore' } );
		}
		return 'codium';
	} catch {
		try {
			if ( process.platform === 'win32' ) {
				execSync( `powershell Get-Command -Name code-insiders`, {
					stdio: 'ignore',
				} );
			} else {
				execSync( `which code-insiders`, { stdio: 'ignore' } );
			}
			return 'code-insiders';
		} catch {
			return 'code';
		}
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
