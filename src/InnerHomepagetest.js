import React from 'react';
import { render, screen } from '@testing-library/react';
import InnerHomepage from './InnerHomepage';
import '@testing-library/jest-dom/extend-expect'; // import jest-dom for toBeInTheDocument()
import { BrowserRouter as Router } from 'react-router-dom';


describe('InnerHomepage', () => {
    // test('renders InnerNavigationBar component', () => {
    //     render(<Router> <InnerHomepage /> </Router>);
    //     const navBarElement = screen.getByTestId('inner-nav-bar');
    //     expect(navBarElement).toBeInTheDocument();
    // });

    // test('renders Categories component', () => {
    //     render(<Router><InnerHomepage /> </Router>);
    //     const categoriesElement = screen.getByTestId('categories');
    //     expect(categoriesElement).toBeInTheDocument();
    // });

    test('renders ProductGrid component', () => {
        render(<Router><InnerHomepage /> </Router>);
        const productGridElement = screen.getByTestId('product-grid');
        expect(productGridElement).toBeInTheDocument();
    });

    // test('renders ProductCard component', () => {
    //     render(<Router> <InnerHomepage /> </Router>);
    //     const productCardElements = screen.getAllByTestId('product-cardx');
    //     //expect(productCardElements).toHaveLength(28);
    //     expect(productCardElements.length).toBeGreaterThan(0);
    // });
});
