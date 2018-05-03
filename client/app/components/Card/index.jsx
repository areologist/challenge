import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import mapMarker from './map-marker-circle.svg';
import { Location } from '../types';

const splitAddress = (addr = '') => {
  const [head, ...tail] = addr.split(',');
  return [head, tail.join(',')];
};

const formatCoords = (lat = NaN, lng = NaN) => `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

const Card = ({ hidden, location: { address, lat, lng } }) => (
  <div className="row align-center card" style={{ visibility: hidden ? 'hidden' : '' }}>
    <div className="icon">
      <img src={mapMarker} alt="icon" />
    </div>
    <div className="flex">
      {splitAddress(address)
        .filter(el => !!el)
        .map(content => (<div key={content} className="line">{content}</div>))}
      <div className="coords">
        <a href="#map">{formatCoords(lat, lng)}</a>
      </div>
    </div>
  </div>
);

Card.propTypes = {
  location: Location,
  hidden: PropTypes.bool,
};

Card.defaultProps = {
  hidden: false,
  location: {},
};

export default Card;
