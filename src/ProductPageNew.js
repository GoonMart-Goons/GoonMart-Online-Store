import React, {useState, useContext} from 'react';
import './ProductPage.css';
import Star from './Star';
import Carousel from 'react-multi-carousel';
import {useLocation, useNavigate} from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import ProductCard from './ProductCard';
//FireBase imports
import { db } from './config/Config'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { CartContext } from './CartContext';



const ProductPageNew = () => {

    const {state} = useLocation();
    const navigate = useNavigate();

    //Access the props from state object
    const {image, prodName, ratingSum, ratingCount, price, id, quantity, prodDesc, category } = state;

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
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = (item) => {
        alert('Item added to cart');
        addToCart({
            id: id,
            name: prodName,
            image: image,
            quantity: quantityCount,
            price: price
        });
    };

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        }
    };


    const [DBproducts, setDBproducts] = React.useState([]);

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
    }, [category]);

    return (
        <><div className="app">
            <div className="details" key={id}>
                <div className="big-img">
                    <img src={image} alt={prodName} />

                </div>


                <div className="box">

                    <h2>{prodName}</h2>
                    <h2>R {price}</h2>

                    <h6><Star rating={ratingSum/ratingCount} /></h6>

                    <p>{prodDesc}</p>

                    </div>
                    <p>In Stock</p>
                    <button className="cart" onClick={() => {
                        addToCart({
                            id: id,
                            name: prodName,
                            image: image,
                            quantity: quantityCount,
                            price: price
                        });
                    }}>Add to Cart</button>
                    <button className="view-cart" onClick={() => navigate('/cart')}>View Cart</button>



                </div>
            </div>

            <div>
                <h2>Suggested Products</h2>
                <Carousel className="Carousel" responsive={responsive}>

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

    );
};

export default ProductPageNew;