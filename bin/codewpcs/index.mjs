#!/usr/bin/env node
/* eslint-disable no-console */
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import updateFiles from './updateFiles.mjs';
import installPackages from './installPackages.mjs';
import createSymlinks from './createSymlinks.mjs';

// Get the target argument
let target = process.argv[ 2 ];
const source = dirname(fileURLToPath(import.meta.url));
const srcNodeModules = resolve( source, '../..', 'node_modules' );
const targetNodeModules = resolve( target, 'node_modules' );
const srcPackageJson = resolve( source, '../..', 'package.json' );
const targetPackageJson = resolve( target, 'package.json' );

const filesToSync = [
	'phpcs.xml.dist',
	'.stylelintrc.js',
	'.stylelintignore',
	'.prettierrc.js',
	'.prettierignore',
	'.eslintrc.js',
	'.eslintignore',
	'.editorconfig',
	'.browserslistrc',
	'.vscode/extensions.json',
	'.vscode/settings.json',
];

async function init() {
	if ( target === undefined ) {
		console.log( `No path specified!\nUsage: codewpcs <path>` );
	} else if ( target === '.' ) {
		target = process.cwd();
	}

	for ( const file of filesToSync ) {
		await updateFiles( file, target );
	}

	if ( existsSync( targetPackageJson ) && existsSync( targetNodeModules ) ) {
		installPackages( target, srcPackageJson );
	} else {
		createSymlinks( srcNodeModules, targetNodeModules );
		createSymlinks( srcPackageJson, targetPackageJson );
	}
}

init();
