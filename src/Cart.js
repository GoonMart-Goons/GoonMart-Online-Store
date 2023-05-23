import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { CartContext } from './CartContext';

// Firebase imports
import { storage } from './config/Config';
import { ref, getDownloadURL} from 'firebase/storage'

const Cart = () => {
    const { cartItems, removeItem, incrementItem, decrementItem } = useContext(CartContext);
    const navigate = useNavigate();

    console.log("Cart Items:", cartItems)
    console.log("Image:", cartItems.image)

    const navigateToProductPage = (id) => {
        navigate(`/product/${id}`);
    };

    const handleProceedToCheckout = () => {
        if (cartItems.length > 0) {
            // Proceed to checkout logic here
            navigate('/checkout');
        }
    };

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
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cartItems.map((item) => (
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

                                <button onClick={() => removeItem(item.id)} className="rmv-btn">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="total">
                        <h2>Total: R {cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}</h2>
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
                </>
            )}
        </div>
    );
};

export default Cart;
