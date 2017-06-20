import React from 'react';
import Footer from './footer';
import './popup.css';

export default class Popup extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="header">
          <img src="../icons/icon19.png" />
          <span>&nbsp;Reactive Extension</span>&nbsp;
        </div>
        <div className="content">
          <p>Here be list</p>
        </div>
        <Footer size="small" />
      </div>
    );
  }
}
