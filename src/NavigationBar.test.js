import React from 'react';
import { render, screen } from '@testing-library/react';
import NavigationBar from './NavigationBar';
import '@testing-library/jest-dom/extend-expect'; // import jest-dom for toBeInTheDocument()


describe('NavigationBar', () => {
    // Test case: check if the GoonMart logo is rendered
    test('renders the GoonMart logo', () => {
        render(<NavigationBar />);
        const logo = screen.getByAltText('goonmart logo');
        expect(logo).toBeInTheDocument();
    });
    // Test case: check if the search input is rendered
    test('renders the search input', () => {
        render(<NavigationBar />);
        const searchInput = screen.getByPlaceholderText('Search');
        expect(searchInput).toBeInTheDocument();
    });
    // Test case: check if the search button with FaSearch icon is rendered
    test('renders the search button with FaSearch icon', () => {
        render(<NavigationBar />);
        const searchButton = screen.getByTestId('search-button');
        expect(searchButton).toBeInTheDocument();
        expect(screen.getByTestId('fa-search-icon')).toBeInTheDocument();
    });
    // Test case: check if the LOGIN and REGISTER buttons are rendered
    test('renders the LOGIN and REGISTER buttons', () => {
        render(<NavigationBar />);
        const loginButton = screen.getByText('LOGIN');
        const registerButton = screen.getByText('REGISTER');
        expect(loginButton).toBeInTheDocument();
        expect(registerButton).toBeInTheDocument();
    });
});
