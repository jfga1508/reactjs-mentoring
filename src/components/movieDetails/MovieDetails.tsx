import "./MovieDetails.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MovieDetailsProps } from "./MovieDetails.interface";

const MovieDetails = () => {
  const [movie, setMovie] = useState<MovieDetailsProps>();
  const segmentParams = useParams();
  const movieId = segmentParams.movieId;

  const moviesApi = axios.create({
    baseURL: "http://localhost:4000/movies",
  });

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await moviesApi
        .get("/" + movieId)
        .then((response) => response.data);

      setMovie(data);
    };
    fetchMovie()
  }, [movieId]);

  return (
    <div className="movie-details">
      {movie && (
        <>
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="movie-details-image"
          />
          <div className="movie-details-info">
            <div className="movie-details-label">
              <h2>{movie.title}</h2>
              <span className="movie-details-vote_average">
                {movie.vote_average}
              </span>
            </div>
            <p className="movie-details-genres">
              {movie.genres.map((data, index) => {
                return `${data}${movie.genres.length > ++index ? ", " : ""}`;
              })}
            </p>
            <p className="movie-details-time">
              <span>{movie.release_date}</span>
              <span>{movie.runtime}</span>
            </p>
            <p className="movie-details-overview">{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
