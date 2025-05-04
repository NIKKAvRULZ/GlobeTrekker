import React from 'react';
import { render, screen } from '@testing-library/react';
import AnimatedBackground from './AnimatedBackground';

test('renders AnimatedBackground component', () => {
  render(<AnimatedBackground />);
  const element = screen.getByTestId('animated-background');
  expect(element).toBeInTheDocument();
});