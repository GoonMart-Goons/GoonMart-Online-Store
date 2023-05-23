import React, {useState} from 'react';
import './Reviews.css';

//Firebase imports
import { auth, db } from './config/Config'
import { collection, addDoc, doc, getDoc } from 'firebase/firestore'

//Snackbar Imports
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Orders() {

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isExpanded, setExpanded] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(true);
  const [error, setError] = useState('');

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
    setError('');
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
    setError('');
  };

  const handleToggle = () => {
    setExpanded(!isExpanded);
    setButtonVisible(false);
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (rating === 0 || review.trim() === '') {
      setError('You cannot leave rating or review empty');
    } else {
      //Add to db
      addToDB(userID, rating, review, prodID);

      // Reset the rating and review state
      setRating(0);
      setReview('');
      setError('');
      setExpanded(!isExpanded);

      //Show successful snackbar
      setOpenSnackbar(true);
      setSnackbarMessage('Your review has been submitted');
    }
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
  const userID = "dhAjexEe1kpENWuEUxbH"; //Test Case
  const prodID = "WLBntFH5EyKNCXezD4SV"; // SMEG kettle
  
  //adds user's review to db
  async function addToDB(userID, rating, review, prodID){

    // Get the user document by ID
    const userRef = doc(db, 'Users', userID);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    //console.log("userData", userData);
    //console.log("name", userData.name);
    var name = userData.name + " " + userData.surname;

    addDoc(collection(db,'Products', prodID, 'Reviews'), {
      Date: Date.now(),
      Review: review,
      Stars: rating,
      User: name
    })
  }

  //Snackbar code
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
    };

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
            
            {error && <div className="error-message">{error}</div>}

            <button type="submit">Submit</button>
          </form>
        </div>
      )}

        <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleCloseSnackbar}
              severity={snackbarMessage.startsWith('Failed') ? 'error' : 'success'}
            >
              {snackbarMessage}
            </MuiAlert>
        </Snackbar> 
      </div>
  );
}
