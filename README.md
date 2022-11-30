# VSCode Lint & Beautify Wordpress Code
Easy way to format and fix code with preconfigured Prettier, ESLint, Stylelint, PHPCS, EditorConfig and Browserlist inspired by WordPress and their coding standards

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
- [Download repository](https://github.com/musosoft/vscode-lint-beautify-wordpress-code/archive/main.zip) and extract into your project
- Open your project's directory in VS Code and in it's terminal `` CTRL/CMD + ` `` run:
```
npm install
composer install
```
- Popup will show - press "Install" to get all required VS Code extensions
- (Windows only) Set absolute paths for phpcs ``phpCodeSniffer.standardCustom`` and phpcs.xml.dist ``phpCodeSniffer.executable`` in .vscode/settings.json

### TODO
- Global package setup
- Fix PHPCS VSCode integration on Windows - https://github.com/ObliviousHarmony/vscode-php-codesniffer/issues/55
- WP-Scripts integration
- Markdown lint
- Autoprefixer support
- PostCSS support
- SVGOMG support
