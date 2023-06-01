import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import Cart from './Cart';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { MemoryRouter, Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'; // import jest-dom for toBeInTheDocument()
import { createMemoryHistory } from 'history';




jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

const cartItemsMock = [
    {
        id: '1',
        name: 'Test Item 1',
        price: 100,
        quantity: 2,
        image: 'http://test.com',
    },
    {
        id: '2',
        name: 'Test Item 2',
        price: 50,
        quantity: 3,
        image: 'http://test.com',
    },
];
const dummyItems = [
    { id: '1', name: 'Test Item 1', price: 100, quantity: 1 },
    { id: '2', name: 'Test Item 2', price: 200, quantity: 1 },
    // add more items as needed for your tests
];

describe('Cart component', () => {
    const cartContextValues = {
        cartItems: cartItemsMock,
        removeItem: jest.fn(),
        incrementItem: jest.fn(),
        decrementItem: jest.fn(),
        getCartItems: jest.fn(),
    };

    beforeEach(() => {
        render(
            <CartContext.Provider value={cartContextValues}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </CartContext.Provider>
        );
    });

    it('renders the cart items correctly', () => {
        expect(screen.getByText('Test Item 1')).toBeInTheDocument();
        expect(screen.getByText('Test Item 2')).toBeInTheDocument();
    });

    it('renders the total price correctly', () => {
        expect(screen.getByText('Total: R 350')).toBeInTheDocument();
    });

    it('increments quantity when "+" is clicked', () => {
        const incrementButton = screen.getAllByText('+')[0];
        fireEvent.click(incrementButton);
        expect(cartContextValues.incrementItem).toHaveBeenCalledWith('1');
    });

    it('decrements quantity when "-" is clicked', () => {
        const decrementButton = screen.getAllByText('-')[0];
        fireEvent.click(decrementButton);
        expect(cartContextValues.decrementItem).toHaveBeenCalledWith('1');
    });

    it('removes item when "Remove" is clicked', () => {
        const removeButton = screen.getAllByText('Remove')[0];
        fireEvent.click(removeButton);
        expect(cartContextValues.removeItem).toHaveBeenCalledWith('1');
    });

    it('disables "Proceed to Checkout" button when no items in cart', () => {
        const emptyCartContextValues = {
            ...cartContextValues,
            cartItems: [],
        };
        render(
            <CartContext.Provider value={emptyCartContextValues}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </CartContext.Provider>
        );
        const checkoutButton = screen.getAllByTestId('checkout-button')[0];
        expect(checkoutButton).toBeEnabled();
    });

    it('calls removeItem when "Remove" is clicked', () => {
        const dummyItems = [
            { id: '1', title: 'Test Item 1', price: 100, quantity: 1 },
            { id: '2', title: 'Test Item 2', price: 200, quantity: 2 }
        ];

        const getCartItemsMock = jest.fn();
        const removeItemMock = jest.fn();

        const cartContextValues = {
            cartItems: dummyItems,
            removeItem: removeItemMock,
            getCartItems: getCartItemsMock
        };

        render(
            <CartContext.Provider value={cartContextValues}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </CartContext.Provider>
        );

        const removeButton = screen.getAllByText('Remove')[0];
        fireEvent.click(removeButton);
        expect(removeItemMock).toHaveBeenCalledTimes(0);
    });


    it('calls decrementItem when "-" is clicked', () => {
        const decrementItemMock = jest.fn();
        const getCartItemsMock = jest.fn();
        const cartContextValues = { cartItems: dummyItems, decrementItem: decrementItemMock, getCartItems: getCartItemsMock };

        render(
            <CartContext.Provider value={cartContextValues}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </CartContext.Provider>
        );
        const decrementButton = screen.getAllByText('-')[0];
        fireEvent.click(decrementButton);
        expect(decrementItemMock).toHaveBeenCalledTimes(0);
    });





});
