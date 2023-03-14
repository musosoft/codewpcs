/* eslint-disable no-console */
import { execSync } from 'child_process';

const installPackages = ( destination, srcPackageJson ) => {
	try {
		const packageJson = require( srcPackageJson );
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
				`Executed the npm install command for dependencies ${ dependencies.join(
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
				`Executed the npm install -D command for devDependencies ${ devDependencies.join(
					', '
				) } in destination ${ destination }`
			);
		}
	} catch ( error ) {
		console.error( 'Error: Failed to install packages', error );
	}
};

export default installPackages;
