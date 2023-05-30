import React from 'react';
import { render, screen } from '@testing-library/react';
import Orders from './Orders';
import '@testing-library/jest-dom/extend-expect';


describe('Orders', () => {
    test('renders the component', () => {
        render(<Orders />);
        const headingElement = screen.getByRole('heading', { level: 1 });
        expect(headingElement).toBeInTheDocument();
        expect(headingElement.textContent).toBe(' Your GoonMart Orders Will Appear Here!');
    });
});
