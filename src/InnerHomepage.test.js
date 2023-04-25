import React from 'react';
import { render, screen } from '@testing-library/react';
import InnerHomepage from './InnerHomepage';
import '@testing-library/jest-dom/extend-expect'; // import jest-dom for toBeInTheDocument()

describe('InnerHomepage', () => {
    test('renders InnerNavigationBar component', () => {
        render(<InnerHomepage />);
        const navBarElement = screen.getByTestId('inner-nav-bar');
        expect(navBarElement).toBeInTheDocument();
    });

    test('renders Categories component', () => {
        render(<InnerHomepage />);
        const categoriesElement = screen.getByTestId('categories');
        expect(categoriesElement).toBeInTheDocument();
    });

    test('renders ProductGrid component', () => {
        render(<InnerHomepage />);
        const productGridElement = screen.getByTestId('product-grid');
        expect(productGridElement).toBeInTheDocument();
    });

    test('renders ProductCard component', () => {
        render(<InnerHomepage />);
        const productCardElement = screen.getByTestId('product-card');
        expect(productCardElement).toBeInTheDocument();
    });
});
