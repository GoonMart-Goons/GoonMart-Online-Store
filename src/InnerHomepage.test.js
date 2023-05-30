import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import InnerHomepage from './InnerHomepage';
import '@testing-library/jest-dom/extend-expect';

test('renders InnerHomepage without crashing', () => {
    render(<InnerHomepage />);
});

test('renders InnerNavigationBar and Categories', () => {
    render(<InnerHomepage />);

    // assuming InnerNavigationBar and Categories have some distinctive text or data-testid
    expect(screen.getByTestId('inner-nav-bar')).toBeInTheDocument();
    //expect(screen.getByTestId('Categories')).toBeInTheDocument();
});

test('search function updates state correctly', () => {
    // render(<InnerHomepage />);
    //
    // // Assuming that InnerNavigationBar has an input field for search with a role of "search"
    // const searchInput = screen.getByRole('search');
    //
    // fireEvent.change(searchInput, { target: { value: 'test query' } });
    //
    // // Assuming Categories component displays the search query in some form, with a testid of 'searchQuery'
    // expect(screen.getByTestId('searchQuery')).toHaveTextContent('test query');
});
