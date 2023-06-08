/* eslint-disable no-console */
import {
	existsSync,
	statSync,
	readdirSync,
	readFileSync,
	mkdirSync,
	writeFileSync,
} from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import diffFiles from './diffFiles.mjs';

const updateFiles = async ( src, dest ) => {
	try {
		// Calculate the source and destination paths
		const srcPath = resolve(
			dirname( fileURLToPath( import.meta.url ) ),
			'../..',
			src
		);
		const destPath = resolve( dest, src );

		// Check if the file or directory exists
		if ( existsSync( destPath ) ) {
			// Get the stats for the file or directory
			const destStats = statSync( destPath );

			// Check if it's a directory
			if ( destStats.isDirectory() ) {
				// Read the directory contents
				const srcFiles = readdirSync( srcPath );
				const destFiles = readdirSync( destPath );

				// Iterate through all the files in both directories
				for ( const file of srcFiles ) {
					// Check if the file exists in the destination directory
					if ( destFiles.includes( file ) ) {
						// Recursively call updateFiles for this file
						await updateFiles( `${ src }/${ file }`, dest );
					} else {
						// Copy the file from the source directory to the destination directory
						const data = readFileSync( `${ srcPath }/${ file }` );
						if (
							! existsSync( dirname( `${ destPath }/${ file }` ) )
						) {
							mkdirSync( dirname( `${ destPath }/${ file }` ), {
								recursive: true,
							} );
						}
						writeFileSync( `${ destPath }/${ file }`, data, {
							flag: 'wx',
						} );
						console.log( `${ src } was copied to ${ dest }` );
					}
				}
			} else {
				const srcFileHash = createHash( 'sha1' )
					.update( readFileSync( srcPath ) )
					.digest( 'hex' );
				const destFileHash = createHash( 'sha1' )
					.update( readFileSync( destPath ) )
					.digest( 'hex' );

				if ( srcFileHash !== destFileHash ) {
					console.log(
						`File ${ src } has changes in ${ dest }\nRunning vscode.diff to show differences`
					);
					await diffFiles( srcPath, destPath );
				} else {
					console.log(
						`${ src } is already up to date in ${ dest }`
					);
				}
			}
		} else {
			// Create directory if not exist
			if ( ! existsSync( dirname( destPath ) ) ) {
				mkdirSync( dirname( destPath ), {
					recursive: true,
				} );
			}
			// Copy the file from the source directory to the destination directory
			const data = readFileSync( srcPath );
			writeFileSync( destPath, data, {
				flag: 'wx',
			} );
			console.log( `${ src } was copied to ${ dest }` );
		}
	} catch ( err ) {
		console.error( `Error while updating files: ${ err.message }` );
	}
};

export default updateFiles;
