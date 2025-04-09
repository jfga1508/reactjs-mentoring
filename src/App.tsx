import styled from "styled-components";
import "./App.css";
import MovieTile from "./components/movieTile/MovieTile";
import SortControl from "./components/sortControl/SortControl";
import React, { useState } from "react";
import MovieDetails, {
  MovieDetailsProps,
} from "./components/movieDetails/MovieDetails";
import data from "./data/movies.json";
import { DialogProps } from "./components/dialog/Dialog";
import MovieForm from "./components/movieForm/MovieForm";

const Dialog = React.lazy(() => import("./components/dialog/Dialog"));

const MovieTiles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

function App() {
  const [selectedSort, setSelectedSort] = useState<string>();
  const [selectedMovie, setSelectedMovie] = useState<MovieDetailsProps>();
  const [dialog, setDialog] = useState<DialogProps | null>();
  const movies = data;

  const handleMovieClick = (id: number) => {
    console.log(`Movie clicked`);
    const selected = movies.find((data) => id === data.id);
    setSelectedMovie(selected);
  };

  const handleMovieAdd = () => {
    console.log(`Movie Add`);
    setDialog({
      title: "Add movie",
      children: <MovieForm onSubmit={() => {}} />,
      onClose: () => setDialog(null),
    });
  };

  const handleMovieEdit = (id: number) => {
    console.log(`Movie Edit`);
    const selected = movies.find((data) => id === data.id);
    setSelectedMovie(selected);
    setDialog({
      title: "Edit movie",
      children: <MovieForm initialMovie={selected} onSubmit={() => {}} />,
      onClose: () => setDialog(null),
    });
  };

  const handleMovieDelete = () => {
    console.log(`Movie Delete`);
    setDialog({
      title: "Delete movie",
      children: "Are you sure you want to delete this movie?",
      onClose: () => setDialog(null),
      onConfirm: () => setDialog(null)
    });
  };
  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    console.log(`Sort selected ${value}`);
  };

  return (
    <>
      <div>
        <button className="movie-add" onClick={handleMovieAdd}>
          ADD MOVIE
        </button>
        {selectedMovie && <MovieDetails {...selectedMovie} />}
      </div>
      <SortControl
        selectedValue={selectedSort || ""}
        onChange={handleSortChange}
      />
      <React.Suspense fallback={<h3>Loading... Please wait</h3>}>
        <MovieTiles>
          {movies.map((movie, index) => (
            <MovieTile
              key={index}
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
      </React.Suspense>
      {dialog && (
        <React.Suspense>
          <Dialog {...dialog} />
        </React.Suspense>
      )}
    </>
  );
}

export default App;
