import { render, screen } from '@testing-library/react';
import React, {useState} from 'react'
import App from './App';
import '@testing-library/jest-dom/extend-expect'; // import jest-dom for toBeInTheDocument()


test('renders GoonMart logo', () => {
  render(<App />);
  const logoElement = screen.getByAltText(/goonmart logo/i);
  expect(logoElement).toBeInTheDocument();
});
