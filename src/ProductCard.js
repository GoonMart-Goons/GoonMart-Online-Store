import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Star from './Star';

// Firebase imports
import { db, storage } from './config/Config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

const ProductCard = ({
  image,
  prodName,
  price,
  id,
  quantity,
  prodDesc,
  category,
  salePercentage,
}) => {
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState(null);

  // Fetch and generate image from database
  useEffect(() => {
    const imgRef = ref(storage, image);

    getDownloadURL(imgRef)
      .then((url) => {
        setImageURL(url);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [image]);

  const [averageRating, setAverageRating] = useState(0);

  // Function is called when page loads
  useEffect(() => {
    calculateAverageRating(id);
  }, []);

  async function calculateAverageRating(id) {
    // Enter the reviews collection of the product in the database
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

    // Calculate average
    const average = totalStars / reviewsSnapshot.size;

    setAverageRating(average);
    console.log('Average rating:', average);
  }

  // Calculate the discounted price
  const discountedPrice = price - (price * salePercentage) / 100;

  return (
    // When card is clicked, navigate to the corresponding product page (pass through associated props)
    <div
      className="product-card"
      onClick={() =>
        navigate('/productpagenew', {
          state: { image, prodName, averageRating, price, id, quantity, prodDesc, category, salePercentage },
        })
      }
      data-testid="product-cardx"
    >
      {/* Display product details -> Name, image, avgRating, price */}
      <div className="product-image">{imageURL && <img src={imageURL} alt={prodName} height={300} />}</div>
      <div className="product-info">
        <div className="product-name">{prodName}</div>
        <div className="product-rating">
          <Star rating={averageRating} />
        </div>

        {salePercentage > 0 && (
          <div>
            <div className="product-price">
              WAS <span className="original-price">R {price} </span><br/>
              <span className="discounted-price"> NOW R {discountedPrice}</span>
            </div>
            <div className="sale-info">{salePercentage}% off</div>
          </div>
        )}

        {salePercentage === 0 && <div className="product-price">R {price}</div>}
      </div>
    </div>
  );
};

export default ProductCard;
