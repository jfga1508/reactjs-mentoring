import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieTile from './MovieTile';

const mockProps = {
  id: 1,
  imageUrl: 'image.jpg',
  name: 'Test Movie',
  releaseYear: '2023',
  genres: ['Action', 'Comedy'],
  onClick: jest.fn(),
  onEdit: jest.fn(),
  onDelete: jest.fn(),
};

describe('MovieTile', () => {
  beforeEach(() => {
    mockProps.onClick.mockClear();
    mockProps.onEdit.mockClear();
    mockProps.onDelete.mockClear();
  });

  it('renders correctly with all props', () => {
    render(<MovieTile {...mockProps} />);

    expect(screen.getByAltText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('Action, Comedy')).toBeInTheDocument();
  });

  it('calls onClick when the movie tile is clicked', () => {
    render(<MovieTile {...mockProps} />);
    const movieTile = screen.getByText('Test Movie').closest('.movie-tile');
    fireEvent.click(movieTile as Element);
    expect(mockProps.onClick).toHaveBeenCalledWith(1);
  });

  it('opens the menu when the menu button is clicked', () => {
    render(<MovieTile {...mockProps} />);
    const menuButton = screen.getByText('...');
    fireEvent.click(menuButton);
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls onEdit when the edit button is clicked', () => {
    render(<MovieTile {...mockProps} />);
    const menuButton = screen.getByText('...');
    fireEvent.click(menuButton);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    expect(mockProps.onEdit).toHaveBeenCalled();
  });

  it('calls onDelete when the delete button is clicked', () => {
    render(<MovieTile {...mockProps} />);
    const menuButton = screen.getByText('...');
    fireEvent.click(menuButton);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(mockProps.onDelete).toHaveBeenCalled();
  });
});