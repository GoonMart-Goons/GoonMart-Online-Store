import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../config/Config';
import React, {useState, useEffect} from 'react';
import ReviewCard from '../ReviewCard';


const UserReviews = ({user}) => { 
  console.log(user)
    const [ProdDetails, setProdDetails] = React.useState([])
    //console.log(user);

    React.useEffect(() => {
        getUserDetails(user)
      }, [])

    async function getUserDetails(user){
        const prodsRef = collection(db, 'Users')
        const q = query(prodsRef, where('email', '==',user));
        const prodSnapshot = await getDocs(q)
        const prodDoc = prodSnapshot.docs[0]
        console.log(prodDoc.id)
        
        const reviewsRef = collection(db, 'Users', prodDoc.id, 'Reviews')
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
            //console.log("Date:", formattedDate)
      
            return {
              id: reviewDoc.id,
              ...reviewData,
              Date: formattedDate
            }
          })
        //console.log(prodSnapshot.empty);
        //console.log(prodDoc.data());
        //console.log(prodSnapshot.docs.data());

        //const data = prodDoc.data();

        setProdDetails(reviewsData);
        //console.log(ProdDetails[2]);
        
    }
    return (
        <div className="review-grid">
        {ProdDetails.length === 0 ? 
        (<p className = "error-card">You have not yet made any reviews</p>) : 
        (ProdDetails.map((review) => (
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
export default UserReviews;
