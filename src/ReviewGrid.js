import React, {useState, useEffect} from 'react';
import ReviewCard from './ReviewCard';
import './Reviews.css';

//FireBase imports
import { db } from './config/Config'
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';


const ReviewGrid = ({productName}) => {
  
  const [DBreviews, setDBreviews] = React.useState([])

  // used to call the getProductReviews function each time the page is reloaded or navigated to
  React.useEffect(() => {
    getProductReviews(productName)
  }, [])
  
  async function getProductReviews(prodName){
    //console.log("prodname:", prodName)

    // navigate to the "Products collection of the database"
    const prodsRef = collection(db, 'Products')
    const q = query(prodsRef, where('prodName', '==', prodName))
    const prodSnapshot = await getDocs(q)

    const prodDoc = prodSnapshot.docs[0]

    // Navigate to the reviews collection of that specific product
    const reviewsRef = collection(db, 'Products', prodDoc.id, 'Reviews')
    const reviewsSnapshot = await getDocs(reviewsRef)

    //Case where no reviews have been made -> array stays empty
    if (reviewsSnapshot.empty){
      //console.log('This product has no reviews')
      return
    }

    // Retrieves the date the review was made in the correct format
    const reviewsData = reviewsSnapshot.docs.map((reviewDoc) => {
      const reviewData = reviewDoc.data()
      const timestamp = reviewData.Date

      //Convert FB timestamp to JS date
      const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp)
      
      //Formats date to dd/mm/yyyy
      const formattedDate = date.toLocaleDateString('en-GB')
      //console.log("Date:", formattedDate)

      return {
        id: reviewDoc.id,
        ...reviewData,
        Date: formattedDate
      }
    })

    // update our reviews array with all reviews made for the products
    setDBreviews(reviewsData)
    //console.log("DBreviews:", DBreviews)
  }

  //Returns HTML components to be displayed with relevant data
  return (
    <div className="review-grid">
      {DBreviews.length === 0 ? 
      (<p className = "error-card">There are no reviews on this product yet</p>) : 
      (DBreviews.map((review) => (
        <ReviewCard
          key={review.id}
          customer={review.User}
          stars={review.Stars}
          description={review.Review}
          date={review.Date}
        />
      ))
    )}
    </div>
  );
}

export default ReviewGrid;
