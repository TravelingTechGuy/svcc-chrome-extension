const itemsKey = 'options';

//read items from local storage
const loadItems = () => {
  let result = [];
  let items = localStorage.getItem(itemsKey);
  if(items) {
    try {
      result = JSON.parse(items);
    }
    catch(ex) {
      console.error('cannot parse items');
    }
  }
  return result;
};

//save items to local storage
const saveItems = value => {
  localStorage.setItem(itemsKey, JSON.stringify(value));
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.action) {
    switch(request.action) {
      case 'message':
        console.log('just recived the message: %s', request.message);
        sendResponse({message: 'message recieved!'});
        break;
      case 'loadItems':
        console.log('loading items from storage');
        sendResponse({items: loadItems()});
        break;
      case 'saveOptions':
        console.log('options changed! Number of items: %s', request.items.length);
        saveItems(request.items);
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
