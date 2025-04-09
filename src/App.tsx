import styled from "styled-components";
import "./App.css";
import MovieTile from "./components/movieTile/MovieTile";
import SortControl from "./components/sortControl/SortControl";
import { useState } from "react";
import MovieDetails, {
  MovieDetailsProps,
} from "./components/movieDetails/MovieDetails";
import data from './data/movies.json';

const MovieTiles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

function App() {
  const [selectedSort, setSelectedSort] = useState<string>();
  const [selectedMovie, setSelectedMovie] = useState<MovieDetailsProps>();
  const movies = data;

  const handleMovieClick = (id: number) => {
    console.log(`Movie clicked`);
    const selected = movies.find((data) => id === data.id);
    setSelectedMovie(selected);
  };

  const handleMovieEdit = () => {
    console.log(`Movie Edit`);
  };

  const handleMovieDelete = () => {
    console.log(`Movie Delete`);
  };
  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    console.log(`Sort selected ${value}`);
  };

  return (
    <>
      {selectedMovie && <MovieDetails {...selectedMovie} />}
      <SortControl selectedValue={selectedSort || ""} onChange={handleSortChange} />
      <MovieTiles>
        {movies.map((movie) => (
          <MovieTile
            id={movie.id}
            name={movie.name}
            imageUrl={movie.imageUrl}
            genres={movie.genres}
            releaseYear={movie.releaseYear}
            onClick={handleMovieClick}
            onEdit={handleMovieEdit}
            onDelete={handleMovieDelete}
          />
        ))}
      </MovieTiles>
    </>
  );
}

export default App;
