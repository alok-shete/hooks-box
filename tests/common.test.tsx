import * as React from 'react';
import { render } from '@testing-library/react';

import MyCounter from '../src/components/demo';

describe('Common render', () => {
  it('renders without crashing', () => {
    render(<MyCounter />);
  });
});
