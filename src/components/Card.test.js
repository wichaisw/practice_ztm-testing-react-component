import React from 'react';
import  { shallow, mount, render } from 'enzyme';
import Card from './Card';

// shallow won't test children component, make you test one component at a time

it('expect to render Card component', () => {
  expect(shallow(<Card />)).toMatchSnapshot();
});