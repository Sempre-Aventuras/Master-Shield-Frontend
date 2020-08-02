import React from 'react';
import { shallow } from 'enzyme';
import CRUD_index from './CRUD_index';

describe('CRUD_index', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<CRUD_index />);
    expect(wrapper).toMatchSnapshot();
  });
});
