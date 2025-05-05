import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieForm from "./MovieForm";

describe("MovieForm Component", () => {
  const onSubmit = jest.fn();

  it("renders the form with input fields", () => {
    render(<MovieForm onSubmit={onSubmit} />);
    expect(screen.getByLabelText("TITLE")).toBeInTheDocument();
    expect(screen.getByLabelText("RELEASE DATE")).toBeInTheDocument();
    expect(screen.getByLabelText("MOVIE URL")).toBeInTheDocument();
    expect(screen.getByLabelText("RATING")).toBeInTheDocument();
    expect(screen.getByLabelText("RUNTIME")).toBeInTheDocument();
    expect(screen.getByLabelText("DESCRIPTION")).toBeInTheDocument();
  });

  it("calls onSubmit with form data when the submit button is clicked", async () => {
    render(<MovieForm onSubmit={onSubmit} />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText("TITLE"), {
      target: { value: "Test Movie" },
    });
    fireEvent.change(screen.getByLabelText("RELEASE DATE"), {
      target: { value: "2024-01-01" },
    });
    fireEvent.change(screen.getByLabelText("MOVIE URL"), {
      target: { value: "http://example.com" },
    });
    fireEvent.change(screen.getByLabelText("RATING"), {
      target: { value: "8.0" },
    });
    fireEvent.change(screen.getByLabelText("RUNTIME"), {
      target: { value: "120" },
    });
    fireEvent.change(screen.getByLabelText("DESCRIPTION"), {
      target: { value: "This is a test movie description." },
    });

    // Select genres
    const genreCheckboxes = screen.getAllByRole("checkbox") as HTMLInputElement[]; // Cast checkboxes to HTMLInputElement[]
    fireEvent.click(genreCheckboxes[0]); // Select the first genre
    fireEvent.click(genreCheckboxes[1]); // Select the second genre

    // Submit the form
    fireEvent.click(screen.getByText("SUBMIT"));

    // Wait for the onSubmit to be called
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    // Verify onSubmit was called with the correct data
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Test Movie",
        release_date: "2024-01-01",
        poster_path: "http://example.com",
        vote_average: 8.0, // This should be a number
        genres: [genreCheckboxes[0].value, genreCheckboxes[1].value], // Selected genres
        runtime: 120, // This should be a number
        overview: "This is a test movie description.",
      })
    );
  });

  it("clears the form when the reset button is clicked", async () => {
    render(<MovieForm onSubmit={onSubmit} />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText("TITLE"), {
      target: { value: "Test Movie" },
    });
    fireEvent.change(screen.getByLabelText("DESCRIPTION"), {
      target: { value: "This is a test movie description." },
    });

    // Reset the form
    fireEvent.click(screen.getByText("RESET"));

    // Wait for the form to reset
    await waitFor(() => {
      expect(
        (screen.getByLabelText("TITLE") as HTMLInputElement).value
      ).toBe("");
      expect(
        (screen.getByLabelText("DESCRIPTION") as HTMLTextAreaElement).value
      ).toBe("");
    });
  });

  it("renders the form with initial values when editing a movie", async () => {
    const initialMovie = {
      id: 1,
      title: "Initial Movie",
      release_date: "2023-01-01",
      poster_path: "http://example.com/initial.jpg",
      vote_average: 7.5,
      genres: ["Action", "Comedy"],
      runtime: 100,
      overview: "This is the initial movie description.",
    };

    render(<MovieForm initialMovie={initialMovie} onSubmit={onSubmit} />);

    // Wait for the form to render with initial values
    await waitFor(() => {
      expect(
        (screen.getByLabelText("TITLE") as HTMLInputElement).value
      ).toBe("Initial Movie");
      expect(
        (screen.getByLabelText("RELEASE DATE") as HTMLInputElement).value
      ).toBe("2023-01-01");
      expect(
        (screen.getByLabelText("MOVIE URL") as HTMLInputElement).value
      ).toBe("http://example.com/initial.jpg");
      expect(
        (screen.getByLabelText("RATING") as HTMLInputElement).value
      ).toBe("7.5");
      expect(
        (screen.getByLabelText("RUNTIME") as HTMLInputElement).value
      ).toBe("100");
      expect(
        (screen.getByLabelText("DESCRIPTION") as HTMLTextAreaElement).value
      ).toBe("This is the initial movie description.");
    });
  });
});