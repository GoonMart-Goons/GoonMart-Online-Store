import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "./Register";
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';


describe("Register", () => {
    it("should invalidate empty name field", async () => {
        render(<Router> <Register /> </Router>);

        await act(() => {
            fireEvent.submit(screen.getByTestId("subbutton"));
        });
        const errorMessage = await screen.findByText(/Name is required/);
        expect(errorMessage).toBeInTheDocument();
    });
    it("should invalidate empty fields", async () => {
        render(<Router> <Register /> </Router>);
        await act(() => {
            fireEvent.submit(screen.getByTestId("subbutton"));
        });
        const errorMessage1 = await screen.findByText(/Surname is required/);
        const errorMessage3 = await screen.findByText(/Confirm Password is required/);
        const errorMessage4 = await screen.findByText(/Email is required/);
        expect(errorMessage1).toBeInTheDocument();
        expect(errorMessage3).toBeInTheDocument();
        expect(errorMessage4).toBeInTheDocument();
    });
});