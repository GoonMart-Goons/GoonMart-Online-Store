import React, {useState, useEffect} from 'react';
import ReviewCard from './ReviewCard';
import './Reviews.css';

//FireBase imports
import { db } from './config/Config'
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';


const reviews = [
  {
    id: 1,
    customer: 'Banana Apricot',
    stars: 4,
    description: "this was the best [insert product here] that I have ever used",
    date: "11 Jan 2022"
  },
  {
    id: 2,
    customer: 'Mango Pear',
    stars: 1,
    description: "It came delivered already in seven pieces",
    date: "23 Aug 2022"
  },
  {
    id: 3,
    customer: 'Grape Melon',
    stars: 3,
    description: "It came on time and works well",
    date: "12 Mar 2023"
  } ];

const ReviewGrid = ({productName}) => {
  
  const [DBreviews, setDBreviews] = React.useState([])

  React.useEffect(() => {
    getProductReviews(productName)
  }, [])
  
  async function getProductReviews(prodName){
    console.log("prodname:", prodName)
    const prodsRef = collection(db, 'Products')
    const q = query(prodsRef, where('prodName', '==', prodName))
    const prodSnapshot = await getDocs(q)

    const prodDoc = prodSnapshot.docs[0]

    const reviewsRef = collection(db, 'Products', prodDoc.id, 'Reviews')
    const reviewsSnapshot = await getDocs(reviewsRef)
    if (reviewsSnapshot.empty){
      console.log('This product has no reviews')
      return
    }

    const reviewsData = reviewsSnapshot.docs.map((reviewDoc) => {
      const reviewData = reviewDoc.data()
      const timestamp = reviewData.Date

      //Convert FB timestamp to JS date
      const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp)
      
      //Formats date to dd/mm/yyyy
      const formattedDate = date.toLocaleDateString('en-GB')
      console.log("Date:", formattedDate)

      return {
        id: reviewDoc.id,
        ...reviewData,
        Date: formattedDate
      }
    })

    setDBreviews(reviewsData)
    console.log("DBreviews:", DBreviews)
  }

  //Returns HTML components to be displayed with relevant data
  return (
    <div className="review-grid">
      {DBreviews.map((review) => {
          return (
            <ReviewCard
                key = {review.id}
                customer = {review.User}
                stars = {5}
                description = {review.Review}
                date = {review.Date}
            />
          );
        })
      }
    </div>
  );
}

export default ReviewGrid;
