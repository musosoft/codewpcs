# VSCode Lint & Beautify WordPress Code

Easy way to format and fix CSS, JS, and PHP code in VSCode with preconfigured Prettier, ESLint, Stylelint, PHPCS, EditorConfig and Browserlist tools inspired by WordPress and their WPCS coding standardsPrerequisites NodeJS, Composer, VSCode

## Prerequisites NodeJS, Composer 2+, VSCode

You can install them manually or faster with package managers, e.g.:

#### Windows Terminal (Admin)

```
choco install nodejs composer vscode
```

#### Mac Terminal

```
brew install node composer
brew install --cask visual-studio-code
```

#### Ubuntu

```
apt install nodejs composer code
```

## CodeWPCS CLI

This command line utility will automate the whole WPCS setup process for your VSCode. It will update the required files and packages in your project. If there are differences, a side-by-side comparison will run. To save space required packages will be symlinked if possible.

### Install/Update:

```
npm i musosoft/codewpcs -g
```

### Activate in the project:

```
codewpcs <your project path>
```

### Setup VSCode Extensions:

1. A popup will show after the first VSCode run - press "Install" to get all required extensions
2. Open Command Palette and Reload Window: `workbench.action.reloadWindow`

## TODO

-   Scripts integration
-   Markdown lint
-   Autoprefixer support
-   PostCSS support
-   SVGOMG support
-   Use PHPCS globally
