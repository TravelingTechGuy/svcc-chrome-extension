//Background is only here to change the icon's title,
//since a content script can't access chrome.browserAction.*

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let title, badge, color;
  if(request.replacements) {
    title = `Corrections made: ${request.replacements}`;
    badge = 'Booo!';
    color = [214, 39, 40, 230];
  }
  else {
    title = 'Congrats! your page is Drumpf-free!';
    badge = 'Yay!!!';
    color = [0, 149, 72, 230];
  
  }
  chrome.browserAction.setBadgeText({text:  badge});
  chrome.browserAction.setBadgeBackgroundColor({color: color});
  chrome.browserAction.setTitle({title: title});
  let style = 'background-color: blue; color: white; font-size:15px;';
  console.log(`%c${title}`, style);
  sendResponse();
});
