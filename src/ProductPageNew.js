import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import './ProductPage.css';
import Star from './Star';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ReviewGrid from './ReviewGrid';

import ProductCard from './ProductCard';

//FireBase imports
import { db } from './config/Config'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { storage } from './config/Config';
import { ref, getDownloadURL } from 'firebase/storage';

const ProductPageNew = () => {

    const {state} = useLocation();

    //Access the props from state object
    const {image, prodName, ratingSum, ratingCount, price, id, quantity, prodDesc, category } = state;

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
    
    //const {image, prodName, ratingSum, ratingCount /*reviews*/, price, id, quantity, prodDesc } = location.state;
    const [products, setProducts] = useState([/*suggestedProducts[0]*/]);
    const [index, setIndex] = useState(0);
    const [quantityCount, setQuantityCount] = useState(1);


    const handleIncrement = () => {
        if (quantityCount < quantity) {
            setQuantityCount(quantityCount +1);
        }
    }

    const handleDecrement = () => {
        if (quantityCount > 1) {
            setQuantityCount(quantityCount -1);
        }
    }

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        }
    };
         
    const [DBproducts, setDBproducts] = React.useState([]);

        async function dataBase(){
            const prodsRef = collection(db, 'Products')
            console.log(category);
            const q  = query(prodsRef, where('category', '==', category))
            
            const querySnapshot = await getDocs(q)
            //Queried documents
            const DBproducts = querySnapshot.docs.map(doc => {
                const data = doc.data();
                //Adds the id property to each product
                data.id = doc.id;
                return data;
            });
            //console.log(DBproducts);
            return DBproducts;
        }
        

        React.useEffect(() => {
            dataBase().then(products => {
            setDBproducts(products);
            });
        }, [category]);

        return (  
            <><div className="app">
                    <div className="details" key={id}>
                        <div className="big-img">
                            {imageURL && <img src={imageURL} alt={prodName}/>}
                            {/* <img src={image} alt={prodName} /> */}
                          
                        </div>


                        <div className="box">
                            
                                <h2>{prodName}</h2>
                                <h2>R {price}</h2>
                    
                           <h6><Star rating={ratingSum/ratingCount} /></h6> 

                            <p>{prodDesc}</p>

                            <div className="Box">
                                <button type="button" className="Dec" onClick = {handleDecrement} >-</button>
                                <div className="control text">{quantityCount}</div>
                                <button type="button" className="Inc" onClick={handleIncrement}>+</button>
                            </div>
                            <p>In Stock</p>
                            <button className="cart">Add to Cart</button>


                        </div>

                    </div>

                    <h2 className="heading">Suggested Products</h2>
                    <Carousel className = "Carousel-container" responsive={responsive}>
                    
                    {DBproducts.map(product => {
                        return (
                        <ProductCard
                            /*key={product.id}*/
                            prodName={product.prodName}
                            image={product.imageURL}
                            ratingSum={product.ratingSum}
                            ratingCount={product.ratingCount}
                            /*reviews={product.reviews}*/
                            price={product.price}
                            id ={product.id}
                            quantity = {product.quantity}
                            prodDesc = {product.prodDesc}
                            category = {product.category}
                        />
                        );
                    })}
                    
                    </Carousel>

                    <h2 className='heading'>Reviews</h2>
                    <ReviewGrid productName={prodName}/>

                </div>
                </>

        );
    };

export default ProductPageNew;