import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // import jest-dom for toBeInTheDocument()
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';


describe('Login Component', () => {
    test('renders Login form', () => {
        render(
            <Router>
                <Login />
            </Router>
        );
        const loginForm = screen.getByTestId("login-form");
        expect(loginForm).toBeInTheDocument();
    });

    test('submitting empty form shows validation errors', async () => {
        render(
            <Router>
                <Login />
            </Router>
        );
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('********');
        const submitButton = screen.getByText('LOGIN');

        await act(() => {
            fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
            fireEvent.change(passwordInput, { target: { value: 'short' } });
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Password is required')).toBeInTheDocument();
        });

    });

    test('submitting short password form shows validation error', async () => {
       render(
            <Router>
                <Login />
            </Router>
        );
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('********');
        const submitButton = screen.getByText('LOGIN');

        await act(() => {
            fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
            fireEvent.change(passwordInput, { target: { value: 'short' } });
            fireEvent.click(submitButton);
        });

        await waitFor(() => {
            expect(screen.getByText(/Password is required/)).toBeInTheDocument();
        });

    });

    test('submitting valid form calls SignIn function', async () => {
        // const mockSignIn = jest.fn();
        // const { getByPlaceholderText, getByText } = render(<Router> <Login SignIn={mockSignIn} /> </Router>);
        // const emailInput = getByPlaceholderText('Email');
        // const passwordInput = getByPlaceholderText('********');
        // const submitButton = getByText('LOGIN');
        //
        //
        // await act(() => {
        //     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        //     fireEvent.change(passwordInput, { target: { value: 'StrongPassword1#' } });
        //     fireEvent.click(submitButton);
        // });
        //
        // await waitFor(() => {
        //     expect(mockSignIn).toHaveBeenCalledWith({
        //         email: 'test@example.com',
        //         password: 'StrongPassword1#',
        //     });
        // });

    });

    test('clicking on "Register" button navigates to registration page', () => {
       /*const mockNavigate = jest.fn();
        const { getByText } = render(
            <Router>
                <Login navigate={mockNavigate()}/>
            </Router>
        );
        const registerButton = getByText('here');

        fireEvent.click(registerButton);

        expect(mockNavigate).toHaveBeenCalledWith('/register');*/
    });
});
