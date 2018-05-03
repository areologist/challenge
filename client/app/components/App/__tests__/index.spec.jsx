import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import App from '../';

const mockStore = configureStore();
const mockUrl = 'fake-url';
let store;
let wrapper;

beforeEach(() => {
  store = mockStore({});
  wrapper = shallow((<App store={store} url={mockUrl} />)).dive();
});

it('renders Header', () => {
  expect(wrapper.find('Header')).toHaveLength(1);
});

it('renders CardList', () => {
  expect(wrapper.find('CardList')).toHaveLength(1);
});
