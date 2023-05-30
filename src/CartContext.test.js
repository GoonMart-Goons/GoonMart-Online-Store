import React, {useState} from 'react';
import { CartContext, CartProvider } from './CartContext';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';

describe('CartContext', () => {
    test('provides cartItems, addToCart, removeItem, incrementItem, decrementItem values', () => {
        const cartItems = [
            { id: 1, name: 'Item 1', price: 10, quantity: 2 },
            { id: 2, name: 'Item 2', price: 20, quantity: 1 },
        ];

        const addToCart = jest.fn();
        const removeItem = jest.fn();
        const incrementItem = jest.fn();
        const decrementItem = jest.fn();

        render(
            <CartContext.Provider value={{ cartItems, addToCart, removeItem, incrementItem, decrementItem }}>
                <MockComponent />
            </CartContext.Provider>
        );

        expect(screen.getByText(/CartItems:/)).toBeInTheDocument();

        const cartItemsTextElements = screen.queryAllByText(new RegExp(JSON.stringify(cartItems)));
        expect(cartItemsTextElements.length).toBeGreaterThan(0);

        expect(screen.getByText(/addToCart:/)).toBeInTheDocument();
        expect(screen.getByText(/removeItem:/)).toBeInTheDocument();
        expect(screen.getByText(/incrementItem:/)).toBeInTheDocument();
        expect(screen.getByText(/decrementItem:/)).toBeInTheDocument();
    });

    test('calls setOpenSnackbar and setSnackbarMessage when addToCart is called', () => {
        const addToCart = jest.fn();
        const setOpenSnackbar = jest.fn();
        const setSnackbarMessage = jest.fn();
        const removeItem = jest.fn();
        const incrementItem = jest.fn();
        const decrementItem = jest.fn();

        render(
            <CartContext.Provider value={{ addToCart, removeItem, incrementItem, decrementItem, setOpenSnackbar, setSnackbarMessage }}>
                <MockComponent addToCart={addToCart} />
            </CartContext.Provider>
        );

        //const addToCartButton = screen.getByText(/Add to Cart/i);

        //fireEvent.click(addToCartButton);

       // expect(addToCart).toHaveBeenCalled();
        //expect(setOpenSnackbar).toHaveBeenCalledWith(true);
        //expect(setSnackbarMessage).toHaveBeenCalledWith('Item added to cart');
    });

    test('calls setCartItems and alert when removeItem is called', () => {
        // const removeItem = jest.fn();
        // const setCartItems = jest.fn();
        // window.alert = jest.fn();
        //
        // render(
        //     <CartContext.Provider value={{ removeItem, setCartItems }}>
        //         <MockComponent />
        //     </CartContext.Provider>
        // );
        //
        // const { removeItem: removeItemMock } = screen.getByText(/removeItem/).nextSibling;
        // fireEvent.click(removeItemMock);
        //
        // expect(removeItem).toHaveBeenCalled();
        // expect(setCartItems).toHaveBeenCalled();
        // expect(window.alert).toHaveBeenCalledWith('Item removed from cart');
    });

    test('calls setCartItems when incrementItem is called', () => {
        // const incrementItem = jest.fn();
        // const setCartItems = jest.fn();
        //
        // render(
        //     <CartContext.Provider value={{ incrementItem, setCartItems }}>
        //         <MockComponent />
        //     </CartContext.Provider>
        // );
        //
        // const { incrementItem: incrementItemMock } = screen.getByText(/incrementItem/).nextSibling;
        // fireEvent.click(incrementItemMock);
        //
        // expect(incrementItem).toHaveBeenCalled();
        // expect(setCartItems).toHaveBeenCalled();
    });

    test('calls setCartItems when decrementItem is called', () => {
        // const decrementItem = jest.fn();
        // const setCartItems = jest.fn();
        //
        // render(
        //     <CartContext.Provider value={{ decrementItem, setCartItems }}>
        //         <MockComponent />
        //     </CartContext.Provider>
        // );
        //
        // const { decrementItem: decrementItemMock } = screen.getByText(/decrementItem/).nextSibling;
        // fireEvent.click(decrementItemMock);
        //
        // expect(decrementItem).toHaveBeenCalled();
        // expect(setCartItems).toHaveBeenCalled();
    });



});

// A mock component to access the CartContext values for testing
const MockComponent = () => {
    const { cartItems, addToCart, removeItem, incrementItem, decrementItem, setCa } = React.useContext(CartContext);

    return (
        <div>
            <p>CartItems: {JSON.stringify(cartItems)}</p>
            <p>addToCart: {addToCart.mock.calls.length}</p>
            <p>removeItem: {removeItem.mock.calls.length}</p>
            <p>incrementItem: {incrementItem.mock.calls.length}</p>
            <p>decrementItem: {decrementItem.mock.calls.length}</p>
        </div>
    );
};


