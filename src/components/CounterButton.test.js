import React from 'react';
import  { shallow, mount, render } from 'enzyme';
import CounterButton from './CounterButton';

// shallow won't test children component, make you test one component at a time

let wrapper;
let mockColor;

describe('CounterButton', () => {
  beforeAll(() => {
    mockColor = 'red';
    wrapper = shallow(<CounterButton color={mockColor} />);
  });

  it('expect to render CounterButton component', () => {
    expect(shallow(<CounterButton color={mockColor} />)).toMatchSnapshot();
  });
  
  it('correctly increment counter', () => {  
    wrapper.find('[id="counter"]').simulate('click');
    expect(wrapper.state()).toEqual({ count: 1 });
    wrapper.find('[id="counter"]').simulate('click');
    expect(wrapper.state()).toEqual({ count: 2 });
  });

  it('should derive color from props', () => {
    expect(wrapper.props().color).toEqual('red');
  });
})