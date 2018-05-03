import PropTypes from 'prop-types';

export const Location = PropTypes.shape({
  address: PropTypes.string,
  lat: PropTypes.number,
  lng: PropTypes.number,
});

export default {
  Location,
};
