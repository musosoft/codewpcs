module.exports = {
	extends: [ '@wordpress/stylelint-config/scss' ],
	rules: {
		// Your custom rules here, e.g.: 'no-descending-specificity': null
	},
	overrides: [
		{
			files: [ '**/*.css', '**/*.scss' ],
		},
	],
};
