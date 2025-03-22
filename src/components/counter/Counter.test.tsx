import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from './Counter';

describe('Counter Component', () => {
  test('Test that component renders initial value provided in props', () => {
    render(<Counter initial={5} />);

    const countDisplay = screen.getByText('5');

    expect(countDisplay).toBeInTheDocument();
  });

  test('Test that a click event on "decrement" button decrements the displayed value', () => {
    render(<Counter initial={5} />);

    const decrementButton = screen.getByText('-');
    fireEvent.click(decrementButton);

    const countDisplay = screen.getByText('4');
    expect(countDisplay).toBeInTheDocument();
  });

  test('Test that a click event on "increment" button increments the displayed value', () => {
    render(<Counter initial={5} />);

    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);

    const countDisplay = screen.getByText('6');
    expect(countDisplay).toBeInTheDocument();
  });
});