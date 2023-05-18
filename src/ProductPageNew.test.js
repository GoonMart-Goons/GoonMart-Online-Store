import React, {useState} from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ProductPageNew from './ProductPageNew';
import { CartContext } from './CartContext';
import { BrowserRouter as Router, Route, MemoryRouter, Routes } from 'react-router-dom';
import { db, storage } from './config/Config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import '@testing-library/jest-dom/extend-expect';



jest.mock('./config/Config'); // Mock Firebase functions
jest.mock('firebase/firestore');
jest.mock('firebase/storage');

// Mock Firebase getDocs
getDocs.mockImplementation(() => {
    return {
        docs: [
            {
                data: () => ({
                    prodName: 'Test Product',
                    imageURL: 'http://test.com',
                    price: 100,
                    id: '1',
                    quantity: 10,
                    prodDesc: 'Test description',
                    category: 'Test category',
                }),
                id: '1',
            },
        ],
    };
});

// Mock Firebase getDownloadURL
getDownloadURL.mockImplementation(() => {
    return Promise.resolve('http://test.com');
});

// Mock useLocation and useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        state: {
            image: 'test.jpg',
            prodName: 'Test Product',
            averageRating: 5,
            price: 100,
            id: '1',
            quantity: 10,
            prodDesc: 'Test description',
            category: 'Test category',
        },
    }),
    useNavigate: () => jest.fn(),
}));

describe('ProductPageNew component', () => {
    const addToCartMock = jest.fn();
    const cartContextValues = { addToCart: addToCartMock };

    beforeEach(() => {
        render(
            <CartContext.Provider value={cartContextValues}>
                <MemoryRouter initialEntries={['/product/1']}>
                    <Routes>
                        <Route path="/product/:id" element={<ProductPageNew />} />
                    </Routes>
                </MemoryRouter>
            </CartContext.Provider>
        )

    });

    it('renders the component correctly', () => {
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('R 100')).toBeInTheDocument();
        expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('increments quantity', () => {
        const incrementButton = screen.getByText('+');
        fireEvent.click(incrementButton);
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('decrements quantity', () => {
        const incrementButton = screen.getByText('+');
        const decrementButton = screen.getByText('-');
        fireEvent.click(incrementButton);
        fireEvent.click(incrementButton);
        fireEvent.click(decrementButton);
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('does not decrement quantity below 1', () => {
        const decrementButton = screen.getByText('-');
        fireEvent.click(decrementButton);
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('adds to cart when "Add to Cart" button is clicked', async () => {
        const addToCartButton = screen.getByText('Add to Cart');
        fireEvent.click(addToCartButton);
        expect(addToCartMock).toHaveBeenCalledTimes(1);
    });

});
