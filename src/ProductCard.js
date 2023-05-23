import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Star from './Star';

//FireBase imports
import { db, storage } from './config/Config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

const ProductCard = ({ image, prodName /*ratingSum, ratingCount reviews*/, price, id, quantity, prodDesc, category }) => {
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState(null)

  //fetch and generage image from database
  useEffect(() => {
    const imgRef = ref(storage, image)

    getDownloadURL(imgRef)
      .then((url) => {
        setImageURL(url)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [image])

  const [averageRating, setAverageRating] = useState(0);

  //Function is called when page loads
  useEffect(() => {
    calculateAverageRating(id);
  }, []);
  
  async function calculateAverageRating(id) {

    //Enter the reviews collection of the product in database
    const reviewsRef = collection(db, 'Products', id, 'Reviews');
    const reviewsSnapshot = await getDocs(reviewsRef);

    // Case if no reviews (and rating)
    if (reviewsSnapshot.empty) {
      console.log('This product has no reviews.');
      return;
    }

    // Sum over the Stars field of all products ratings
    const totalStars = reviewsSnapshot.docs.reduce((sum, reviewDoc) => {
      const reviewData = reviewDoc.data();
      return sum + reviewData.Stars;
    }, 0);

    //calculate average
    const average = totalStars / reviewsSnapshot.size;

    setAverageRating(average);
    //console.log('Average rating:', average);
  }

  return (
    // When card is clicked, navigate to corresponding product page (pass through assocciated props)
    <div className="product-card" onClick = {() => navigate('/productpagenew', {
      state: {image, prodName, averageRating, price, id, quantity, prodDesc, category }
    
    })} data-testid="product-cardx">
      {/* Display product details -> Name, image, avgRating, price*/}
      <div className="product-image">
        {imageURL && <img src={imageURL} alt={prodName} height={300}/>}
      </div>
      <div className="product-info">
        <div className="product-name">{prodName}</div>
        <div className="product-rating">
          <Star rating={averageRating} />
        </div>
        
        <div className="product-price">R {price}</div>
      </div>
    </div>
  );
}

export default ProductCard;