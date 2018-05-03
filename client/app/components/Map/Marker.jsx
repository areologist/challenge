import React from 'react';
import PropTypes from 'prop-types';
import { InfoWindow, Marker } from 'react-google-maps';

const component = ({
  address, isOpen, lat, lng, onToggleOpen,
}) => (
  <Marker
    position={{ lat, lng }}
    onClick={onToggleOpen}
  >
    {isOpen && (
      <InfoWindow onCloseClick={onToggleOpen}>
        <div>{address}</div>
      </InfoWindow>
    )}
  </Marker>
);

component.propTypes = {
  address: PropTypes.string,
  isOpen: PropTypes.bool,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  onToggleOpen: PropTypes.func.isRequired,
};

component.defaultProps = {
  address: '',
  isOpen: false,
};

export default component;
