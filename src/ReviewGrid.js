import React, {useState, useEffect} from 'react';
import ReviewCard from './ReviewCard';
import './Reviews.css';

//FireBase imports
import { db } from './config/Config'
import { collection, query, where, getDocs } from 'firebase/firestore';


/*const reviews = [
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
  } ];*/

const ReviewGrid = ({id}) => {
  
  const [DBreviews, setDBreviews] = React.useState([])

  /*React.useEffect(() => {
    getProductReviews(id)
  }, []) */
  
  async function getProductReviews(){
    
    console.log("prodID:", id)
    
    /*const prodsRef = collection(db, 'Products')
    const q = query(prodsRef, where('prodName', '==', prodName))
    const prodSnapshot = await getDocs(q)

    const prodDoc = prodSnapshot.docs[0]
    console.log("prodDoc", prodDoc) */

    const reviewsRef = collection(db, 'Products', id, 'Reviews')

    const reviewsSnapshot = await getDocs(reviewsRef)

    if (reviewsSnapshot.empty){
      console.log('This product has no reviews')
      return []
    }

    const reviewsData = reviewsSnapshot.docs.map((reviewDoc) => {
      const data = reviewDoc.data()
      data.id = reviewDoc.id;
      return data;
    });
    //console.log("reviews:", reviewsData)
    return reviewsData
  }

  //call the getProductReviews function and set the DBreviews array to the array that is returned
  React.useEffect(() => {
    getProductReviews().then(reviews => {
      setDBreviews(reviews);
      console.log("DBreviews: ", DBreviews)
    });
  }, [id]);

  //Returns HTML components to be displayed with relevant data
  return (
    <div className="review-grid">
      {DBreviews.map((review) => {
          return (
            <ReviewCard
                id = {review.id}
                customer = {review.User}
                stars = {review.Stars}
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
