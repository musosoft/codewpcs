# VSCode Lint & Beautify Wordpress Code
Easy way to format and fix code with preconfigured Prettier, ESLint, Stylelint, PHPCS, EditorConfig and Browserlist inspired by WordPress and their coding standards

## Prerequisities:
### NodeJS, Composer, VSCode, Git
You can install them manually or faster with package managers, e.g.:
#### Windows Terminal (Admin)
```choco install nodejs composer vscode git```

#### Mac Terminal
```brew install node composer --cask visual-studio-code```

#### Ubuntu 
```apt install nodejs npm composer vscode git```

### First run
- [Download repository](https://github.com/musosoft/vscode-lint-beautify-wordpress-code/archive/main.zip) and extract into your project
- Open your project's directory in VS Code and in it's terminal `` CTRL/CMD + ` `` run:
```
npm install
composer install
```
- Change path for ``phpCodeSniffer.standardCustom`` and ``phpCodeSniffer.executable`` in .vscode/settings.json
- Popup will show - press "Install" to get all required extensions

### TODO
- Fix PHPCS VSCode integration
- WP-Scripts integration
- Markdown lint
- Autoprefixer support
- PostCSS support
- SVGOMG support
