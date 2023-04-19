import React from 'react';

const ProductCard = ({ image, name, rating, reviews, price }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} height={400}/>
      </div>
      <div className="product-info">
        <div className="product-name">{name}</div>
        <div className="product-rating">
          {[...Array(rating)].map((star, index) => {
            return <span key={index} className="star">&#9733;</span>
          })}
          <div className="product-reviews">{reviews}</div>
        </div>
        
        <div className="product-price">{price}</div>
      </div>
    </div>
  );
}

export default ProductCard;
