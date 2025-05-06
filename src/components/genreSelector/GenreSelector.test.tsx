import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";
import GenreSelector from "./GenreSelector";

describe("GenreSelector Component", () => {
  const genres = ["Action", "Comedy", "Drama"];
  const selectedGenre = "Comedy";
  const onSelect = jest.fn();

  it("renders genres as clickable links", () => {
    render(
      <MemoryRouter>
        <GenreSelector genres={genres} selectedGenre={selectedGenre} />
      </MemoryRouter>
    );

    // Verify all genres are rendered
    genres.forEach((genre) => {
      const linkElement = screen.getByText(genre);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", `/movies/genres/${genre}`);
    });
  });

  it("highlights the selected genre", () => {
    render(
      <MemoryRouter>
        <GenreSelector genres={genres} selectedGenre={selectedGenre} />
      </MemoryRouter>
    );

    // Verify the selected genre has the correct border color
    const selectedElement = screen.getByText(selectedGenre);
    expect(selectedElement).toHaveStyle("border-bottom: 1px solid #F65261");

    // Verify other genres do not have the highlight
    genres
      .filter((genre) => genre !== selectedGenre)
      .forEach((genre) => {
        const genreElement = screen.getByText(genre);
        expect(genreElement).toHaveStyle("border-bottom: 0px solid #FFF");
      });
  });

  it("calls onSelect with the correct genre when clicked", () => {
    render(
      <MemoryRouter>
        <GenreSelector
          genres={genres}
          selectedGenre={selectedGenre}
          onSelect={onSelect}
        />
      </MemoryRouter>
    );

    // Click on a genre
    const genreToClick = "Drama";
    const genreElement = screen.getByText(genreToClick);
    fireEvent.click(genreElement);

    // Verify the callback is called with the correct genre
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(genreToClick);
  });

  it("does not call onSelect if onSelect is not provided", () => {
    render(
      <MemoryRouter>
        <GenreSelector genres={genres} selectedGenre={selectedGenre} />
      </MemoryRouter>
    );

    // Click on a genre
    const genreToClick = "Drama";
    const genreElement = screen.getByText(genreToClick);
    fireEvent.click(genreElement);

    // Verify no callback is called
    expect(onSelect).not.toHaveBeenCalled();
  });
});