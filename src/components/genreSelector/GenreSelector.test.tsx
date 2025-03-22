import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GenreSelector from './GenreSelector';

describe('GenreSelector Component', () => {
  test('Test that component renders all genres passed in props', () => {
    const genres = ['Action', 'Comedy', 'Drama', 'Horror'];
    render(<GenreSelector genres={genres} selectedGenre="" onSelect={() => {}} />);

    const genreButtons = genres.map((genre) => screen.getByText(genre));

    genreButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });

  test('Test that component highlights a selected genre passed in props', () => {
    const genres = ['Action', 'Comedy', 'Drama', 'Horror'];
    const selectedGenre = 'Horror';
    render(<GenreSelector genres={genres} selectedGenre={selectedGenre} onSelect={() => {}} />);

    const selectedButton = screen.getByText(selectedGenre);

    expect(selectedButton).toHaveStyle({
      borderBottom: '1px solid #F65261',
    });
  });

  test('Test that after a click event on a genre button component calls "onChange" callback and passes correct genre in arguments', () => {
    const genres = ['Action', 'Comedy', 'Drama', 'Horror'];
    const mockOnSelect = jest.fn();
    render(<GenreSelector genres={genres} selectedGenre="" onSelect={mockOnSelect} />);

    const genreButton = screen.getByText('Horror');
    fireEvent.click(genreButton);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith('Horror');
  });
});