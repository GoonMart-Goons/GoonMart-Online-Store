import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Star from './Star';

/*FireBase imports
import { db, storage } from './config/Config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from '@firebase/storage';*/
import { storage } from './config/Config';
import { ref, getDownloadURL } from 'firebase/storage';

const ProductCard = ({ image, prodName, ratingSum, ratingCount /*reviews*/, price, id, quantity, prodDesc, category }) => {
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

  return (
    <div className="product-card" onClick = {() => navigate('/productpagenew', {
      state: {image, prodName, ratingSum, ratingCount, price, id, quantity, prodDesc, category }
    
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
          <Star rating={ratingSum/ratingCount} />
          {/*<div className="product-reviews">{reviews}</div>*/}
        </div>
        
        <div className="product-price">R {price}</div>
      </div>
    </div>
  );
}

export default ProductCard;