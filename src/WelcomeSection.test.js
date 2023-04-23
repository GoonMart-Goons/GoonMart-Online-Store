import React from 'react';
import { render } from '@testing-library/react';
import WelcomeSection from './ProductPage';

describe('WelcomeSection', () => {
    it('renders the welcome message', () => {
        const { getByText } = render(<WelcomeSection />);
        const welcomeMessage = getByText('Welcome to GoonMart, the best online store!');
        expect(welcomeMessage).toBeInTheDocument();
    });

    it('renders the happy shopping message', () => {
        const { getByText } = render(<WelcomeSection />);
        const happyShoppingMessage = getByText('Happy Shopping :)');
        expect(happyShoppingMessage).toBeInTheDocument();
    });
});
