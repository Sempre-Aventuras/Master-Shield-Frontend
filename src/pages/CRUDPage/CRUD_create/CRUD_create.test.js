import React from 'react';
import { shallow } from 'enzyme';
import CRUD_create from './CRUD_create';

describe('CRUD_create', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<CRUD_create />);
    expect(wrapper).toMatchSnapshot();
  });
});
