import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import './ProductPage.css';
import Star from './Star';
import Carousel from 'react-multi-carousel';
import ProductCard from './ProductCard';
import ReviewGrid from './ReviewGrid';
import ProductPageNavBar from './ProductPageNavBar';

//FireBase imports
import { db } from './config/Config';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { storage } from './config/Config';
import { ref, getDownloadURL } from 'firebase/storage';
//Cart functions
import { CartContext } from './CartContext';

const ProductPageNew = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { image, prodName, averageRating, price, id, quantity, prodDesc, category, salePercentage } = state;

  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const imgRef = ref(storage, image);

    getDownloadURL(imgRef)
      .then((url) => {
        setImageURL(url);
      })
      .catch((error) => {
        //console.error(error)
      });
  }, [image]);

  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [quantityCount, setQuantityCount] = useState(1);

  const handleIncrement = () => {
    if (quantityCount < quantity) {
      setQuantityCount(quantityCount + 1);
    }
  };

  const handleDecrement = () => {
    if (quantityCount > 1) {
      setQuantityCount(quantityCount - 1);
    }
  };

  const { addToCart } = useContext(CartContext);
  const handleAddToCart = (item) => {

    addToCart({
      id: id,
      name: prodName,
      image: image,
      quantity: quantityCount,
      price: price - (price * salePercentage)/100 //const discountedPrice = price - (price * salePercentage) / 100; // Calculate the sale price
    });
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
  };

  const [DBproducts, setDBproducts] = React.useState([]);

  async function dataBase() {
    const prodsRef = collection(db, 'Products');
    const q = query(prodsRef, where('category', '==', category));

    const querySnapshot = await getDocs(q);
    const DBproducts = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });

    return DBproducts;
  }

  React.useEffect(() => {
    dataBase().then((products) => {
      setDBproducts(products);
    });
  }, [category]);

  const discountedPrice = price - (price * salePercentage) / 100;

  return (
    <>
      <ProductPageNavBar />
      <div className="app">
        <div className="details" key={id}>
          <div className="big-img">
            {imageURL && <img src={imageURL} alt={prodName} />}
          </div>
                
          <div className="box">
            <h2>{prodName}</h2>
            {salePercentage > 0 && (
          <div>
            <div className="product-price">
                <h2 className="original-price">R {price} </h2>
                 <h2 className="discounted-price"> NOW R {discountedPrice}</h2>
            </div>
          </div>
        )}
        {salePercentage === 0 && <div className="product-price"><h2>R {price} </h2></div>}
            <h6>
              <Star rating={averageRating} />
            </h6>
            <p>{prodDesc}</p>
            <div className="Box">
              <button type="button" className="Dec" onClick={handleDecrement}>
                -
              </button>
              <div className="control text">{quantityCount}</div>
              <button type="button" className="Inc" onClick={handleIncrement}>
                +
              </button>
            </div>
            <p>In Stock</p>
            <button className="cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="view-cart" onClick={() => navigate('/cart')}>
              View Cart
            </button>
          </div>
        </div>
        <div>
          <h2 className="heading">Suggested Products</h2>
          <Carousel className="Carousel-container" responsive={responsive}>
            {DBproducts.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  prodName={product.prodName}
                  image={product.imageURL}
                  price={product.price}
                  id={product.id}
                  quantity={product.quantity}
                  prodDesc={product.prodDesc}
                  category={product.category}
                  salePercentage={product.salePercentage}
                />
              );
            })}
          </Carousel>
          <h2 className="heading">Reviews</h2>
          <ReviewGrid productName={prodName} />
        </div>
      </div>
    </>
  );
};

export default ProductPageNew;
