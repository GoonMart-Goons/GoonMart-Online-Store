import React, {useState} from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import InnerNavigationBar from './InnerNavigationBar';
import '@testing-library/jest-dom/extend-expect';


test('renders InnerNavigationBar component without crashing', () => {
    const mockFn = jest.fn();
    render(<InnerNavigationBar onSearch={mockFn}/>);
    const navbar = screen.getByTestId('inner-nav-bar');
    expect(navbar).toBeInTheDocument();
});

test('calls onSearch function when form is submitted', () => {
    const mockFn = jest.fn();
    render(<InnerNavigationBar onSearch={mockFn}/>);
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.submit(input);
    expect(mockFn).toHaveBeenCalledWith('test');
});

test('renders navigation links correctly', () => {
    const mockFn = jest.fn();
    render(<InnerNavigationBar onSearch={mockFn}/>);
    const navLinks = ['Orders', 'My Account', 'About', 'Log Out'];
    navLinks.forEach((text) => {
        const link = screen.getByText(new RegExp(text, 'i'));
        expect(link).toBeInTheDocument();
    });
    // Check for Cart link separately
    const cartLink = screen.getByLabelText('Cart');
    expect(cartLink).toBeInTheDocument();
});
