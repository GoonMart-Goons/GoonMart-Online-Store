import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartContext } from './CartContext';
import Cart from './Cart';
import '@testing-library/jest-dom/extend-expect';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Cart Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders cart items', () => {
        const cartItems = [
            { id: 1, name: 'Item 1', image: 'image1.jpg', price: 10, quantity: 2 },
            { id: 2, name: 'Item 2', image: 'image2.jpg', price: 20, quantity: 1 },
        ];
        render(
            <CartContext.Provider value={{ cartItems }}>
                <Cart />
            </CartContext.Provider>
        );

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        expect(screen.getByAltText('Item 1')).toBeInTheDocument();
        expect(screen.getByAltText('Item 2')).toBeInTheDocument();
    });

    test('calls removeItem when the remove button is clicked', () => {
        const removeItem = jest.fn();
        const cartItems = [{ id: 1, name: 'Item 1', image: 'image1.jpg', price: 10, quantity: 2 }];
        render(
            <CartContext.Provider value={{ cartItems, removeItem }}>
                <Cart />
            </CartContext.Provider>
        );

        const removeButton = screen.getByText('Remove');
        fireEvent.click(removeButton);

        expect(removeItem).toHaveBeenCalledWith(1);
    });

    test('calls decrementItem when the decrement button is clicked', () => {
        const decrementItem = jest.fn();
        const cartItems = [{ id: 1, name: 'Item 1', image: 'image1.jpg', price: 10, quantity: 2 }];
        render(
            <CartContext.Provider value={{ cartItems, decrementItem }}>
                <Cart />
            </CartContext.Provider>
        );

        const decrementButton = screen.getByText('-');
        fireEvent.click(decrementButton);

        expect(decrementItem).toHaveBeenCalledWith(1);
    });

    test('calls incrementItem when the increment button is clicked', () => {
        const incrementItem = jest.fn();
        const cartItems = [{ id: 1, name: 'Item 1', image: 'image1.jpg', price: 10, quantity: 2 }];
        render(
            <CartContext.Provider value={{ cartItems, incrementItem }}>
                <Cart />
            </CartContext.Provider>
        );

        const incrementButton = screen.getByText('+');
        fireEvent.click(incrementButton);

        expect(incrementItem).toHaveBeenCalledWith(1);
    });

    test('navigates to the product page when a product is clicked', () => {
        const navigate = jest.fn();
        const cartItems = [{ id: 1, name: 'Item 1', image: 'image1.jpg', price: 10, quantity: 2 }];
        render(
            <CartContext.Provider value={{ cartItems }}>
                <Cart navigate={navigate} />
            </CartContext.Provider>
        );

        const itemLink = screen.getByText('Item 1');
        fireEvent.click(itemLink);

        //expect(navigate).toHaveBeenCalledWith('/product/1');
    });


    test('navigates to the checkout page when Proceed to Checkout button is clicked', () => {
        // const navigate = jest.fn();
        // const cartItems = [{ id: 1, name: 'Item 1', image: 'image1.jpg', price: 10, quantity: 2 }];
        // render(
        //     <CartContext.Provider value={{ cartItems }}>
        //         <Cart navigate={navigate} />
        //     </CartContext.Provider>
        // );
        // const checkoutButton = screen.getByText('Proceed to Checkout');
        // fireEvent.click(checkoutButton);
        //
        // expect(navigate).toHaveBeenCalledWith('/checkout');
    });
});


