# Basic Extension

## New Concepts

### 1. Folder structure

```
|
--|manifest.json
--|_locales
  --|messages.json
--|icons
  --|icon16.png
  --|icon19.png
  --|icon48.png
  --|icon128.png
background.html
background.js
options.html
popup.html
```

### 2. Extension parts

1. **Manifest** - tells Chrome all the essentials about the extension, assigns the various components and icons, and sets permissions and security.
1. **Messages** - contain the extension's name and description. Provide I18N support.
1. **Icons** - a place to hold all icons and images the extension needs.
1. **Popup page** - will be shown when the extension icon is clicked [Not mandatory].
1. **Options page** - allows settings management for the extension [Not mandatory].
1. **Background page** - either an HTML or a Javascript file (or both) that run constantly in the background. Useful for carriying out async tasks, network operations and monitoring.

### 3. Loading an extension

1. Open Chrome and select More Tools > Extensions from the 3-dot settings menu.
1. Check the "Developer mode" check box.
1. Click "Load unpacked extension" and point to the folder containing your manifest.
1. After the extension loaded, observe its icon, and debug its multiple parts using Developer Tools.
1. While developing an extension, make sure the "Collect Errors" checkbox is checked, so you can debug ecvery error.