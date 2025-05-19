import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieDetails from "./MovieDetails";
import { getMovieById } from "../../helpers/moviesApi";
import { MemoryRouter, Routes, Route } from "react-router-dom";

// Mock the API call
jest.mock("../../helpers/moviesApi", () => ({
  getMovieById: jest.fn(),
}));

const mockMovie = {
  id: 1,
  poster_path: "https://example.com/image.jpg",
  title: "Test Movie",
  release_date: "2023",
  genres: ["Action", "Comedy"],
  vote_average: "7.5",
  runtime: "90",
  overview: "This is a test movie description.",
};

describe("MovieDetails Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component with correct data from API", async () => {
    // Mock the API response
    (getMovieById as jest.Mock).mockResolvedValue(mockMovie);

    // Render the component within a MemoryRouter to mock route params
    render(
      <MemoryRouter initialEntries={["/movie/1"]}>
        <Routes>
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the movie data to be rendered
    const imageElement = await screen.findByAltText("Test Movie");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "https://example.com/image.jpg");

    // Check if movie name and rating are rendered
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("7.5")).toBeInTheDocument();

    // Check if genres are rendered correctly
    expect(screen.getByText("Action, Comedy")).toBeInTheDocument();

    // Check if release year and duration are rendered
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("90")).toBeInTheDocument();

    // Check if description is rendered
    expect(screen.getByText("This is a test movie description.")).toBeInTheDocument();
  });

  test("renders correctly with a single genre", async () => {
    const singleGenreMock = { ...mockMovie, genres: ["Drama"] };
    (getMovieById as jest.Mock).mockResolvedValue(singleGenreMock);

    render(
      <MemoryRouter initialEntries={["/movie/2"]}>
        <Routes>
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const genreElement = await screen.findByText("Drama");
    expect(genreElement).toBeInTheDocument();
  });

  test("renders correctly with multiple genres", async () => {
    const multipleGenresMock = { ...mockMovie, genres: ["Action", "Comedy", "Sci-Fi"] };
    (getMovieById as jest.Mock).mockResolvedValue(multipleGenresMock);

    render(
      <MemoryRouter initialEntries={["/movie/3"]}>
        <Routes>
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const genreElement = await screen.findByText("Action, Comedy, Sci-Fi");
    expect(genreElement).toBeInTheDocument();
  });

  test("renders without crashing when genres array is empty", async () => {
    const emptyGenresMock = { ...mockMovie, genres: [] };
    (getMovieById as jest.Mock).mockResolvedValue(emptyGenresMock);

    render(
      <MemoryRouter initialEntries={["/movie/4"]}>
        <Routes>
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const genresElement = screen.queryByText(/,/); // No genres should be rendered
    expect(genresElement).toBeNull();
  });

  test("applies correct CSS classes", async () => {
    (getMovieById as jest.Mock).mockResolvedValue(mockMovie);

    render(
      <MemoryRouter initialEntries={["/movie/5"]}>
        <Routes>
          <Route path="/movie/:movieId" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const imageElement = await screen.findByAltText("Test Movie");
    const movieDetailsDiv = imageElement.closest("div");
    expect(movieDetailsDiv).toHaveClass("movie-details");

    expect(imageElement).toHaveClass("movie-details-image");

    const nameElement = screen.getByRole("heading", { level: 2, name: "Test Movie" });
    const ratingElement = screen.getByText("7.5");

    expect(nameElement).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();

    const labelContainer = nameElement.closest("div");
    expect(labelContainer).toHaveClass("movie-details-label");

    const genresElement = screen.getByText("Action, Comedy");
    expect(genresElement).toHaveClass("movie-details-genres");

    const timeContainer = screen.getByText("2023").closest("p");
    expect(timeContainer).toHaveClass("movie-details-time");

    const descriptionElement = screen.getByText("This is a test movie description.");
    expect(descriptionElement).toHaveClass("movie-details-overview");
  });
});