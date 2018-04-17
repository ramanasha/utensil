import React from 'react';
import { mount } from 'enzyme';

import Link from './Link';

describe('<Link />', () => {
  it('should render properly', () => {
    const component = mount(<Link url='food.olin.edu' />);
    expect(component).toMatchSnapshot();
  });
});
