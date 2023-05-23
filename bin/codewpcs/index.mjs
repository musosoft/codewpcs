#!/usr/bin/env node
// index.mjs
/* eslint-disable no-console */
import { existsSync, lstatSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import { exec } from 'child_process';
import updateFiles from './updateFiles.mjs';
import installPackages from './installPackages.mjs';
import createSymlinks from './createSymlinks.mjs';

async function getSourceComposer() {
	const { stdout } = await promisify( exec )(
		'composer config --global home'
	);
	return stdout.trim();
}

let target = process.argv[ 2 ];
const source = dirname( fileURLToPath( import.meta.url ) );
let sourceComposer = '';

try {
	sourceComposer = await getSourceComposer();
	console.log( 'Composer global path: ', sourceComposer );
} catch ( err ) {
	console.error( err );
}

const srcNodeModules = resolve( source, '../..', 'node_modules' );
const targetNodeModules = resolve( target, 'node_modules' );
const srcPackageJson = resolve( source, '../..', 'package.json' );
const targetPackageJson = resolve( target, 'package.json' );
const srcVendor = resolve( sourceComposer, 'vendor' );
const targetVendor = resolve( target, 'vendor' );
const srcComposerJson = resolve( source, '../..', 'composer.json' );
const targetComposerJson = resolve( target, 'composer.json' );
const srcPHPCS = resolve( srcVendor, 'bin', 'phpcs' );

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
	if ( ! target ) {
		console.log( `No path specified!\nUsage: codewpcs <path>` );
		return;
	}

	target = target === '.' ? process.cwd() : target;

	for ( const file of filesToSync ) {
		await updateFiles( file, target );
	}

	if (
		! existsSync( targetPackageJson ) &&
		! existsSync( targetNodeModules )
	) {
		createSymlinks( srcNodeModules, targetNodeModules );
		createSymlinks( srcPackageJson, targetPackageJson, true );
	} else if (
		( existsSync( targetNodeModules ) &&
			! lstatSync( targetNodeModules ).isSymbolicLink() ) ||
		( existsSync( targetPackageJson ) &&
			! lstatSync( targetPackageJson ).isSymbolicLink() )
	) {
		installPackages( target, srcPackageJson, 'npm' );
	}

	if ( ! existsSync( srcPHPCS ) ) {
		installPackages( null, srcComposerJson, 'composerGlobal' );
	}

	if ( ! existsSync( targetComposerJson ) || ! existsSync( targetVendor ) ) {
		createSymlinks( srcVendor, targetVendor );
		createSymlinks( srcComposerJson, targetComposerJson, true );
	} else if (
		( existsSync( targetVendor ) &&
			! lstatSync( targetVendor ).isSymbolicLink() ) ||
		( existsSync( targetComposerJson ) &&
			! lstatSync( targetComposerJson ).isSymbolicLink() )
	) {
		installPackages( target, srcComposerJson, 'composer' );
	}
}

init();
