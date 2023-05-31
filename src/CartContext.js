import React, { useState, createContext, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//Firebase
import { db } from './config/Config';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
//Logged in user's ID
import { loggedInUserID } from './Login';

export const CartContext = createContext();

async function addCartItemToDB(item){
  try{
    const cartItemDocRef = doc(db, `Users/${loggedInUserID}/Cart`, `${item.id}${loggedInUserID}`)
    await setDoc(cartItemDocRef, item)
  } catch(error){
    console.error("Failed to add item to cart:", error)
  }
}

async function fetchCartItemsFromDB(){
  console.log("cart id:", loggedInUserID)
  try{
    const cartSnapshot = await getDocs(collection(db, `Users/${loggedInUserID}/Cart`))
    const DBcartItems = []
    cartSnapshot.forEach((doc) => {
      DBcartItems.push(doc.data())
    })
    return DBcartItems
  } catch(error){
    console.error("Error fetching cart items from database:", error) 
    return
  }
}

export const CartProvider = (props) => {
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
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // If item exists, increase the quantity
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      );
    } else {
      // If item does not exist, add it to cart
      setCartItems([...cartItems, item]);
    }
    setOpenSnackbar(true);
    const currItem = cartItems.filter((cartItem) => cartItem.id === item.id)
    console.log("CURR ITEM:", item)
    if(currItem.length > 0){
      currItem[0].quantity += item.quantity
      console.log("CURR CART ITEM:", currItem)
      console.log("QTY:", currItem[0].quantity)
      addCartItemToDB(currItem[0])
    } 
    else
      addCartItemToDB(item) 

    setSnackbarMessage('Item added to cart');
  };

  const getCartItems = async () => {
    const items = await fetchCartItemsFromDB()
    setCartItems(items)
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    alert('Item removed from cart');
  };

  const incrementItem = (id) => {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decrementItem = (id) => {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.id === id && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeItem,
        incrementItem,
        decrementItem,
        setOpenSnackbar,
        setSnackbarMessage,
        setCartItems,
        getCartItems
      }}
    >
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
