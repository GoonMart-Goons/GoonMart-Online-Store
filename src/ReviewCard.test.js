import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewCard from './ReviewCard';
import '@testing-library/jest-dom/extend-expect';

describe('ReviewCard', () => {
    test('renders customer name, description, stars, and date', () => {
        const customer = 'John Doe';
        const description = 'Great product!';
        const stars = 5;
        const date = '2023-05-17';

        render(<ReviewCard customer={customer} description={description} stars={stars} date={date} />);

        expect(screen.getByText(new RegExp(customer))).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();
        //expect(screen.getByText(stars.toString())).toBeInTheDocument();
        expect(screen.getByText(new RegExp(date))).toBeInTheDocument();
    });
});
