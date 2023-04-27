import React from 'react';
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
                
    },
    {
      id: 2,
      name: 'Product 2',
      image: shirt,
      rating: 3,
      reviews: 5,
      price: '$20.00',
      category: 2
    },
    {
      id: 3,
      name: 'Product 3',
      image: cookWare,
      rating: 5,
      reviews: 20,
      price: '$15.00',
      category: 3
    }
]

class ProductPage extends React.Component{
    state = {
        products: [
            
                /*id: 1,
                name: "Nike Shoes",
                image (src) : [
                    "https://www.upsieutoc.com/images/2020/06/27/img1.jpg",
                    "https://www.upsieutoc.com/images/2020/06/27/img2.jpg",
                    "https://www.upsieutoc.com/images/2020/06/27/img3.jpg",
                    "https://www.upsieutoc.com/images/2020/06/27/img4.jpg"
                ],
                description: "UI/UX designing, html css tutorials",
                content: "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                price: 1323,
                rating: 3.5,
                colors: ["red", "black", "crimson", "teal"],
                count: 1 */
            
            
            suggestedProducts[0]
    
        ],
        
        index: 0, 
        quantityCount: 1
    };
    /*myRef = React.createRef();

    handleTab = index => {
        this.setState({ index: index })
        const images = this.myRef.current.children;
        for (let i = 0; i < images.length; i++) {
            images[i].className = images[i].className.replace("active", "");
        }
        images[index].className = "active";
    };*/

    handleIncrement = () => {
        this.setState(prevState => {
            return{
                quantityCount: prevState.quantityCount + 1
            }
        });
    }

    handleDecrement = () => {
        if (this.state.quantityCount > 1) {
            this.setState(prevState => {
                return{
                    quantityCount: prevState.quantityCount - 1
                }
            });
        }
    }
       

    /*componentDidMount() {
        const { index } = this.state;
        this.myRef.current.children[index].className = "active";
    }*/


    render() {

        const { products, index, quantityCount } = this.state;
        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3
            }
        }; 

        return (  
            <><div className="app">
                {products.map(item => (
                    <div className="details" key={item.id}>
                        <div className="big-img">
                            <img src={item.image /*[index]*/} alt="" />
                          {/*} <DetailsThumb images={item.src} tab={this.handleTab} myRef={this.myRef} />*/}
                        </div>


                        <div className="box">
                            {/* <div className="row"> */}
                                <h2>{item.name}</h2>
                                <h2>R {item.price}</h2>
                            {/* </div> */}
                            {/*<Colors colors={item.colors} />*/}
                            <h6><Star rating={item.rating} /></h6>

                            <p>{item.description}</p>
                            
                            <p>{item.content}</p>

                            <div className="Box">
                                <button type="button" className="Dec" onClick = {this.handleDecrement} >-</button>
                                <div className="control text">{this.state.quantityCount}</div>
                                <button type="button" className="Inc" onClick={this.handleIncrement}>+</button>
                            </div>
                            <p>In Stock</p>
                            <button className="cart"> Add to Cart</button>


                        </div>
                    </div>
                ))}

            </div>
            <Carousel className="Carousel" responsive={responsive}>
                    {/*<div>Item 1</div>
                    <div>Item 2</div>
                    <div>Item 3</div>
                    <div>Item 4</div>*/}
                    
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
}

export default ProductPage;