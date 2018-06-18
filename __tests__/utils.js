import React from 'react';
import { shallow } from 'enzyme';

// Helper that creates a shallow component renderer for tests
export function createSetupCreator(Component, initProps) {
  return (extraProps = {}) => {
    const allProps = {
      ...initProps,
      ...extraProps
    };
    return {
      wrapper: shallow(<Component { ...allProps } />),
      get instance() {
        return this.wrapper.instance();
      },
      props: allProps
    };
  };
}