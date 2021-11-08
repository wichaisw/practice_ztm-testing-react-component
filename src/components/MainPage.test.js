import React from 'react';
import { shallow  } from 'enzyme';
import MainPage from './MainPage';

it('expect to render MainPage component', () => {
  const mockStore = {
    robots: [],
    searchField: ''
  }
  expect(shallow(<MainPage store={mockStore} />)).toMatchSnapshot();
});