import React from 'react';
import { shallow } from 'enzyme';
import Header from '../';

const viewChange = jest.fn();
const view = 'map';

const wrapper = shallow((
  <Header onViewChange={viewChange} view={view} />
));

test('smoke test', () => {
  expect(wrapper.find('header')).toHaveLength(1);
});
