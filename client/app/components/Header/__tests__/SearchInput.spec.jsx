import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import SearchInput from '../SearchInput';

const mockStore = configureStore();
let store;
let wrapper;

beforeEach(() => {
  store = mockStore({});
  wrapper = shallow((<SearchInput store={store} />)).dive();
});

it('smoke test', () => {
  expect(wrapper).not.toBeNull();
});
