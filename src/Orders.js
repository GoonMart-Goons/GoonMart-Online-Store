import React, {useState} from 'react';
import './Reviews.css';

//Firebase imports
import { auth, db } from './config/Config'
import { collection, addDoc, doc, getDoc, getDocs,  query, where } from 'firebase/firestore'

//Snackbar Imports
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Orders() {

  // *****************Reviews stuff -- Maybe should be in a diff file, but oh well**********************

  //Initalise rating, review and error
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState('');

  //Initialise button states. "Write review" button is visible but UI to actually do it is not
  const [isExpanded, setExpanded] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(true);
  
  // Sets the stars rating value
  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
    setError('');
  };

  // Sets the review text content
  const handleReviewChange = (event) => {
    setReview(event.target.value);
    setError('');
  };

  // Called when "write review" button is clicked
  const handleToggle = async () => {

    //Check if user has already sumbitted a review

    // Navigate to the reviews collection of that specific product
    const reviewsRef = collection(db, 'Products', prodID, 'Reviews');
    const q = query(reviewsRef, where('UserID', '==', userID));
    const reviewsSnapshot = await getDocs(q);

    // Case if no review has been made by user yet -> allow them to make a review
    if (reviewsSnapshot.empty) {
      setExpanded(!isExpanded);
      setButtonVisible(false);
      setError('');
    }
    // Case where user has already made review
    else{
      setError('You have already reviewed this product');
      setTimeout(() => {
        setError('');
      }, 5000); //delay for 5 seconds (5000 milliseconds)
      //setButtonVisible(false);
    }
  };

  // Called when the "submit" button is clicked
  const handleSubmit = (event) => {
    event.preventDefault();

    // if rating and review still have their default values, no data has been entered
    if (rating === 0 || review.trim() === '') {
      setError('You cannot leave rating or review empty');
  
    } else {
      //Add new review to the database
      addToDB(userID, rating, review, prodID);

      // Reset the rating and review state
      setRating(0);
      setReview('');
      setError('');
      setExpanded(!isExpanded);
      setButtonVisible(true);

      //Show successful snackbar
      setOpenSnackbar(true);
      setSnackbarMessage('Your review has been submitted');
    }
  };

  // This interprets the stars graphic into a numerical value of stars
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

  //***************************Test variables*************************************
  const userID = "dhAjexEe1kpENWuEUxbH"; //Test Case
  const prodID = "WLBntFH5EyKNCXezD4SV"; // SMEG kettle
  //const userID = "N8UIq9zUVYpIqY9TaqHD" // Kaji Katame
  
  //adds user's review to db
  async function addToDB(userID, rating, review, prodID){

    // Get the user document by ID
    const userRef = doc(db, 'Users', userID);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    var name = userData.name + " " + userData.surname;

    addDoc(collection(db,'Products', prodID, 'Reviews'), {
      Date: Date.now(),
      Review: review,
      Stars: rating,
      User: name,
      UserID: userID /*******Had to add this field to make once off review validation easier *****************/
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

        {/* ORDER ITEMS HERE */}
        

    {/*we first see the "write review" button */}
    {isButtonVisible && (
      <button className="write-review-button" onClick={handleToggle}>
        Write a review
      </button>
      )}
      {error && <div className="error-message">{error}</div>}

      {/*If clicked and user has not reviewed the product yet, new UI pops up*/}
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
        {/*Snackbar UI*/}
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
