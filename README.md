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
1.
```
git clone git@github.com:musosoft/vscode-lint-beautify-wordpress-code.git
npm install -g
codewpcs <your project path>
```
2. Popup will show - press "Install" to get all required VS Code extensions
3. (Windows only) Set absolute paths for phpcs ``phpCodeSniffer.standardCustom`` and phpcs.xml.dist ``phpCodeSniffer.executable`` in .vscode/settings.json

### TODO
- Global package setup - finish PHP part
- Fix PHPCS VSCode integration on Windows - https://github.com/ObliviousHarmony/vscode-php-codesniffer/issues/55
- WP-Scripts integration
- Markdown lint
- Autoprefixer support
- PostCSS support
- SVGOMG support
