import React from 'react';
import { shallow } from 'enzyme';
import ViewButtons from '../ViewButtons';

const wrapper = shallow((
  <ViewButtons onViewChange={jest.fn()} view="map" />
));

it('smoke test', () => {
  expect(wrapper).not.toBeNull();
});
