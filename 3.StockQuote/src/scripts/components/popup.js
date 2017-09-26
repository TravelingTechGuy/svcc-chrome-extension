import React from 'react';
import Footer from './footer';
import './popup.css';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      date: 'Updating...'
    };
    chrome.runtime.sendMessage({action: 'getQuotes'}, function(response) {
      this.setState(response);
    }.bind(this));
  }

  showBadge(badgeText = '', badgeTitle = '', badgeColor = []) {
    chrome.browserAction.setTitle({title: badgeTitle});
    chrome.browserAction.setBadgeText({text: badgeText});
    if(badgeColor.length) {
      chrome.browserAction.setBadgeBackgroundColor({color: badgeColor});
    }
  }

  showSymbols() {
    if(this.state.quotes.length) {
      return (
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Current</th>
              <th>Change</th>
              <th>Percent</th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.quotes.map(quote => {
              return (
                <tr key={quote.symbol}>
                  <td><a href={`https://www.google.com/finance?q=${quote.symbol}`} target="_blank">{quote.symbol}</a></td>
                  <td className="price">{quote.current}</td>
                  <td className={'change ' + (quote.change.startsWith('-') ? 'minus': 'plus')}>{quote.change}</td>
                  <td className={'change pct ' + (quote.changePct.startsWith('-') ? 'minus': 'plus')}>{quote.changePct}</td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
      );
    }
    else {
      return <div>Please add symbols in the Options page</div>;
    }
  }
  render() {
    return (
      <div className="container">
        <div className="header">
          <img src="../icons/svcc.png" width="19" height="19" />
          <span> StockQuote Extension</span>
        </div>
        <div className="content">
          {this.showSymbols()}
          <p/>
          <div className="date">As of {this.state.date}</div>
        </div>
        <Footer size="small" />
      </div>
    );
  }
}
