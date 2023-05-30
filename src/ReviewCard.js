// Imports
import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Star from './Star';
import './Reviews.css';

const ReviewCard = ({ customer, description, stars, date }) => {
 
  return (
    /*Display review information  -> rating, description, customer name and date review was made*/
      <div className="review-card">

        <div className="review-rating">
          <Star rating={stars} />
        </div>

        <div className="review-description">{description}</div>
        
        <div className="review-customer">{customer} - {date}</div>

      </div>
  );
}

export default ReviewCard;