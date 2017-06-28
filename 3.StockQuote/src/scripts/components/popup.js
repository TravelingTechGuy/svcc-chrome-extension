import React from 'react';
import Footer from './footer';
import './popup.css';

export default class Popup extends React.Component {
  showBadge(badgeText = '', badgeColor = []) {
    chrome.browserAction.setBadgeBackgroundColor({color: badgeColor});
    chrome.browserAction.setTitle({title: badgeText});
    chrome.browserAction.setBadgeText({text: badgeText});
  }

  showSuccessBadge() {
    this.showBadge('Yay!', [0, 149, 72, 230]);
  }

  showFailureBadge() {
    this.showBadge('No!!!', [214, 39, 40, 230]);
  }

  hideBadge() {
    showBadge();
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <img src="../icons/icon19.png" />
          <span>&nbsp;StockQuote Extension</span>&nbsp;
        </div>
        <div className="content">
          <p>Here be list</p>
          <button onClick={this.showSuccessBadge}>Success badge</button>
          <button onClick={this.showFailureBadge}>Failure badge</button>
          <button onClick={this.hideBadge}>Hide badge</button>
        </div>
        <Footer size="small" />
      </div>
    );
  }
}
