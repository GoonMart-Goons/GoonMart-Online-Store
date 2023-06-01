import React, { useState, createContext, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

//Firebase
import { db } from './config/Config';
import { doc, setDoc, getDocs, collection, deleteDoc, addDoc } from 'firebase/firestore';
//Logged in user's ID
// import { loggedInUserID } from './Login';

export const CartContext = createContext();

async function addCartItemToDB(item){
  try{
    const loggedInUserID = sessionStorage.getItem('loggedInUserID')
    const cartItemDocRef = doc(db, `Users/${loggedInUserID}/Cart`, `${item.id}${loggedInUserID}`)
    await setDoc(cartItemDocRef, item)
  } catch(error){
  }
}

async function fetchCartItemsFromDB(){
  const loggedInUserID = sessionStorage.getItem('loggedInUserID')
  console.log("cart id:", loggedInUserID)
  try{
    const cartSnapshot = await getDocs(collection(db, `Users/${loggedInUserID}/Cart`))
    const DBcartItems = []
    cartSnapshot.forEach((doc) => {
      DBcartItems.push(doc.data())
    })
    return DBcartItems
  } catch(error){
    return
  }
}

async function addOrderToDB(cartItems){
  try{
    const loggedInUserID = sessionStorage.getItem('loggedInUserID')
    const ordersRef = collection(db, `Users/${loggedInUserID}/Orders`)
    const order = {
      cartItems,
      time: new Date().toISOString()
    }
    await addDoc(ordersRef, order)
  } catch(error){
  }
}

async function delCartFromDB(){
  try{
    const loggedInUserID = sessionStorage.getItem('loggedInUserID')
    const cartRef = collection(db, `Users/${loggedInUserID}/Cart`)
    const qSnap = await getDocs(cartRef)

    qSnap.forEach(async (doc) => {
      await deleteDoc(doc(doc.id))
    })
  } catch(error){
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

  const addToOrders = async () => {
    addOrderToDB(cartItems)
    delAllCartItems()
  }

  const delAllCartItems = async () => {
    delCartFromDB()
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
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
        getCartItems,
        delAllCartItems,
        addToOrders
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
