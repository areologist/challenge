import React from 'react';
import { shallow } from 'enzyme';
import Map from '../';

const wrapper = shallow((
  <Map locations={[]} />
));

test('smoke test', () => {
  expect(wrapper).not.toBeNull();
});
