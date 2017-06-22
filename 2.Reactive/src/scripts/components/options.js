import React from 'react';
import Footer from './footer';
import './options.css';
const itemsKey = 'options';

export default class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: this.loadItems()};
    this._addItem = this.addItem.bind(this);
    this._removeItem = this.removeItem.bind(this);
    this._saveItems = this.saveItems.bind(this);
  }

  loadItems() {
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
  }

  saveItems() {
    localStorage.setItem(itemsKey, JSON.stringify(this.state.items));
    window.close();
  }

  addItem() {
    let newValue = document.getElementById('option').value.toString().trim();
    if(newValue) {
      this.setState({items: this.state.items.concat(newValue)});
    }
  }

  removeItem(e) {
    let index = e.target.dataset.index;
    let temp = this.state.items;
    temp.splice(index, 1);
    this.setState({items: temp});
  }

  sendMessage() {
    chrome.runtime.sendMessage({action: 'optionsChanged'}, response => {
      console.log('message: %s', response.message);
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
        <div>
          {
            this.state.items.map((item, index) =>
              <div className="item" key={item+index}>
                <span data-index={index} className="btnDelete" onClick={this._removeItem}></span>
                {index + 1}. {item}
              </div>
            )
          }</div>
        <p/>
        <button onClick={this.sendMessage}>Send message to background</button>
        <button onClick={this._saveItems}>Save options and close window</button>
        <p/>
        <Footer size="large" />
      </div>
    );
  }
}
