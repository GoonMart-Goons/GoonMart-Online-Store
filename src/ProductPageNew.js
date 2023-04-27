import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import './ProductPage.css';
import Colors from './Colors'
import DetailsThumb from './DetailsThumb';
import Star from './Star';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {
    Card,
    CardSubtitle,
    CardText,
    CardTitle,
    CardBody,
    CardImg,
} from "reactstrap";

import phoneSale from './phone.jpg';
import cookWare from './cookware.jpg';
import shirt from './tshirt.jpg';
import ProductCard from './ProductCard';

const suggestedProducts = [
    {
      id: 1,
      name: 'Product 1',
      image: phoneSale,
      rating: 4,
      reviews: 10,
      price: '$10.00',
      category: 1,
      description: "Latest of the Apple iPhone range",
      content: "This is a premium cellular device with an aluminium frame and ultra tempered protective glass. The phone comes with 128GB of storage and I have ran out of lies to say so I am just going to end this reasonably sized paragraph here.",
                
    }
]

const ProductPageNew = () => {

    const {state} = useLocation();

    //Access the props from state object
    const {image, prodName, ratingSum, ratingCount, price, id, quantity, prodDesc } = state;
    
    //const {image, prodName, ratingSum, ratingCount /*reviews*/, price, id, quantity, prodDesc } = location.state;
    const [products, setProducts] = useState([suggestedProducts[0]]);
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

                            <div className="Box">
                                <button type="button" className="Dec" onClick = {handleDecrement} >-</button>
                                <div className="control text">{quantityCount}</div>
                                <button type="button" className="Inc" onClick={handleIncrement}>+</button>
                            </div>
                            <p>In Stock</p>
                            <button className="cart">Add to Cart</button>


                        </div>
                    </div>

            </div>
            <Carousel className="Carousel" responsive={responsive}>
                    
                    {suggestedProducts.map(product => {
                        return (
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            image={product.image}
                            rating={product.rating}
                            reviews={product.reviews}
                            price={product.price}
                        />
                        );
                    })}
                  
                </Carousel></>

        );
    };

export default ProductPageNew;