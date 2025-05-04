import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
    it('renders the button with the correct text', () => {
        render(<Button text="Click Me" />);
        const buttonElement = screen.getByText(/Click Me/i);
        expect(buttonElement).toBeInTheDocument();
    });
    
    it('calls the onClick function when clicked', () => {
        const handleClick = jest.fn();
        render(<Button text="Click Me" onClick={handleClick} />);
        const buttonElement = screen.getByText(/Click Me/i);
        buttonElement.click();
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});