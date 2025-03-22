import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './Search';

describe('Search Component', () => {
  test('Test that component renders an input with the value equal to initial value passed in props', () => {
    render(<SearchBar initialQuery="Initial Value" />);

    const inputElement = screen.getByPlaceholderText('What do you want to watch?');

    expect(inputElement).toHaveValue('Initial Value');
  });

  test('Test that after typing to the input and a "click" event on the Submit button, the "onChange" prop is called with proper value', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar initialQuery="" onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText('What do you want to watch?');
    const searchButton = screen.getByText('Search');

    fireEvent.change(inputElement, { target: { value: 'Test' } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('Test');
  });

  test('Test that after typing to the input and pressing Enter key, the "onChange" prop is called with proper value', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar initialQuery="" onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText('What do you want to watch?');
    fireEvent.change(inputElement, { target: { value: 'Test' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('Test');
  });
});