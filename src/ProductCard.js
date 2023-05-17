import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Star from './Star';

//FireBase imports
import { db, storage } from './config/Config';
import { collection, query, where, getDocs } from 'firebase/firestore';
/*import { getStorage, ref, getDownloadURL } from '@firebase/storage';*/
//import { storage } from './config/Config';
import { ref, getDownloadURL } from 'firebase/storage';

const ProductCard = ({ image, prodName /*ratingSum, ratingCount reviews*/, price, id, quantity, prodDesc, category }) => {
  const navigate = useNavigate();

  // function getImagePath(imageName) {
  //   while (imageName.includes(" ")) {
  //     imageName = imageName.replace(' ', '%20');
  //   }
  //   return 'imgs/products/' + imageName + '.jpg';
  // }

  // image = getImagePath(prodName)
  // console.log("Image file name:", image)

  const [imageURL, setImageURL] = useState(null)

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

  useEffect(() => {
    calculateAverageRating(id);
  }, []);
  
  async function calculateAverageRating(id) {

    const reviewsRef = collection(db, 'Products', id, 'Reviews');
    const reviewsSnapshot = await getDocs(reviewsRef);

    if (reviewsSnapshot.empty) {
      console.log('This product has no reviews.');
      return;
    }

    const totalStars = reviewsSnapshot.docs.reduce((sum, reviewDoc) => {
      const reviewData = reviewDoc.data();
      return sum + reviewData.Stars;
    }, 0);

    const average = totalStars / reviewsSnapshot.size;

    setAverageRating(average);
    console.log('Average rating:', average);
  }

  //image = getImagePath(prodName)
  //console.log("Image file name:", image)

  //const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    calculateAverageRating(id);
  }, []);
  
  async function calculateAverageRating(id) {

    const reviewsRef = collection(db, 'Products', id, 'Reviews');
    const reviewsSnapshot = await getDocs(reviewsRef);

    if (reviewsSnapshot.empty) {
      console.log('This product has no reviews.');
      return;
    }

    const totalStars = reviewsSnapshot.docs.reduce((sum, reviewDoc) => {
      const reviewData = reviewDoc.data();
      return sum + reviewData.Stars;
    }, 0);

    const average = totalStars / reviewsSnapshot.size;

    setAverageRating(average);
    console.log('Average rating:', average);
  }

  return (
    <div className="product-card" onClick = {() => navigate('/productpagenew', {
      state: {image, prodName, averageRating, price, id, quantity, prodDesc, category }
    
    })} data-testid="product-cardx">
      <div className="product-image">
        {/*{imageURL && <img  src={imageURL} alt={prodName} height={400}/>}*/}
        {/* <img src={image} alt={prodName} height={300}/> */}
        {imageURL && <img src={imageURL} alt={prodName} height={300}/>}
      </div>
      <div className="product-info">
        <div className="product-name">{prodName}</div>
        <div className="product-rating">
          {/*{[...Array(ratingSum)].map((star, index) => {
            return <span key={index} className="star">&#9733;</span>
          })}*/}
          <Star rating={averageRating} />
          {/*<div className="product-reviews">{reviews}</div>*/}
        </div>
        
        <div className="product-price">{price}</div>
      </div>
    </div>
  );
}

export default ProductCard;