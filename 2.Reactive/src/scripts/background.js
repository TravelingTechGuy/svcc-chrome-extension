chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.action) {
    switch(request.action) {
      case 'message':
        console.log('just recived the message: %s', request.message);
        sendResponse({message: 'message recieved!'});
        break;
      case 'optionsChanged':
        console.log('options changed! Number of items: %s', request.items.length);
        localStorage.setItem(request.itemsKey, JSON.stringify(request.items));
        sendResponse({message: 'options saved!'});
        break;
      default:  //unrecognized action - do nothing
        break;
    }
  }
});

const minutes = 1;
let loop = () => {
  console.log(Date.now());
  setTimeout(loop, 1000 * 60 * minutes);
};
loop();
