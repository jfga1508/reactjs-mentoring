import { Link } from "react-router-dom";

const GenreSelector = ({
  genres,
  selectedGenre,
  onSelect,
}: {
  genres: string[];
  selectedGenre: string;
  onSelect?: (genre: string) => void;
}) => {
  const handleGenreClick = (genre: string) => {
    //Callback onSearch if set
    if (onSelect) {
      onSelect(genre);
    }
  };

  return (
    <div className="card">
      {genres.map((genre) => (
        <Link
          key={genre}
          to={`/movies/genres/${genre}`}
          onClick={() => handleGenreClick(genre)}
          style={{
            margin: "5px",
            padding: "10px",
            borderRadius: "0",
            border: "0",
            borderBottom:
              (genre === selectedGenre ? "1px" : "0px") +
              " solid " +
              (genre === selectedGenre ? "#F65261" : "#FFF"),
            backgroundColor: "transparent",
            color: "#FFF",
            cursor: "pointer",
          }}
        >
          {genre}
        </Link>
      ))}
    </div>
  );
};

export default GenreSelector;
