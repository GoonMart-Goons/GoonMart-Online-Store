import React from 'react';
import { useNavigate } from "react-router-dom";
import Star from './Star';

const ProductCard = ({ image, prodName, ratingSum, ratingCount /*reviews*/, price }) => {
  const navigate = useNavigate();

  return (
    <div className="product-card" onClick = {() => navigate('/productpage')}>
      <div className="product-image">
        <img src={image} alt={prodName} height={400}/>
      </div>
      <div className="product-info">
        <div className="product-name">{prodName}</div>
        <div className="product-rating">
          {/*{[...Array(ratingSum)].map((star, index) => {
            return <span key={index} className="star">&#9733;</span>
          })}*/}
          <Star rating={ratingSum/ratingCount} />
          {/*<div className="product-reviews">{reviews}</div>*/}
        </div>
        
        <div className="product-price">R {price}</div>
      </div>
    </div>
  );
}

export default ProductCard;
