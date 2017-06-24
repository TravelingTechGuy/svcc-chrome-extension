import React from 'react';
import Footer from './footer';
import './options.css';

export default class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: []};
    this._addItem = this.addItem.bind(this);
    this._removeItem = this.removeItem.bind(this);
    this._saveItems = this.saveItems.bind(this);
    this._sendAMessage = this.sendAMessage.bind(this);
    this.loadItems();
  }

  //add item to list
  addItem() {
    let newValue = document.getElementById('option').value.toString().trim();
    if(newValue) {
      this.setState({items: this.state.items.concat(newValue)});
    }
  }

  //remove item from list
  removeItem(e) {
    let index = e.target.dataset.index;
    let temp = this.state.items;
    temp.splice(index, 1);
    this.setState({items: temp});
  }

  //send a message
  sendAMessage() {
    let message = {
      action: 'message',
      message: `there are ${this.state.items.length} items in the list`
    };
    chrome.runtime.sendMessage(message, response => console.log('message: %s', response.message));
  }

  //have background page load items for us
  loadItems() {
    chrome.runtime.sendMessage({action: 'loadItems'}, response => this.setState({items: response.items}));
  }

  //pass items to background page for local storage persistence
  saveItems() {
    let message = {
      action: 'saveOptions',
      items: this.state.items
    };
    chrome.runtime.sendMessage(message, response => {
      console.log('message: %s', response.message);
      window.close();
    });
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <img src="../icons/icon48.png" />
          <span>&nbsp;Reactive Extension Options Page</span>
        </div>
        <div>
          <input type="text" id="option" />
          <button onClick={this._addItem}>Add</button>
        </div>
        <p/>
        <div>
          {
            this.state.items.map((item, index) =>
              <div className="item" key={item+index}>
                <span data-index={index} className="btnDelete" onClick={this._removeItem}></span>
                {index + 1}. {item}
              </div>
            )
          }
        </div>
        <p/>
        <button onClick={this._sendAMessage}>Send a message to background</button>
        <button onClick={this._saveItems}>Save options and close window</button>
        <p/>
        <Footer size="large" />
      </div>
    );
  }
}
