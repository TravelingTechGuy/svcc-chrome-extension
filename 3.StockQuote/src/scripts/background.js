import moment from 'moment-timezone';
import * as logic from './logic';
const defaultOptions = {symbols: [], interval: '5', timezone: 'America/Los_Angeles'};

class BackgroundAction {
  constructor(options) {
    this.options = options;
  }

  updateOptions(options) {
    this.options = options;
  }

  async updateQuotes() {
    let result = await logic.getLatestQuotes(this.options.symbols);
    result.date = moment().tz(this.options.timezone).format('M/D/YYYY hh:mma z');
    if(!result.error) {
      this.latest = result;
      logic.saveToDB('latest', this.latest);
    }
    else {
      this.latest = logic.loadFromDB('latest');
    }
    chrome.browserAction.setTitle({title: `last updated: ${this.latest.date}`});
  }
}

let main = () => {
  //get options from db. If first time, use default and save them to db
  let getOptions = () => {
    let options = logic.loadFromDB('options');
    if(!options) {
      options = defaultOptions;
      logic.saveToDB('options', defaultOptions);
    }
    return options;
  };

  let options = getOptions();
  let bg = new BackgroundAction(options);

  let loop = () => {
    bg.updateQuotes();
    setTimeout(loop, 1000 * 60 * parseInt(options.interval, 10));
  };
  loop();

  //handle view actions
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action) {
      switch(request.action) {
        case 'getQuotes':
          sendResponse(bg.latest);
          break;
        case 'getOptions':
          sendResponse(options);
          break;
        case 'optionsChanged':
          options = request.options;
          bg.updateOptions(options);
          logic.saveToDB('options', options);
          bg.updateQuotes();
          sendResponse({message: 'options saved'});
          break;
        case 'checkSymbol':
          logic.checkSymbolValidity(request.symbol).then(result => sendResponse({result: result}));
          break;
        default:  //unrecognized action - do nothing
          break;
      }
    }
    return true;
  });
};

main();
