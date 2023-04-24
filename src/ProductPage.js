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




class ProductPage extends React.Component{
    state = {
        products: [
            {
                "_id": "1",
                "title": "Nike Shoes",
                "src": [
                    "https://www.upsieutoc.com/images/2020/06/27/img1.jpg",
                    "https://www.upsieutoc.com/images/2020/06/27/img2.jpg",
                    "https://www.upsieutoc.com/images/2020/06/27/img3.jpg",
                    "https://www.upsieutoc.com/images/2020/06/27/img4.jpg"
                ],
                "description": "UI/UX designing, html css tutorials",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 23,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1
            }
        ],
        index: 0
    };
    myRef = React.createRef();

    handleTab = index => {
        this.setState({ index: index })
        const images = this.myRef.current.children;
        for (let i = 0; i < images.length; i++) {
            images[i].className = images[i].className.replace("active", "");
        }
        images[index].className = "active";
    };
    componentDidMount() {
        const { index } = this.state;
        this.myRef.current.children[index].className = "active";
    }


    render() {

        const { products, index } = this.state;
        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3
            }
        };

        return (  
            <><div className="app">
                {products.map(item => (
                    <div className="details" key={item._id}>
                        <div className="big-img">
                            <img src={item.src[index]} alt="" />
                        </div>


                        <div className="box">
                            <div className="row">
                                <h2>{item.title}</h2>
                                <span>R {item.price}</span>
                            </div>
                            <Colors colors={item.colors} />
                            <Star stars="2" />

                            <p>{item.description}</p>
                            <div className="Box">
                                <button type="button" className="Dec">-</button>
                                <div className="control text">quantity</div>
                                <button type="button" className="Inc">+</button>
                            </div>
                            <p>In Stock</p>
                            <p>{item.content}</p>

                            <DetailsThumb images={item.src} tab={this.handleTab} myRef={this.myRef} />
                            <button className="cart"> Add to Cart</button>


                        </div>
                    </div>
                ))}

            </div><Carousel className="Carousel" responsive={responsive}>
                    <div>Item 1</div>
                    <div>Item 2</div>
                    <div>Item 3</div>
                    <div>Item 4</div>
                </Carousel></>

       
        
        );
    };
}


export default ProductPage;
