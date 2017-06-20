import React from 'react';
import Footer from './footer';
import './options.css';

export default class Options extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="header">
          <img src="../icons/icon48.png" />
          <span>&nbsp;Reactive Extension Options Page</span>
        </div>
        <div>Here be options</div>
        <Footer size="large" />
      </div>
    );
  }
}
