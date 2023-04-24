import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import '@testing-library/jest-dom/extend-expect'; // import jest-dom for toBeInTheDocument()


describe('ProductCard', () => {
    const product = {
        image: 'https://example.com/image.jpg',
        name: 'Example Product',
        rating: 4,
        reviews: 10,
        price: '$19.99',
    };

    test('renders product image with correct alt text', () => {
        render(<ProductCard {...product} />);
        const image = screen.getByAltText(product.name);
        expect(image).toHaveAttribute('src', product.image);

    });

    test('renders product name, rating, reviews, and price', () => {
        render(<ProductCard {...product} />);
        const name = screen.getByText(product.name);
        const rating = screen.getAllByText('★').length;
        const price = screen.getByText(product.price);
        expect(name).toBeInTheDocument();
        expect(rating).toBe(product.rating);
        expect(price).toBeInTheDocument();
    });
    test('renders the number of reviews with "reviews" appended', () => {
        render(<ProductCard reviews={10} />);
        const reviewsElement = screen.getByText(/10/i);
        expect(reviewsElement).toBeInTheDocument();
    });
    test('renders the correct number of stars', () => {
        render(<ProductCard rating={4} />);
        const stars = screen.getAllByText('★');
        expect(stars.length).toEqual(4);
    });
    test('renders the image and name', () => {
        render(<ProductCard image="image.jpg" name="Product Name" />);
        const imageElement = screen.getByAltText('Product Name');
        const nameElement = screen.getByText('Product Name');
        expect(imageElement).toBeInTheDocument();
        expect(nameElement).toBeInTheDocument();
    });
    test('renders the price with a dollar sign and two decimal places', () => {
        render(<ProductCard price={10.00} />);
        const priceElement = screen.getByText('10');
        expect(priceElement).toBeInTheDocument();
    });

});
