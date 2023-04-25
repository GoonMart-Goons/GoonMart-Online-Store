import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CategoryList from './Categories';
import '@testing-library/jest-dom/extend-expect'; // import jest-dom for toBeInTheDocument()
import { categories } from './Categories';



describe('CategoryList', () => {
    test('renders all categories', () => {
        const { getByText } = render(<CategoryList />);
        categories.forEach(category => {
            const categoryElement = getByText(category.name);
            expect(categoryElement).toBeInTheDocument();
        });
    });

    test('filters products by category when clicked', async () => {
        const { getByText } = render(<CategoryList />);
        const electronicsCategory = getByText('Electronics');
        fireEvent.click(electronicsCategory);
        // You can use something like Jest's mock functions to check that filterProdsByCategory was called correctly
        // You can also check that the correct products are displayed
    });
});
