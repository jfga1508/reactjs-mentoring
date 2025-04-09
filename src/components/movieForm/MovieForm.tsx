import * as React from "react";
import { useState, useCallback } from "react";
import "./MovieForm.css";
import { MovieDetailsProps } from "../movieDetails/MovieDetails";

interface MovieFormProps {
  initialMovie?: MovieDetailsProps;
  onSubmit: (movie: MovieDetailsProps) => void;
}

const MovieForm = ({ initialMovie, onSubmit }: MovieFormProps) => {
  const [name, setName] = useState(initialMovie?.name || "");
  const [releaseYear, setReleaseYear] = useState(
    initialMovie?.releaseYear || 0
  );
  const [imageUrl, setImageUrl] = useState(initialMovie?.imageUrl || "");
  const [rating, setRating] = useState(initialMovie?.rating || 0);
  const [genres, setGenres] = useState<string[]>(initialMovie?.genres || []);
  const [duration, setDuration] = useState(initialMovie?.duration || "");
  const [description, setDescription] = useState(initialMovie?.description || "");

  const handleGenresChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setGenres([...genres, value]);
    } else {
      setGenres(genres.filter((g) => g !== value));
    }
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const movieData: MovieDetailsProps = {
        name,
        releaseYear,
        imageUrl,
        rating,
        genres,
        duration,
        description
      };
      onSubmit(movieData);
    },
    [name, releaseYear, imageUrl, rating, genres, duration, onSubmit]
  );

  const handleReset = () => {
    setName("");
    setReleaseYear(0);
    setImageUrl("");
    setRating(0);
    setGenres([]);
    setDuration("");
    setDescription("")
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <div className="form-group">
        <label htmlFor="name">name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="releaseYear">RELEASE DATE</label>
        <input
          type="text"
          id="releaseYear"
          value={releaseYear}
          onChange={(e) => setReleaseYear(Number(e.target.value))}
          placeholder="Select Date"
        />
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl">MOVIE URL</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://"
        />
      </div>

      <div className="form-group">
        <label htmlFor="rating">RATING</label>
        <input
          type="text"
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label>Genres</label>
        <div className="genres-options">
          <label>
            <input
              type="checkbox"
              value="Crime"
              checked={genres.includes("Crime")}
              onChange={handleGenresChange}
            />
            Crime
          </label>
          <label>
            <input
              type="checkbox"
              value="Documentary"
              checked={genres.includes("Documentary")}
              onChange={handleGenresChange}
            />
            Documentary
          </label>
          <label>
            <input
              type="checkbox"
              value="Horror"
              checked={genres.includes("Horror")}
              onChange={handleGenresChange}
            />
            Horror
          </label>
          <label>
            <input
              type="checkbox"
              value="Comedy"
              checked={genres.includes("Comedy")}
              onChange={handleGenresChange}
            />
            Comedy
          </label>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="duration">duration</label>
        <input
          type="text"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="minutes"
        />
      </div>

      <div className="form-actions">
        <button type="button" className="reset-button" onClick={handleReset}>
          RESET
        </button>
        <button type="submit" className="submit-button">
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
