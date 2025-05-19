import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./MovieTile.css"; 

interface MovieTileProps {
  id: number;
  imageUrl: string;
  name: string;
  releaseYear: string;
  genres: string[];
  onClick: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: () => void;
}

const MovieTile = ({
  id,
  imageUrl,
  name,
  releaseYear,
  genres,
  onClick,
  onDelete,
}: MovieTileProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMovieClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(id);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="movie-tile" onClick={handleMovieClick}>
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>{releaseYear}</p>
      <p>{genres.join(", ")}</p>

      <div className="movie-tile-menu" onClick={handleMenuClick}>
        <span>...</span>
        {isMenuOpen && (
          <div className="movie-tile-menu-dropdown">
            <Link to={`/movie/${id}/edit`}>
              <button>Edit</button>
            </Link>
            <button onClick={handleDeleteClick}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieTile;
