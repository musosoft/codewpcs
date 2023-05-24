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

async function init() {
	const target =
		process.argv[ 2 ] === '.' ? process.cwd() : process.argv[ 2 ];

	if ( ! target ) {
		console.log( `No path specified!\nUsage: codewpcs <path>` );
		return;
	}

	const source = dirname( fileURLToPath( import.meta.url ) );
	const sourceComposer = await getSourceComposer();
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

	for ( const file of filesToSync ) {
		await updateFiles( file, target );
	}

	const shouldCreateSymLinks = ( path1, path2 ) =>
		! existsSync( path1 ) && ! existsSync( path2 );
	const shouldInstallPackages = ( path1, path2 ) =>
		( existsSync( path1 ) && ! lstatSync( path1 ).isSymbolicLink() ) ||
		( existsSync( path2 ) && ! lstatSync( path2 ).isSymbolicLink() );

	if ( shouldCreateSymLinks( targetPackageJson, targetNodeModules ) ) {
		createSymlinks( srcNodeModules, targetNodeModules );
		createSymlinks( srcPackageJson, targetPackageJson, true );
	} else if (
		shouldInstallPackages( targetNodeModules, targetPackageJson )
	) {
		installPackages( target, srcPackageJson, 'npm' );
	}

	if ( ! existsSync( srcPHPCS ) ) {
		installPackages( null, srcComposerJson, 'composerGlobal' );
	}

	if ( shouldCreateSymLinks( targetComposerJson, targetVendor ) ) {
		createSymlinks( srcVendor, targetVendor );
		createSymlinks( srcComposerJson, targetComposerJson, true );
	} else if ( shouldInstallPackages( targetVendor, targetComposerJson ) ) {
		installPackages( target, srcComposerJson, 'composer' );
	}
}

init();
