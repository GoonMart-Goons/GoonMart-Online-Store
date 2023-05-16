import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { CartContext } from './CartContext';


const Cart = () => {
  const { cartItems, removeItem, incrementItem, decrementItem } = useContext(CartContext);
  const navigate = useNavigate();


  const navigateToProductPage = (id) => {
    navigate(`/product/${id}`);
  }

  return (
      <div className="cart-container">
        <h1>Cart</h1>
        {cartItems.map(item => (
          <div className = "cart-item">
            <div className="product" key={item.id}>
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
              
              <div className='extras'>
                <button onClick={() => navigateToProductPage(item.id)} className='view-cart'>View Product</button>
                <button onClick={() => removeItem(item.id)} className='rmv-btn'>Remove</button>
              </div>
              
            </div>
        ))}
        <div className='total'>
          <h2>Total: R {cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}</h2>
        </div>

        <div>
          <button className='checkout-btn'>Proceed to Checkout</button>
        </div>
      </div>
  );
}

export default Cart;
