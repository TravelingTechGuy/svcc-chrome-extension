// import * as logic from './logic';
// import {defaultOptions} from './config.json';

// class BackgroundAction {
//   constructor(options) {
//     this.options = options;
//   }

//   updateOptions(options) {
//     this.options = options;
//   }

//   async updateSpot() {
//     let result = await logic.getLatestValues(this.options.sources, this.options.timezone);
//     if(!result.error) {
//       this.latest = result;
//       logic.saveToDB('latest', this.latest);
//     }
//     else {
//       this.latest = logic.loadFromDB('latest');
//     }
//     this.updateBadge();
//   }

//   updateBadge() {
//     let change, changed;
//     let badgeTitle, badgeText, badgeColor;
//     for(let pm of this.latest.results) {
//       if(pm.change !== 0.0) {
//         change = pm.change;
//         changed = pm.name;
//         break;
//       }
//     }
//     if(change > 0) {
//       badgeTitle = `${changed} is up $${Math.abs(change).toFixed(2)}`;
//       badgeText = 'up';
//       badgeColor = [0, 149, 72, 230];
//     }
//     else if(change < 0) {
//       badgeTitle = `${changed} is down $${Math.abs(change).toFixed(2)}`;
//       badgeText = 'down';
//       badgeColor = [214, 39, 40, 230];
//     }
//     else {
//       badgeTitle = 'no change';
//       badgeText = 'same';
//       badgeColor = [64, 133, 244, 230];
//     }
//     chrome.browserAction.setBadgeBackgroundColor({color: badgeColor});
//     chrome.browserAction.setTitle({title: badgeTitle});
//     chrome.browserAction.setBadgeText({text: badgeText});
//   }
// }

// let main = () => {
//   //get options from db. If first time, use default and save them to db
//   let getOptions = () => {
//     let options = logic.loadFromDB('options');
//     if(!options) {
//       options = defaultOptions;
//       logic.saveToDB('options', defaultOptions);
//     }
//     return options;
//   };

//   let options = getOptions();
//   let bg = new BackgroundAction(options);

//   let loop = () => {
//     bg.updateSpot();
//     setTimeout(loop, 1000 * 60 * parseInt(options.interval, 10));
//   };
//   loop();

//   //handle user generated refresh
//   chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
//     if(request.action) {
//       switch(request.action) {
//         case 'refresh':
//           await bg.updateSpot();
//           sendResponse();
//           break;
//         case 'optionsChanged':
//           options = getOptions();
//           bg.updateOptions(options);
//           await bg.updateSpot();
//           sendResponse();
//           break;
//         default:  //unrecognized action - do nothing
//           break;
//       }
//     }
//   });
// };

// main();
