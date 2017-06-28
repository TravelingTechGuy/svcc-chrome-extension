import React from 'react';
import PropTypes from 'prop-types';
import './footer.css';

export default class Footer extends React.Component {
  render() {
    let size = 'footer ' + this.props.size;
    return (
      <div className={size}>
        <a href="http://www.travelingtechguy.com" target="_blank">Traveling Tech Guy</a>
        <span>&nbsp;&copy;&nbsp;{new Date().getFullYear()}</span>
      </div>
    );
  }
}

Footer.propTypes = {
  size: PropTypes.string
};
