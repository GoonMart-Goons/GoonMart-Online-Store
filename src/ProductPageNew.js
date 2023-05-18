// Library and page imports 
import React, {useState, useEffect, useContext} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import './ProductPage.css';
import Star from './Star';
import Carousel from 'react-multi-carousel';
import ProductCard from './ProductCard';
import ReviewGrid from './ReviewGrid';
import ProductPageNavBar from './ProductPageNavBar';

//FireBase imports
import { db } from './config/Config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { storage } from './config/Config';
import { ref, getDownloadURL } from 'firebase/storage';
import { CartContext } from './CartContext';

const ProductPageNew = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    //Access the props from state object
    const {image, prodName, averageRating, price, id, quantity, prodDesc, category } = state;

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
    
    // Variables for communication with cart page
    const [products, setProducts] = useState([]);
    const [index, setIndex] = useState(0);
    const [quantityCount, setQuantityCount] = useState(1);

    // Function to increase product count
    const handleIncrement = () => {
        if (quantityCount < quantity) {
            setQuantityCount(quantityCount + 1);
        }
    };

    // Function to decrease product count
    const handleDecrement = () => {
        if (quantityCount > 1) {
            setQuantityCount(quantityCount - 1);
        }
    };

    // Communication of data to Cart page
    const { addToCart } = useContext(CartContext);
    const handleAddToCart = (item) => {
        alert('Item added to cart');
        addToCart({
            id: id,
            name: prodName,
            image: image,
            quantity: quantityCount,
            price: price,
        });
    };

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
    };
     
    // database retreval of suggested products
    const [DBproducts, setDBproducts] = React.useState([]);

        async function dataBase(){
            //navigate to "products" collection in database
            const prodsRef = collection(db, 'Products')
            //console.log(category);
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
        
        //used to dynamically call the dataBase function each time this page is reloaded or navigated to
        React.useEffect(() => {
            dataBase().then(products => {
            setDBproducts(products);
            });
        }, [category]);
        
        return (  
            <>  <ProductPageNavBar/>
                <div className="app">
                    <div className="details" key={id}>
                        {/*Display image*/}
                        <div className="big-img">
                            {imageURL && <img src={imageURL} alt={prodName}/>}
                        </div>

                        <div className="box">
                            {/*Desplay product details -> Name, price, avgRating, description */}
                            <h2>{prodName}</h2>
                            <h2>R {price}</h2>
                    
                           <h6><Star rating={averageRating} /></h6> 

                        <p>{prodDesc}</p>
                        <div className="Box">
                            {/*Option to select how many poducts you want to add to cart at this stage*/}
                            <button type="button" className="Dec" onClick={handleDecrement}>
                                -
                            </button>
                            <div className="control text">{quantityCount}</div>
                            <button type="button" className="Inc" onClick={handleIncrement}>
                                +
                            </button>
                        </div>
                        <p>In Stock</p>
                        {/*Add to cart button with its data sharing functionality*/}
                    <button className="cart" onClick={() => {
                        addToCart({
                            id: id,
                            name: prodName,
                            image: image,
                            quantity: quantityCount,
                            price: price
                        });
                    }}>Add to Cart</button>
                    {/*navigation to Cart page*/}
                    <button className="view-cart" onClick={() => navigate('/cart')}>View Cart</button>
                </div>
            </div>
                <div>
                <h2 className="heading">Suggested Products</h2>
                    {/*carousel that desplays the suggested products*/}
                    <Carousel className = "Carousel-container" responsive={responsive}>
                    
                    {/*Looping through all the products in the suggested products list and displaying their respective cards*/}
                    {DBproducts.map(product => {
                        return (
                        <ProductCard
                            /*key={product.id}*/
                            prodName={product.prodName}
                            image={product.imageURL}
                            /*ratingSum={product.ratingSum}
                            ratingCount={product.ratingCount}
                            reviews={product.reviews}*/
                            price={product.price}
                            id ={product.id}
                            quantity = {product.quantity}
                            prodDesc = {product.prodDesc}
                            category = {product.category}
                        />
                        );
                    })}
                    
                    </Carousel>

                    {/*the reviews section where the product name is passed in to communicate with ReviewGrid page*/}
                    <h2 className='heading'>Reviews</h2>
                    <ReviewGrid productName={prodName}/>
    
                </div>
            </div>
        </>
    );
};

export default ProductPageNew;

