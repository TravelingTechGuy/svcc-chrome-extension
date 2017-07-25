# Reactive Extension

## New Concepts

### 1. Using React

1. [React](https://facebook.github.io/react/) is used in our popup and options page.
1. [Webpack](https://webpack.github.io/) packs our code into 3 scripts and creates the final distributed version.
1. We make use of [babel](https://babeljs.io/) to transpile the JSX/ES6 code, and [ESLint](eslint.org/) to lint it for syntactical/style errors.

### 2. Intra-extension communication

1. Using `chrome.runtime.sendMessage` to send a message from views.
1. Using `chrome.runtime.onMessage.addListener` in the background, to listen to incoming messages, and handle requests.

### 3. Extension badge manipulation

1. `chrome.browserAction.setTitle({title: badgeText})` to set the extension's title (hover).
1. `chrome.browserAction.setBadgeText({text: badgeText})` to set the extension's text (max 8 chars).
1. `chrome.browserAction.setBadgeBackgroundColor({color: badgeColor})` to set the badge color.

### 4. Local Storage is used to save our settings

1. `localStorage.setItem(key, value)` - to persist a string (or `JSON.stringify` an object) in local storage.
1. `localStorage.getItem(key)` - to retrieve a presisted value. We can then `JSON.parse` it.
1. Storage is accessible to all parts of the extension, and is persisted as long as the extension is installed, as long as data is not deleted or cleaned.

## Installing the sample

1. Install NodeJS and NPM (see [NodeJS site](https://nodejs.org/)).
1. Open a console/command window.
1. Clone this repo:
    ```bash
    git clone https://github.com/TravelingTechGuy/svcc-chrome-extension.git
    ```
1. Install webpack globally:
    ```bash
    npm install -g webpack
    ```
1. Go to this sample's folder, and install all the dependencies:
    ```bash
    cd /svcc-chrome-extension/2.Reactive
    npm i
    ```
1. Build the extension:
    ```bash
    $ npm run build

    > reactive-extension@1.0.0 build svcc-chrome-extension/2.Reactive
    > webpack

    This is a development build with 2 plugins

    WebpackCleanupPlugin: 0 file(s) deleted.
    Hash: 2e4536209ed8738f6041
    Version: webpack 3.0.0
    Time: 4502ms
                        Asset       Size  Chunks                    Chunk Names
            icons/icon128.png     6.4 kB          [emitted]
            scripts/popup.js     773 kB       0  [emitted]  [big]  popup
        scripts/background.js    3.82 kB       2  [emitted]         background
        scripts/popup.js.map     930 kB       0  [emitted]         popup
      scripts/options.js.map     933 kB       1  [emitted]         options
    scripts/background.js.map    5.33 kB       2  [emitted]         background
    _locales/en/messages.json  244 bytes          [emitted]
          scripts/options.js     774 kB       1  [emitted]  [big]  options
            icons/icon16.png  523 bytes          [emitted]
            icons/icon19.png  523 bytes          [emitted]
            icons/icon48.png     1.5 kB          [emitted]
                manifest.json  718 bytes          [emitted]
              background.html  100 bytes          [emitted]
                options.html  275 bytes          [emitted]
                  popup.html  231 bytes          [emitted]
    [191] ./src/scripts/popup.js 430 bytes {0} [built]
    [195] ./src/scripts/options.js 440 bytes {1} [built]
    [199] ./src/scripts/background.js 1.28 kB {2} [built]
        + 197 hidden modules
    ```
1. Load the built extension from the folder svcc-chrome-extension/2.Reactive/build in the Chrome extensions page.
1. Profit.

## Building for production

To pack the extension for production - distribution through the Chrome web store, we need to add 2 more steps to the Webpack pipeline - minification and zipping.

### Minification

We'd like our code to be minified for 2 reasons:

1. Make it smaller
1. Make it harder to reverse-engineer

Webpack comes pre-installed with an UglifyJS plugin, accssible through the `webpack.optimize.UglifyJsPlugin` object. Sadly, as of this time (7/2017) the built-in plugin does not support ES6. To get around this, we'll use a beta version of the `uglifyjs-webpack-plugin`, which usues `uglify-es` in place of `uglify-js`. Install it using:

```bash
$ npm install uglifyjs-webpack-plugin@1.0.0-beta.1
```

You can then use it in code to minify/uglify your code:

```javascript
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
...
  new UglifyJSPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    })
```

*I hope to revisit this section in the future, and report that Webpack caugt up to ES6.*

### Zipping

The web store expects you to upload a zip file. Using the `zip-webpack-plugin` allows us to easily zip the necessary files and folders, while maintaining the directory structure necessary.

Once you are ready to distribute your extewnsion, simply run:

```bash
$ npm run dist
```

You'll find the zip file, with the current version of the extension in its name, in the `dist` folder.

## Logic

The extension has 3 parts:

1. The **Popup** view shows items (strings) in a simple list.
    1. It communicates with the background page to get the list of items from persisted local storage.
    1. It demonstrates how to manipulate the extension's badge.
1. The **Options** view allows adding/removing items to/from the list.
    1. It demonstartes sending messages to the background page, and receiving a response.
    1. It gets the list from local storage, through the bacground page.
    1. The new list is saved to local storage upon request, through the bacground page.
1. The **Backround** page handles all the local storage logic.
    1. It has a message loop to listen to and handle incoming message.
    1. It has a loop that executes an operation every *n* minutes - for now, it does nothing. We'll use it in the next sample.
