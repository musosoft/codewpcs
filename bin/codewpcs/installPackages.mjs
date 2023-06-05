// installPackages.mjs
/* eslint-disable no-console */
import { execSync } from 'child_process';
import { readFileSync } from 'fs';

const installPackages = ( destination, srcPackageJson, mode = 'npm' ) => {
	try {
		const packageJson = JSON.parse( readFileSync( srcPackageJson ) );
		if ( mode === 'npm' ) {
			const dependencies = Object.keys( packageJson.dependencies || {} );
			const devDependencies = Object.keys(
				packageJson.devDependencies || {}
			);
			if ( dependencies.length ) {
				execSync( `npm install ${ dependencies.join( ' ' ) }`, {
					cwd: destination,
					stdio: 'inherit',
				} );
				console.log(
					`Executed command: npm install ${ dependencies.join(
						', '
					) } in destination ${ destination }`
				);
			}

			if ( devDependencies.length ) {
				execSync( `npm install -D ${ devDependencies.join( ' ' ) }`, {
					cwd: destination,
					stdio: 'inherit',
				} );
				console.log(
					`Executed command: npm install -D ${ devDependencies.join(
						', '
					) } in destination ${ destination }`
				);
			}
		} else if ( mode === 'composerGlobal' ) {
			const requireDev = Object.keys(
				packageJson[ 'require-dev' ] || {}
			);
			if ( requireDev.length ) {
				try {
					execSync(
						`composer global require --ignore-platform-req=php --dev ${ requireDev.join(
							' '
						) }`,
						{ stdio: 'inherit' }
					);
				} catch ( error ) {
					console.error(
						`Error: Failed to install packages ${ requireDev.join(
							' '
						) }`,
						error
					);
				}
				console.log(
					`Executed command: composer global require --ignore-platform-req=php --dev ${ requireDev.join(
						' '
					) } in destination ${ destination }`
				);
			}
		} else if ( mode === 'composer' ) {
			try {
				execSync( `composer install`, {
					cwd: destination,
					stdio: 'inherit',
				} );
			} catch ( error ) {
				console.error( error );
			}
			console.log(
				`Executed command: composer install in destination ${ destination }`
			);
		}
	} catch ( error ) {
		console.error( 'Error: Failed to install packages', error );
	}
};

export default installPackages;
