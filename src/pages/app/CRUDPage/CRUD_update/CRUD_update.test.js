import React from 'react';
import { shallow } from 'enzyme';
import CRUD_update from './CRUD_update';

describe('CRUD_update', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<CRUD_update />);
    expect(wrapper).toMatchSnapshot();
  });
});
