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
        {cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <h2>{item.name}</h2>
                <p>{item.price}</p>
                <div className="quantity-control">
                  <button onClick={() => decrementItem(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementItem(item.id)}>+</button>
                </div>
                <button onClick={() => removeItem(item.id)}>Remove from cart</button>
                <button onClick={() => navigateToProductPage(item.id)}>View Product</button>
              </div>
            </div>
        ))}
      </div>
  );
}

export default Cart;
