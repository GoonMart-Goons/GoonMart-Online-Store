import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useNavigate: jest.fn(),
}));

describe('ProductCard', () => {
    it('renders product name and price correctly', () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        const { getByText, getByTestId } = render(
            <BrowserRouter>
                <ProductCard
                    image='test-image.jpg'
                    prodName='Test Product'
                    price={50}
                    id='1'
                    quantity={5}
                    prodDesc='Test Product Description'
                    category='Test Category'
                />
            </BrowserRouter>
        );

        expect(getByText('Test Product')).toBeInTheDocument();
        expect(getByText('R 50')).toBeInTheDocument();

        const productCard = getByTestId('product-cardx');
        fireEvent.click(productCard);

        expect(mockNavigate).toHaveBeenCalledWith('/productpagenew', {
            state: {
                image: 'test-image.jpg',
                prodName: 'Test Product',
                averageRating: 0,
                price: 50,
                id: '1',
                quantity: 5,
                prodDesc: 'Test Product Description',
                category: 'Test Category'
            }
        });
    });
});
