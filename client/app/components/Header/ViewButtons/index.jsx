import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import mapIcon from './map.svg';
import listIcon from './view-headline.svg';
import bothIcon from './view-stream.svg';

const ViewButtons = ({ onViewChange, view }) => (
  <div className="buttons">
    <button
      className={view === 'map' ? 'selected' : ''}
      onClick={() => onViewChange('map')}
    >
      <img src={mapIcon} alt="Map" title="Map" className="svg" />
    </button>
    <button
      className={view === 'both' ? 'selected' : ''}
      onClick={() => onViewChange('both')}
    >
      <img
        src={bothIcon}
        alt="Both"
        title="Both"
        className="svg"
        style={{ transform: 'rotate(90deg)' }}
      />
    </button>
    <button
      className={view === 'list' ? 'selected' : ''}
      onClick={() => onViewChange('list')}
    >
      <img src={listIcon} alt="List" title="List" className="svg" />
    </button>
  </div>
);

ViewButtons.propTypes = {
  onViewChange: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
};

export default ViewButtons;
