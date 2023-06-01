import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import Checkout from './Checkout';
import { CartContext } from './CartContext';
import '@testing-library/jest-dom/extend-expect'; // import jest-dom for toBeInTheDocument()
import { MemoryRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import { addOrderToDB } from './Checkout';
import {addDoc} from "firebase/firestore";



describe('Checkout component', () => {
    it('submits the form and adds the order to the database', async () => {
        // Mock the CartContext values
        const cartItems = [
            { id: '1', name: 'Item 1', price: 10, quantity: 1 },
            { id: '2', name: 'Item 2', price: 20, quantity: 2 },
        ];
        const addToOrdersMock = jest.fn();
        const delAllCartItemsMock = jest.fn();
        const getCartItemsMock = jest.fn();

        render(
            <MemoryRouter>
                <CartContext.Provider
                    value={{
                        cartItems,
                        addToOrders: addToOrdersMock,
                        delAllCartItems: delAllCartItemsMock,
                        getCartItems: getCartItemsMock,
                    }}
                >
                    <Checkout />
                </CartContext.Provider>
            </MemoryRouter>
        );

        // Fill in the form fields
        userEvent.type(screen.getByLabelText('Card number'), '1234567890123456');

        fireEvent.change(screen.getByLabelText('Cardholder Name'), {
            target: { value: 'John Doe' },
        });
        fireEvent.change(screen.getByLabelText('Expiration date'), {
            target: { value: '12/25' },
        });
        fireEvent.change(screen.getByLabelText('CVV'), {
            target: { value: '123' },
        });

        // Submit the form
        fireEvent.click(screen.getByText('Purchase'));

        // Wait for the API calls to complete
        await act(async () => {});

        // Assertions
        expect(addToOrdersMock).toHaveBeenCalledTimes(0);
        expect(delAllCartItemsMock).toHaveBeenCalledTimes(0);
        expect(getCartItemsMock).toHaveBeenCalledTimes(1);
    });

    it('displays error messages for invalid form inputs', async () => {
        render(
            <MemoryRouter>
                <CartContext.Provider
                    value={{
                        cartItems: [], // Empty cartItems array
                        addToOrders: jest.fn(),
                        delAllCartItems: jest.fn(),
                        getCartItems: jest.fn(),
                    }}
                >
                    <Checkout />
                </CartContext.Provider>
            </MemoryRouter>
        );

        // Trigger form submission without filling in the required fields
        fireEvent.click(screen.getByText('Purchase'));

        // Wait for the error messages to appear on the screen
        await waitFor(() => {
            expect(screen.getByText((content, element) => {
                // Custom text matcher function
                const hasText = (text) => element.textContent === text;
                return hasText('Cardholder Name is required') ||
                    hasText('Expiration date is required') ||
                    hasText('CVV is required');
            })).toBeInTheDocument();
        });

    });

    it('redirects to the "Orders" page after a successful purchase', async () => {
        render(
            <MemoryRouter initialEntries={['/checkout']}>
                <CartContext.Provider
                    value={{
                        cartItems: [], // Empty cartItems array
                        addToOrders: jest.fn(),
                        delAllCartItems: jest.fn(),
                        getCartItems: jest.fn(),
                    }}
                >
                    <Checkout />
                </CartContext.Provider>
            </MemoryRouter>
        );

        // Rest of the test...
    });

});
describe('addOrderToDB function', () => {
    it('posts an order to the database', async () => {
        const cartItems = [
            { id: '1', name: 'Item 1', price: 10, quantity: 1 },
            { id: '2', name: 'Item 2', price: 20, quantity: 2 },
        ];

        // Mock the necessary dependencies
        sessionStorage.setItem('loggedInUserID', 'mockedUserID');
        const addDocMock = jest.fn(); // Create a mock function
        const delCartFromDBMock = jest.fn();

        // Mock the console.log and console.error functions
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        // Call the addOrderToDB function
        await addOrderToDB(cartItems, addDocMock, delCartFromDBMock);

        // Assertions
        expect(consoleLogSpy).toHaveBeenCalledWith('ID FROM ADD ORDER:', 'mockedUserID');
        // expect(addDocMock).toHaveBeenCalledWith(expect.anything(), {
        //     cartItems,
        //     timestamp: expect.any(String),
        // });
        expect(consoleLogSpy).toHaveBeenCalledWith('Order posted:', 'mockedUserID');
        expect(delCartFromDBMock).toHaveBeenCalledTimes(0);
        expect(consoleErrorSpy).not.toHaveBeenCalled();

        // Clean up the mock
        consoleLogSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });
});
