import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';

// Logged in user'd ID

// Firebase imports
import { db } from './config/Config';
import { doc, setDoc } from 'firebase/firestore';

export let userCartItems = {}

const Cart = () => {
    const { cartItems, removeItem, incrementItem, decrementItem, getCartItems } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
      getCartItems()
    }, [])
    console.log("CART:", cartItems)

    const navigateToProductPage = (id) => {
      navigate(`/product/${id}`);
    }

    const handleProceedToCheckout = () => {
      if (cartItems.length > 0) {
          // Proceed to checkout logic here
          navigate('/addressinfo');
      }
    };

    userCartItems = cartItems
  
    // Calculate total
    const total = cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  
    // Prepare cart details for Checkout
    const cartDetails = cartItems.map(item => {
      return {
        name: item.name,
        quantity: item.quantity,
        price: item.price
      };
    });
  
    // Download image for display
    // const [imageURL, setImageURL] = useState(null)
    // //fetch and generage image from database
    // useEffect(() => {
    //     const imgRef = ref(storage, cartItems.image)

    //     getDownloadURL(imgRef)
    //     .then((url) => {
    //         cartItems.image = url
    //         // setImageURL(url)
    //     })
    //     .catch((error) => {
    //         console.error(error)
    //     })
    // }, [cartItems.image])

    return (
      <div className="cart-container">
        <h1>Cart</h1>
        {cartItems.map(item => (
          <div className="cart-item" key={item.id}>
            <div className="product">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <p>{item.name}</p>
              </div>
            </div>
            <div className="quantity-control">
              <p>R {item.price * item.quantity}</p>
              <button onClick={() => decrementItem(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => incrementItem(item.id)}>+</button>
            </div>
            <div className="extras">
              <button onClick={() => navigateToProductPage(item.id)} className="view-cart">
                View Product
              </button>
              <button onClick={() => removeItem(item.id)} className="rmv-btn">
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="total">
          <h2>Total: R {total}</h2>
        </div>
        <div>
            <button
                className="checkout-btn"
                disabled={cartItems.length === 0}
                onClick={handleProceedToCheckout}
            >
                Proceed to Checkout
            </button>
        </div>
      </div>
    );
  };
  
  export default Cart;