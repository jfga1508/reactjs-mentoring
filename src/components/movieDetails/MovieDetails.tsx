import "./MovieDetails.css";

export interface MovieDetailsProps {
  imageUrl: string;
  name: string;
  releaseYear: number;
  genres: string[];
  rating: number;
  duration: string;
  description: string;
}

const MovieDetails = ({
  imageUrl,
  name,
  releaseYear,
  genres,
  rating,
  duration,
  description,
}: MovieDetailsProps) => {
  return (
    <div className="movie-details">
      <img src={imageUrl} alt={name} className="movie-details-image" />
      <div className="movie-details-info">
        <div className="movie-details-label">
          <h2>{name}</h2>
          <span className="movie-details-rating">{rating}</span>
        </div>
        <p className="movie-details-genres">
          {genres.map((data, index) => {
            return `${data}${genres.length > ++index ? ", " : ""}`;
          })}
        </p>
        <p className="movie-details-time">
          <span>{releaseYear}</span>
          <span>{duration}</span>
        </p>
        <p className="movie-details-description">{description}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
