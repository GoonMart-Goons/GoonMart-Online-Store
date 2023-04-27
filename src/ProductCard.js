import React, {useState, useEffect} from 'react';
import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Star from './Star';

const ProductCard = ({ image, name, rating, reviews, price }) => {
  const navigate = useNavigate();

  //  MY FAILED ATTEMPT AT IMPORTING PICTURES
 /* const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const storageRef = getStorage(firebase).ref();
    const imageRef = storageRef.child(image);
    imageRef.getDownloadURL()
      .then(url => setImageURL(url))
      .catch(error => console.log(error));
  }, []);*/

  return (
    <div className="product-card" onClick = {() => navigate('/productpage')}>
      <div className="product-image">
        <img src={image} alt={name} height={400}/>
      </div>
      <div className="product-info">
        <div className="product-name">{prodName}</div>
        <div className="product-rating">
          {/*{[...Array(ratingSum)].map((star, index) => {
            return <span key={index} className="star">&#9733;</span>
          })}*/}
          <Star rating={ratingSum/ratingCount} />
          {/*<div className="product-reviews">{reviews}</div>*/}
        </div>
        
        <div className="product-price">R {price}</div>
      </div>
    </div>
  );
}

export default ProductCard;

// {/* <img src={imageURL} alt={prodName} height={300}/> */}

  //  MY FAILED ATTEMPT AT IMPORTING PICTURES
 /* const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const storageRef = getStorage(firebase).ref();
    const imageRef = storageRef.child(image);
    imageRef.getDownloadURL()
      .then(url => setImageURL(url))
      .catch(error => console.log(error));
  }, []);*/