import React, { useState, createContext,  useEffect  } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const CartContext = createContext();

export const CartProvider = props => {
    const [cartItems, setCartItems] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    // Load cart items from localStorage on initial render
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (storedCartItems) {
            setCartItems(storedCartItems);
        }
    }, []);

    // Save cart items to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        // Check if item already exists in cart
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            // If item exists, increase the quantity
            setCartItems(
                cartItems.map(cartItem =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem
                )
            );
        } else {
            // If item does not exist, add it to cart
            setCartItems([...cartItems, item]);
        }
        setOpenSnackbar(true);
        setSnackbarMessage('Item added to cart');
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
        alert('Item removed from cart');
    };

    const incrementItem = (id) => {
        setCartItems(
            cartItems.map(cartItem =>
                cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            )
        );
    };

    const decrementItem = (id) => {
        setCartItems(
            cartItems.map(cartItem =>
                cartItem.id === id && cartItem.quantity > 1 ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeItem , incrementItem, decrementItem, setOpenSnackbar, setSnackbarMessage, setCartItems}}>
            {props.children}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseSnackbar}
                    severity={snackbarMessage.startsWith('Failed') ? 'error' : 'success'}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </CartContext.Provider>

);
};
