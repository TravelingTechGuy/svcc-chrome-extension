chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.action) {
    switch(request.action) {
      case 'optionsChanged':
        console.log('options changed!');
        sendResponse();
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
