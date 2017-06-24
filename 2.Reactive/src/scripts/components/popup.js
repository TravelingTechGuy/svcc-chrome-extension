import React from 'react';
import Footer from './footer';
import './popup.css';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: []};
    this._showSuccessBadge = this.showBadge.bind(this, 'Yay!', [0, 149, 72, 230]);
    this._showFailureBadge = this.showBadge.bind(this, 'No!!!', [214, 39, 40, 230]);
    this._hideBadge = this.showBadge.bind(this, '');
    this.loadItems();
  }

  showBadge(badgeText = '', badgeColor = []) {
    chrome.browserAction.setTitle({title: badgeText});
    chrome.browserAction.setBadgeText({text: badgeText});
    if(badgeColor.length) {
      chrome.browserAction.setBadgeBackgroundColor({color: badgeColor});
    }
  }

  //have background page load items for us
  loadItems() {
    chrome.runtime.sendMessage({action: 'loadItems'}, response => this.setState({items: response.items}));
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <img src="../icons/icon19.png" />
          <span>&nbsp;Reactive Extension</span>&nbsp;
        </div>
        <div className="content">
          <p/>
           <div>
            {
              this.state.items.map((item, index) =>
                <div className="item" key={item+index}>{index + 1}. {item}</div>
              )
            }
          </div>
          <p/>
          <button onClick={this._showSuccessBadge}>Success badge</button>
          <button onClick={this._showFailureBadge}>Failure badge</button>
          <button onClick={this._hideBadge}>Hide badge</button>
        </div>
        <Footer size="small" />
      </div>
    );
  }
}
