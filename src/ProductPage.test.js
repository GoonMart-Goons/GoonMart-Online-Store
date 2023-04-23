import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductPage from './ProductPage';
import '@testing-library/jest-dom/extend-expect'; // import jest-dom for toBeInTheDocument()


describe('ProductPage component', () => {
    test('renders product details correctly', () => {
        const { getByText, getAllByAltText } = render(<ProductPage />);

        // Check product title and price
        expect(getByText('Nike Shoes')).toBeInTheDocument();
        expect(getByText('R 23')).toBeInTheDocument();

        // Check colors and quantity control
        expect(getByText('red')).toBeInTheDocument();
        expect(getByText('black')).toBeInTheDocument();
        expect(getByText('crimson')).toBeInTheDocument();
        expect(getByText('teal')).toBeInTheDocument();
        expect(getByText('quantity')).toBeInTheDocument();
        expect(getByText('+')).toBeInTheDocument();
        expect(getByText('-')).toBeInTheDocument();

        // Check description and content
        expect(getByText('UI/UX designing, html css tutorials')).toBeInTheDocument();
        expect(getByText('Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.')).toBeInTheDocument();

        // Check images
        const images = getAllByAltText('');
        expect(images).toHaveLength(4);
        expect(images[0]).toHaveAttribute('src', 'https://www.upsieutoc.com/images/2020/06/27/img1.jpg');
        expect(images[1]).toHaveAttribute('src', 'https://www.upsieutoc.com/images/2020/06/27/img2.jpg');
        expect(images[2]).toHaveAttribute('src', 'https://www.upsieutoc.com/images/2020/06/27/img3.jpg');
        expect(images[3]).toHaveAttribute('src', 'https://www.upsieutoc.com/images/2020/06/27/img4.jpg');

        // Check active image
        expect(images[0]).toHaveClass('active');
    });

    test('changes active image when thumbnail is clicked', () => {

    });
});
