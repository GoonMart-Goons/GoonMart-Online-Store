import React, {useState, useEffect} from 'react';
import ReviewCard from './ReviewCard';
import './Reviews.css';

//FireBase imports
import { db } from './config/Config'
import { collection, query, where, getDocs } from 'firebase/firestore';


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

const ReviewGrid = () => {

  /*const [DBproducts, setDBproducts] = React.useState([]);

  async function dataBase(){
    const prodsRef = collection(db, 'Products')
    console.log(activeCategoryName);
    let q
    if (activeCategoryName === "All"){
      q = query(prodsRef, where('category', 'in', ["Electronics", "Clothing", "Home & Kitchen", "Toys & Games"]))
    } else {
      q = query(prodsRef, where('category', '==', activeCategoryName))
    }
    
    const querySnapshot = await getDocs(q)
    //Queried documents
    const DBproducts = querySnapshot.docs.map(doc => doc.data());
    //console.log(DBproducts);
    return DBproducts;
  }
  

  React.useEffect(() => {
    dataBase().then(products => {
      setDBproducts(products);
    });
  }, [activeCategoryName]);*/

  /*const filteredProducts = activeCategoryId === 0 
  ?  products : products.filter(product => product.category === activeCategoryId);*/

  return (
    <div className="review-grid">
      {reviews.map(review => {
          return (
            <ReviewCard
                customer = {review.customer}
                stars = {review.stars}
                description = {review.description}
                date = {review.date}
            />
          );
        })
      }
    </div>
  );
}

export default ReviewGrid;
