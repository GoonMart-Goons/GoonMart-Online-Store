import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import React from 'react';

const Star = ({rating}) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="star">
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