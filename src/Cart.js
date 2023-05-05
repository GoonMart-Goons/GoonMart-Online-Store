import React, { useState } from 'react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleRemoveFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  return (
    <div  className='cart-container'>
      <h1>Cart</h1>
      {cartItems.length === 0 && <p>Your cart is empty</p>}
      {cartItems.length > 0 &&
        <ul className='cart-items' >
          {cartItems.map((item, index) => (
            <li  className='cart-item'key={index}>
              <span>{item.quantity} {item.name} @ R{item.price} each</span>
              <button className='cart-buttons' onClick={() => handleRemoveFromCart(index)}>X</button>
            </li>
          ))}
        </ul>
      }
      <button className="form-btn" onClick={() => handleAddToCart({ name: 'Shoes', price: 10, quantity: 5 })}>Add Shoes to Cart</button>
      <button className="form-btn" onClick={() => handleAddToCart({ name: 'Car Toy', price: 20, quantity: 9 })}>Add Car Toy to Cart</button>
      <button className="form-btn" onClick={() => handleAddToCart({ name: 'Phone', price: 2000, quantity: 1 })}>Add Phone to Cart</button>
    </div>
  );
};

