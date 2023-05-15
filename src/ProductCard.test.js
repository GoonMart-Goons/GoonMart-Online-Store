import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import '@testing-library/jest-dom/extend-expect'; // import jest-dom for toBeInTheDocument()
import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';


describe('ProductCard', () => {
    const product = {
        image: 'https://example.com/image.jpg',
        prodName: 'Example Product',
        rating: 4,
        reviews: 10,
        price: '$19.99',
    };

    test('renders product image with correct alt text', () => {
        render(<Router> <ProductCard {...product} /> </Router> );
        const image = screen.getByAltText('Example Product');
        render(<Router> <ProductCard {...product} /> </Router> );
        const image = screen.getByAltText('Example Product');
        expect(image).toHaveAttribute('src', product.image);

    });

    test('renders product name, rating, reviews, and price', () => {
        render(<Router> <ProductCard {...product} /> </Router> );
        const prodName = screen.getByAltText('Example Product');
        //const rating = screen.getAllByText('★').length;
        render(<Router> <ProductCard {...product} /> </Router> );
        const prodName = screen.getByAltText('Example Product');
        //const rating = screen.getAllByText('★').length;
        const price = screen.getByText(product.price);
        expect(prodName).toBeInTheDocument();
        //expect(rating).toBe(product.rating);
        expect(prodName).toBeInTheDocument();
        //expect(rating).toBe(product.rating);
        expect(price).toBeInTheDocument();
    });
    // test('renders the number of reviews with "reviews" appended', () => {
    //     render(<Router> <ProductCard reviews={10} /></Router> );
    //     const reviewsElement = screen.getByText(/10/i);
    //     expect(reviewsElement).toBeInTheDocument();
    // });
    // test('renders the correct number of stars', () => {
    //     render(<Router> <ProductCard rating={4} /></Router> );
    //     const stars = screen.getAllByText('★');
    //     expect(stars.length).toEqual(4);
    // });
    test('renders the image and name', () => {
        render(<Router> <ProductCard image="image.jpg" prodName="Product Name" /></Router> );
        const imageElement = screen.getByAltText('Product Name');
        const nameElement = screen.getByText('Product Name');
        expect(imageElement).toBeInTheDocument();
        expect(nameElement).toBeInTheDocument();
    });
    // test('renders the price with a dollar sign and two decimal places', () => {
    //     render(<Router> <ProductCard price={10.00} /></Router> );
    //     const priceElement = screen.getByText('10');
    //     expect(priceElement).toBeInTheDocument();
    // });

});
