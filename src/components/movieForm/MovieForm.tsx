import * as React from "react";
import { useState, useCallback } from "react";
import "./MovieForm.css";
import { MovieDetailsProps } from "../movieDetails/MovieDetails";
import data from "../../data/genres.json";

interface MovieFormProps {
  initialMovie?: MovieDetailsProps;
  onSubmit: (movie: MovieDetailsProps) => void;
}

const MovieForm = ({ initialMovie, onSubmit }: MovieFormProps) => {
  const [name, setName] = useState(initialMovie?.name || "");
  const [releaseYear, setReleaseYear] = useState(
    initialMovie?.releaseYear || ""
  );
  const [imageUrl, setImageUrl] = useState(initialMovie?.imageUrl || "");
  const [rating, setRating] = useState(initialMovie?.rating || "");
  const [genres, setGenres] = useState<string[]>(initialMovie?.genres || []);
  const [duration, setDuration] = useState(initialMovie?.duration || "");
  const [description, setDescription] = useState(
    initialMovie?.description || ""
  );
  const genresList = data;

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
        description,
      };
      console.log(movieData);
      onSubmit(movieData);
    },
    [
      name,
      releaseYear,
      imageUrl,
      rating,
      genres,
      duration,
      description,
      onSubmit,
    ]
  );

  const handleReset = () => {
    setName("");
    setReleaseYear("");
    setImageUrl("");
    setRating("");
    setGenres([]);
    setDuration("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">TITLE</label>
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
            onChange={(e) => setReleaseYear(e.target.value)}
            placeholder="Input Date"
          />
        </div>
      </div>
      <div className="form-row">
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
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="genre">GENRE</label>
          <div className="genres-options">
            {genresList.map((genre: string, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  value={genre}
                  checked={genres.includes(genre)}
                  onChange={handleGenresChange}
                />
                {genre}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="duration">RUNTIME</label>
          <input
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="minutes"
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="description">DESCRIPTION</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Overview"
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
