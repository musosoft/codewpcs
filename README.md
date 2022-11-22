# VSCode Lint & Beautify Wordpress Code
Easy way to format and fix code with preconfigured Prettier, ESLint, Stylelint, PHPCS, EditorConfig and Browserlist inspired by WordPress and their coding standards

## Prerequisities:
### NPM and Composer
#### Windows Terminal (Admin)
```choco install nodejs composer```

#### Mac Terminal
```brew install node composer```

### VSCode Extensions
Prettier https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
Eslint https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
Stylelint https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint
<!-- PHPCS https://marketplace.visualstudio.com/items?itemName=obliviousharmony.vscode-php-codesniffer -->
<!-- EditorConfig https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig -->

### Adding to project manually
npm i -D eslint prettier@npm:wp-prettier browserslist @wordpress/stylelint-config @wordpress/browserslist-config @wordpress/eslint-plugin @wordpress/prettier-config @wordpress/scripts 

### TODO
- PHPCS integration
- WP-Scripts integration
- Markdown lint
- Autoprefixer support
- PostCSS support
- SVGOMG support
