# VSCode Lint & Beautify Wordpress Code

Easy way to format and fix CSS, JS, PHP code in VSCode with preconfigured Prettier, ESLint, Stylelint, PHPCS, EditorConfig and Browserlist tools inspired by WordPress and their WPCS coding standards

## Prerequisities NodeJS, Composer, VSCode

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
apt install nodejs npm composer code
```

## CodeWPCS CLI

This command line utility will automate the whole WPCS setup process for your VSCode. It will update required files and packages in your project. If there are differences, side-by-side comparison will run. To save space required packages will be symlinked if possible.

### Install/Update:

```
npm i musosoft/codewpcs -g
```

### Activate in project:

```
codewpcs <your project path>
```

### Setup VSCode Extensions:

1. Popup will show after first VSCode run - press "Install" to get all required extensions
2. Open Command palette and Reload Window: `workbench.action.reloadWindow`

## TODO

-   Scripts integration
-   Markdown lint
-   Autoprefixer support
-   PostCSS support
-   SVGOMG support
-   EditorConfig VSCode integration
