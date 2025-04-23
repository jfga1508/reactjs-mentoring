import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieDetails from './MovieDetails';

const mockProps = {
  imageUrl: 'https://example.com/image.jpg',
  name: 'Test Movie',
  releaseYear: '2023',
  genres: ['Action', 'Comedy'],
  rating: '7.5',
  duration: '1h 30m',
  description: 'This is a test movie description.',
};

describe('MovieDetails Component', () => {
  test('renders the component with correct data', () => {
    render(<MovieDetails {...mockProps} />);

    // Check if image is rendered with correct src and alt
    const imageElement = screen.getByAltText('Test Movie');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'https://example.com/image.jpg');

    // Check if movie name and rating are rendered
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('7.5')).toBeInTheDocument();

    // Check if genres are rendered correctly
    expect(screen.getByText('Action, Comedy')).toBeInTheDocument();

    // Check if release year and duration are rendered
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('1h 30m')).toBeInTheDocument();

    // Check if description is rendered
    expect(screen.getByText('This is a test movie description.')).toBeInTheDocument();
  });

  test('renders genres correctly with a single genre', () => {
    const singleGenreProps = { ...mockProps, genres: ['Drama'] };
    render(<MovieDetails {...singleGenreProps} />);
    expect(screen.getByText('Drama')).toBeInTheDocument();
  });

  test('renders genres correctly with multiple genres', () => {
    const multipleGenresProps = { ...mockProps, genres: ['Action', 'Comedy', 'Sci-Fi'] };
    render(<MovieDetails {...multipleGenresProps} />);
    expect(screen.getByText('Action, Comedy, Sci-Fi')).toBeInTheDocument();
  });

  test('renders without crashing when genres array is empty', () => {
    const emptyGenresProps = { ...mockProps, genres: [] };
    render(<MovieDetails {...emptyGenresProps} />);
    expect(screen.queryByText(/,/)).toBeNull();
  });

  test('applies correct CSS classes', () => {
    render(<MovieDetails {...mockProps} />);

    const movieDetailsDiv = screen.getByRole('img', {name: 'Test Movie'}).closest('div'); 
    expect(movieDetailsDiv).toHaveClass('movie-details');

    const imageElement = screen.getByAltText('Test Movie');
    expect(imageElement).toHaveClass('movie-details-image');

    const nameElement = screen.getByRole('heading', { level: 2, name: 'Test Movie' });
    const ratingElement = screen.getByText('7.5');

    expect(nameElement).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();

    const labelContainer = nameElement.closest('div');
    expect(labelContainer).toHaveClass('movie-details-label');

    const genresElement = screen.getByText('Action, Comedy');
    expect(genresElement).toHaveClass('movie-details-genres');

    const timeContainer = screen.getByText('2023').closest('p');
    expect(timeContainer).toHaveClass('movie-details-time');

    const descriptionElement = screen.getByText('This is a test movie description.');
    expect(descriptionElement).toHaveClass('movie-details-description');

  });
});