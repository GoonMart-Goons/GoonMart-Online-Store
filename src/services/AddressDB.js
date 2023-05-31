import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../config/Config';
import React, {useState, useEffect} from 'react';
import DeliveryDets from '../DeliveryDets';


const UserReviews = ({user}) => { 
  //console.log(user)
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
        //console.log(prodDoc.id)
        
        const reviewsRef = collection(db, 'Users', prodDoc.id, 'Address')
        const reviewsSnapshot = await getDocs(reviewsRef)

        if (reviewsSnapshot.empty){
            console.log('This product has no reviews')
            return
          }
          //console.log(reviewsSnapshot.docs[0].data())
          const reviewsData= reviewsSnapshot.docs[0];
          
          

          

        //console.log(prodSnapshot.empty);
        //console.log(prodDoc.data());
        //console.log(prodSnapshot.docs.data());

        //const data = prodDoc.data();

        setProdDetails([reviewsData.get('Town'), reviewsData.get('Name'),reviewsData.get('Address'),reviewsData.get('PostalCode')]);
        //console.log(ProdDetails[0]);
        //console.log(ProdDetails[1].split(' ')[0]);

        
        
    }
    return (
        <div className="review-grid">
      {ProdDetails.length === 0 ? 
      (        <DeliveryDets
        Town={''}
        Name={''}
        Surname={''}
        Address={''}
        PostalC={''}
        />) : 
      (
        <DeliveryDets
        Town={ProdDetails[0]}
        Name={ProdDetails[1].split(' ')[0]}
        Surname={ProdDetails[1].split(' ')[1]}
        Address={ProdDetails[2]}
        PostalC={ProdDetails[3]}
        />
      
    )}

      </div>

    );
    }
export default UserReviews;
