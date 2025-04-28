import "./MovieDetails.css";

export interface MovieDetailsProps {
  id?: number;
  title: string;
  poster_path: string;
  release_date: string;
  genres: string[];
  vote_average: number | string;
  runtime: string;
  overview: string;
}

const MovieDetails = ({
  poster_path,
  title,
  release_date,
  genres,
  vote_average,
  runtime,
  overview,
}: MovieDetailsProps) => {
  return (
    <div className="movie-details">
      <img src={poster_path} alt={title} className="movie-details-image" />
      <div className="movie-details-info">
        <div className="movie-details-label">
          <h2>{title}</h2>
          <span className="movie-details-vote_average">{vote_average}</span>
        </div>
        <p className="movie-details-genres">
          {genres.map((data, index) => {
            return `${data}${genres.length > ++index ? ", " : ""}`;
          })}
        </p>
        <p className="movie-details-time">
          <span>{release_date}</span>
          <span>{runtime}</span>
        </p>
        <p className="movie-details-overview">{overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
