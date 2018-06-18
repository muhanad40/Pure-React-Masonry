import React, { Component } from 'react';
import { shallow } from 'enzyme';

import { createSetupCreator } from './utils';

class MockComponent extends Component {
  render() {
    return <div>{ this.props.name }</div>; // eslint-disable-line react/prop-types
  }
}

describe('createSetupCreator', () => {
  const testProps = {
    name: 'Jason'
  };
  const setup = createSetupCreator(MockComponent, testProps);

  it('should return a creator function', () => {
    expect(typeof setup).toEqual('function');
  });

  it('should shallow render a component with props', () => {
    const { wrapper, props } = setup();

    expect(wrapper).toEqual(shallow(<MockComponent { ...testProps } />));
    expect(props).toEqual(testProps);
  });

  it('should shallow render a component with extra props', () => {
    const extraProps = {
      age: 27
    };
    const expectedProps = {
      ...testProps,
      ...extraProps
    };
    const { instance } = setup(extraProps);

    expect(instance.props).toEqual(expectedProps);
  });

  it('should return component instance', () => {
    const expectedInstance = shallow(<MockComponent { ...testProps } />).instance();
    const { instance } = setup();

    expect(instance.constructor).toEqual(expectedInstance.constructor);
  });

  it('should return a newly rendered component', () => {
    const { wrapper: firstRender } = setup();
    const { wrapper: secondRender } = setup();

    firstRender.setState({
      name: ''
    });

    expect(secondRender.state()).toEqual(null);
  });
});