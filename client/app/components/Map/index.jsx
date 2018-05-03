import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import { compose, withProps } from 'recompose';
import Marker from './Marker';
import { Location } from '../types';

const defaultCenter = {
  lat: 39.828175,
  lng: -98.5795,
};
const defaultZoom = 4;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = { locations: [] };
  }

  componentWillMount() {
    const { locations } = this.props;
    this.setState({ locations });
  }

  componentWillReceiveProps({ locations = [] }) {
    this.setState({ locations });
  }

  onToggleOpen(lat, lng) {
    return () => {
      const { locations } = this.state;
      const updated = locations
        .map(location => (location.lat === lat && location.lng === lng ? {
          ...location,
          isOpen: !location.isOpen,
        } : location));
      this.setState({ locations: updated });
    };
  }

  render() {
    const { locations } = this.state;
    const markers = locations
      .map(({
        address, lat, lng, isOpen = false,
      }) => (
        <Marker
          key={`${lat}-${lng}`}
          address={address}
          isOpen={isOpen}
          lat={lat}
          lng={lng}
          onToggleOpen={this.onToggleOpen(lat, lng)}
        />
      ));
    return (
      <GoogleMap
        defaultZoom={defaultZoom}
        defaultCenter={defaultCenter}
      >
        {markers}
      </GoogleMap>
    );
  }
}

Map.propTypes = {
  locations: PropTypes.arrayOf(Location),
};

Map.defaultProps = {
  locations: [],
};

export default compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBu8rCmcE_U2J02EXycLJ9uKM0WsCKh68s&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(Map);
