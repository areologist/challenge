import React from 'react';
import { shallow } from 'enzyme';
import { InfoWindow } from 'react-google-maps';
import Marker from '../Marker';

const toggleOpen = jest.fn();
const wrapper = shallow((
  <Marker
    address={null}
    isOpen={false}
    lat={0}
    lng={0}
    onToggleOpen={toggleOpen}
  />
));

test('info window hidden when isOpen is false', () => {
  expect(wrapper.find(InfoWindow)).toHaveLength(0);
});

test('info window rendered when isOpen is true', () => {
  wrapper.setProps({ isOpen: true });
  expect(wrapper.find(InfoWindow)).toHaveLength(1);
});
