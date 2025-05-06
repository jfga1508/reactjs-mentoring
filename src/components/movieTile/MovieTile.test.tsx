import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieTile from './MovieTile';
import { MemoryRouter } from "react-router-dom";

describe("MovieTile Component", () => {
  const mockProps = {
    id: 1,
    imageUrl: "https://example.com/image.jpg",
    name: "Test Movie",
    releaseYear: "2023",
    genres: ["Action", "Comedy"],
    onClick: jest.fn(),
    onDelete: jest.fn(),
  };

  it("renders the movie tile with correct data", () => {
    render(
      <MemoryRouter>
        <MovieTile {...mockProps} />
      </MemoryRouter>
    );

    // Verify that the image, name, release year, and genres are rendered
    const imageElement = screen.getByAltText("Test Movie");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "https://example.com/image.jpg");

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("Action, Comedy")).toBeInTheDocument();
  });

  it("calls onClick handler when the movie tile is clicked", () => {
    render(
      <MemoryRouter>
        <MovieTile {...mockProps} />
      </MemoryRouter>
    );

    // Click on the movie tile
    const movieTile = screen.getByText("Test Movie").closest(".movie-tile");
    fireEvent.click(movieTile!);

    // Verify that the onClick handler is called with the correct id
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
    expect(mockProps.onClick).toHaveBeenCalledWith(mockProps.id);
  });

  it("opens and closes the menu when the menu button is clicked", () => {
    render(
      <MemoryRouter>
        <MovieTile {...mockProps} />
      </MemoryRouter>
    );

    // Click on the menu button to open the menu
    const menuButton = screen.getByText("...");
    fireEvent.click(menuButton);

    // Verify that the dropdown menu is displayed
    const editButton = screen.getByText("Edit");
    const deleteButton = screen.getByText("Delete");
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    // Click on the menu button again to close the menu
    fireEvent.click(menuButton);
    expect(editButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
  });

  it("calls onDelete handler when the delete button is clicked", () => {
    render(
      <MemoryRouter>
        <MovieTile {...mockProps} />
      </MemoryRouter>
    );

    // Open the menu
    const menuButton = screen.getByText("...");
    fireEvent.click(menuButton);

    // Click on the delete button
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    // Verify that the onDelete handler is called
    expect(mockProps.onDelete).toHaveBeenCalledTimes(1);

    // Verify that the menu is closed after clicking delete
    expect(deleteButton).not.toBeInTheDocument();
  });

  it("generates the correct link for the edit button", () => {
    render(
      <MemoryRouter>
        <MovieTile {...mockProps} />
      </MemoryRouter>
    );

    // Open the menu
    const menuButton = screen.getByText("...");
    fireEvent.click(menuButton);

    // Verify that the edit button link is correct
    const editLink = screen.getByText("Edit").closest("a");
    expect(editLink).toHaveAttribute("href", `/movie/${mockProps.id}/edit`);
  });
});