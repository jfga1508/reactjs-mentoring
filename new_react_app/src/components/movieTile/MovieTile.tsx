import * as React from "react";
import { useState } from "react";
import "./MovieTile.css"; // Create this CSS file

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
  onEdit,
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

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(id);
    }
    setIsMenuOpen(false);
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
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieTile;
