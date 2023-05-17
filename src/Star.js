import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import React from 'react';

// Get the average rating from relevent pages
const Star = ({rating}) => {
    // Caculate the floor value to set the number of full stars
    const fullStars = Math.floor(rating);
    //If the remainer is a decimal greater than 0.5, set a halfstar
    const halfStar = rating - fullStars >= 0.5;
    // 5 minus the ceiling value of 'rating' is the number of half stars 
    const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="star">
      {/* Display the full, half and empty stars*/}
      {fullStars >0 && [...Array(fullStars)].map((_, i) => (
        <FaStar key={i} className = "starFull" />
      ))}
      {halfStar >0  && <FaStar className = "starHalf" />}
      {emptyStars > 0 && [...Array(emptyStars)].map((_, i) => (
        <FaStar key={i} className = "starEmpty" />
      ))}
    </div>
  );

};
export default Star;