import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Star from './Star';
import './Reviews.css';

/*FireBase imports
import { db, storage } from './config/Config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from '@firebase/storage';*/


const ReviewCard = ({ customer, description, stars, date }) => {
 // const navigate = useNavigate();
  return (
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