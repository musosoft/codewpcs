# VSCode Lint & Beautify Wordpress Code
Easy way to format and fix CSS, JS, PHP code with preconfigured Prettier, ESLint, Stylelint, PHPCS, EditorConfig and Browserlist inspired by WordPress and their WPCS coding standards

## Prerequisities:
### NodeJS, Composer, VSCode
You can install them manually or faster with package managers, e.g.:
#### Windows Terminal (Admin)
```choco install nodejs composer vscode```

#### Mac Terminal
```brew install node composer --cask visual-studio-code```

#### Ubuntu 
```apt install nodejs npm composer code```

### First run
1. ``npm install musosoft/vscode-lint-beautify-wordpress-code -g``
2. ``codewpcs <your project path>``
3. Popup will show - press "Install" to get all required VS Code extensions

### TODO
- Global package setup - finish PHP part
- Fix PHPCS VSCode integration on Windows - https://github.com/ObliviousHarmony/vscode-php-codesniffer/issues/55
- WP-Scripts integration
- Markdown lint
- Autoprefixer support
- PostCSS support
- SVGOMG support
