import React from 'react';
import { shallow } from 'enzyme';
import Highlights from './Highlights';

describe('Highlights', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Highlights />);
    expect(wrapper).toMatchSnapshot();
  });
});
