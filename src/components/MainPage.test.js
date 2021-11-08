import React from 'react';
import { shallow  } from 'enzyme';
import MainPage from './MainPage';

let wrapper;
beforeEach(() => {
  const mockProps = {
    onRequestRobots: jest.fn(),
    robots: [],
    searchField: '',
    isPending: false,
  }

  wrapper = shallow(<MainPage {...mockProps} />);
});

it('should to render MainPage component', () => {
  expect(wrapper).toMatchSnapshot();
});

it('should filters robots correctly', () => {
  const mockProps2 = {
    onRequestRobots: jest.fn(),
    robots: [{
      id: 3,
      name: 'Adam',
      email: 'adam@gmail.com'
    }],
    searchField: 'a',
    isPending: false,
  }

  const filteredRobots = [{
    id: 3,
    name: 'Adam',
    email: 'adam@gmail.com'
  }];
  const wrapper2 = shallow(<MainPage {...mockProps2} /> );

  // instance let you have access for all methods in component
  expect(wrapper2.instance().filterRobots(mockProps2.robots)).toEqual(filteredRobots);
});