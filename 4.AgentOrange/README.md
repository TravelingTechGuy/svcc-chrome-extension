# AgentOrange Extension

This extension demonstrates another type of extension, one that manipulates the content the user has loaded. This one simply corrects the name and language of articles where a certain... shall we call him "president".. is mentioned.

## New Concepts

### 1. Content Script

In place of popup and options views, we have a script that runs in the background, and does not have to have any visual side effects, if we so choose. This script operates on the *content* of the page, and can traverse, or manipulate the DOM.

As can be seen, this extension has no HTML pages, nor does it require React (or even Webpack - although we may choose to use it to uglify the resulting Javascript).

The content script is declared in the `manifest.json` file:

```json
"content_scripts": [
  {
    "matches": ["http://*/*", "http://*/*"],
    "js": ["content.js"],
    "run_at": "document_end"
  }
],
```

There are 3 parts to the declaration:

1. The script/s (can be more than one).
1. Which pages should it operate on. In this case, we want it to operate on all pages.
1. When should it run. In our case, we wait for the entire DOM to load, before manipulating it. But we can choose to operate before DOM loading (think about an Ad Blocker, preventing certain scripts and images from loading).

The script itself is plain Javascript + DOM. You can use jQuery, if you're accustomed to its brand of DOM manipulation. Just remember - keep it light and efficient! Unlike our other extensions, we're operating on an existing page, and by definition, adding load and execution time. If you make the experience unbarable, the user will deactivate your extension.

### 2. Intra-extension communication

For security reasons, a content script cannot execute any of the `chrome.browserAction.*` functions. If we want to show a badge, we need to have a background script (we do not need a page here).

```json
"background": {
  "scripts": ["background.js"]
},
```

If manipulating the icon is not necessary for your functionality, you can skip this part.

### 3. Icons

Icons are not strictly necessary when buildiong a content script. However, due to security concerns, Google will show an icon for ***every*** extension running in the user's browser. If you don't provide one yourself, the user will see a default inactive icon, showing the first letter of the extension's name, in the browser's bar. It'll show a default "puzzle" icon in the extensions screen. If you want to control your message, provide icons of your own. Also, since a regular content extension cannot manipulate the icon on its own (see 2), even your icon will firts appear to be inactive, unless you specify a browser action in `manifest.json`:

```json
"browser_action": {
  "default_icon": "icons/icon19.png"
},
```

## Logic

The extension has 2 parts:

1. The **Content** script traverses the DOM and replaces words.
1. The **Backround** script shows the replacemnet results as a badge on the icon.
