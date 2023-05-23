import React, {useState} from 'react';
import './Reviews.css';

//Firebase imports
import { auth, db } from './config/Config'
import { collection, addDoc } from 'firebase/firestore'

export default function Orders() {

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isExpanded, setExpanded] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(true);

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleToggle = () => {
    setExpanded(!isExpanded);
    setButtonVisible(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Add your review submission logic here
    addToDB(name, surname, rating, review, prodID);
    
    // Reset the rating and review state
    setRating(0);
    setReview('');
  };

  const renderStars = () => {
    const starElements = [];
    for (let i = 1; i <= 5; i++) {
      starElements.push(
        <span
          key={i}
          className={`star ${i <= rating ? 'filled' : ''}`}
          onClick={() => handleRatingChange(i)}
        >
          &#9733;
        </span>
      );
    }
    return starElements;
  };
  //Test variables
  const name = "Test";
  const surname = "Ing";
  const prodID = "WLBntFH5EyKNCXezD4SV"; // SMEG kettle
  
  //adds user's review to db
  async function addToDB(name, surname, rating, review, prodID){
    addDoc(collection(db,'Products', prodID, 'Reviews'), {
      Date: Date.now(),
      Review: review,
      Stars: rating,
      User: name + " " + surname
    })
  }


  return (
    <div className="review-section">
        <h1> Your GoonMart Orders Will Appear Here!</h1>

    {isButtonVisible && (
      <button className="write-review-button" onClick={handleToggle}>
        Write a review
      </button>
    )}
      {isExpanded && (
        <div className="review-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="rating">Choose a rating:</label>
            <div className="stars">{renderStars()}</div>

            <label htmlFor="review">Your review:</label>
            <div>
            <textarea id="review" value={review} onChange={handleReviewChange} placeholder='Tell us why you would or would not recommend this product'/>
            </div>
            

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      </div>
  );
}
