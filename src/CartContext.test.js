import React from 'react';
import {render, fireEvent, renderHook} from '@testing-library/react';
import { CartProvider, CartContext } from './CartContext';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect'; // import jest-dom for toBeInTheDocument()
const projectId = 'my-test-project'; // Use a unique string.




describe('CartProvider', () => {
    it('adds items to cart correctly', async () => {
        const testItem = { id: 'test', name: 'Test Item', price: 10, quantity: 1 };
        const TestComponent = () => {
            const { addToCart, cartItems } = React.useContext(CartContext);
            return (
                <div>
                    <button data-testid="add-button" onClick={() => addToCart(testItem)}>
                        Add Item
                    </button>
                    <div data-testid="cart-items">{cartItems.length}</div>
                </div>
            );
        };

        const { getByTestId } = render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        await act(async () => {
            fireEvent.click(getByTestId('add-button'));
        });

        expect(getByTestId('cart-items').textContent).toBe('1');
    });

    it('removes items from cart correctly', async () => {
        const testItem = { id: 'test', name: 'Test Item', price: 10, quantity: 1 };
        const TestComponent = () => {
            const { addToCart, removeItem, cartItems } = React.useContext(CartContext);
            return (
                <div>
                    <button data-testid="add-button" onClick={() => addToCart(testItem)}>
                        Add Item
                    </button>
                    <button data-testid="remove-button" onClick={() => removeItem(testItem.id)}>
                        Remove Item
                    </button>
                    <div data-testid="cart-items">{cartItems.length}</div>
                </div>
            );
        };

        const { getByTestId } = render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        await act(async () => {
            fireEvent.click(getByTestId('add-button'));
        });

        expect(getByTestId('cart-items').textContent).toBe('1');

        await act(async () => {
            fireEvent.click(getByTestId('remove-button'));
        });

        expect(getByTestId('cart-items').textContent).toBe('0');
    });

    it('increments and decrements item quantity correctly', async () => {
        const testItem = { id: 'test', name: 'Test Item', price: 10, quantity: 1 };
        const TestComponent = () => {
            const { addToCart, incrementItem, decrementItem, cartItems } = React.useContext(CartContext);
            const cartItem = cartItems.find((item) => item.id === testItem.id);
            return (
                <div>
                    <button data-testid="add-button" onClick={() => addToCart(testItem)}>
                        Add Item
                    </button>
                    <button data-testid="increment-button" onClick={() => incrementItem(testItem.id)}>
                        Increment Quantity
                    </button>
                    <button data-testid="decrement-button" onClick={() => decrementItem(testItem.id)}>
                        Decrement Quantity
                    </button>
                    <div data-testid="item-quantity">{cartItem ? cartItem.quantity : 0}</div>
                </div>
            );
        };

        const { getByTestId } = render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        await act(async () => {
            fireEvent.click(getByTestId('add-button'));
        });

        expect(getByTestId('item-quantity').textContent).toBe('1');

        await act(async () => {
            fireEvent.click(getByTestId('increment-button'));
        });

        expect(getByTestId('item-quantity').textContent).toBe('2');

        await act(async () => {
            fireEvent.click(getByTestId('decrement-button'));
        });

        expect(getByTestId('item-quantity').textContent).toBe('1');
    });

    it('increments quantity if item is already in cart', async () => {
        const testItem = { id: 'test', name: 'Test Item', price: 10, quantity: 1 };
        const TestComponent = () => {
            const { addToCart, cartItems } = React.useContext(CartContext);
            const cartItem = cartItems.find((item) => item.id === testItem.id);
            return (
                <div>
                    <button data-testid="add-button" onClick={() => addToCart(testItem)}>
                        Add Item
                    </button>
                    <div data-testid="item-quantity">{cartItem ? cartItem.quantity : 0}</div>
                </div>
            );
        };

        const { getByTestId } = render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        await act(async () => {
            fireEvent.click(getByTestId('add-button'));
            fireEvent.click(getByTestId('add-button'));
        });

        expect(getByTestId('item-quantity').textContent).toBe('3');
    });



    it('fetches cart items from Firebase', async () => {
        // const dummyItems = [{ id: 'item1', quantity: 1 }];
        // firestore.getDocs.mockResolvedValueOnce({
        //     forEach: (callback) => dummyItems.forEach(callback),
        // });
        //
        // const { result, waitForNextUpdate } = renderHook(() => React.useContext(CartContext), {
        //     wrapper: CartProvider,
        // });
        //
        // act(() => {
        //     result.current.getCartItems();
        // });
        //
        // await waitForNextUpdate();
        //
        // expect(result.current.cartItems).toEqual(dummyItems);
    });



});

