import styled from "styled-components";
import MovieTile from "../movieTile/MovieTile";
import SortControl from "../sortControl/SortControl";
import React, { useEffect, useState } from "react";
import MovieDetails, { MovieDetailsProps } from "../movieDetails/MovieDetails";
import { DialogProps } from "../dialog/Dialog";
import MovieForm from "../movieForm/MovieForm";
import axios from "axios";
import SearchBar from "../search/Search";
import GenreSelector from "../genreSelector/GenreSelector";
import genres from "../../data/genres.json";

const Dialog = React.lazy(() => import("../dialog/Dialog"));

const MovieTiles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const MovieListPage = () => {
  const [selectedSort, setSelectedSort] = useState<string>();
  const [currentGenre, setCurrentGenre] = useState<string>(genres[0]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetailsProps>();
  const [movies, setMovies] = useState<MovieDetailsProps[]>();
  const [dialog, setDialog] = useState<DialogProps | null>();
  const [params, setParams] = useState<{
    sortOrder?: string;
    sortBy?: string;
    search?: string;
    searchBy?: string;
    filter?: string;
  }>({ sortOrder: "asc" });
  const moviesApi = axios.create({
    baseURL: "http://localhost:4000/movies",
  });

  useEffect(() => {
    moviesApi.get("/").then((response) => {
      setMovies(response.data.data);
    });
  }, []);

  useEffect(() => {
    if (!params) return;
    const convertedParams = new URLSearchParams(params).toString();
    moviesApi.get("?" + convertedParams).then((response) => {
      setMovies(response.data.data);
    });
  }, [params]);

  const handleMovieClick = async (id: number) => {
    const movie = await moviesApi
      .get("/" + id)
      .then((response) => response.data);
    setSelectedMovie(movie);
    return movie;
  };

  const handleMovieAdd = () => {
    setDialog({
      title: "Add movie",
      children: <MovieForm onSubmit={() => {}} />,
      onClose: () => setDialog(null),
    });
  };

  const handleMovieEdit = async (id: number) => {
    const movie = await handleMovieClick(id);
    setDialog({
      title: "Edit movie",
      children: <MovieForm initialMovie={movie} onSubmit={() => {}} />,
      onClose: () => setDialog(null),
    });
  };

  const handleMovieDelete = () => {
    console.log(`Movie Delete`);
    setDialog({
      title: "Delete movie",
      children: "Are you sure you want to delete this movie?",
      onClose: () => setDialog(null),
      onConfirm: () => setDialog(null),
    });
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    setParams({ ...params, sortBy: value });
  };

  const handleSearch = (value: string) => {
    setParams({ ...params, search: value, searchBy: "title" });
  };

  const handleGenre = (value: string) => {
    setParams({ ...params, filter: value });
    setCurrentGenre(value);
  };

  return (
    <>
      <div className="relative">
        <button className="movie-add bg-transparent absolute right-0" onClick={handleMovieAdd}>
          ADD MOVIE
        </button>
        {<SearchBar initialQuery="" onSearch={handleSearch} />}
        {selectedMovie && <MovieDetails {...selectedMovie} />}
      </div>
      <div className="md:flex justify-between">
        <GenreSelector
          genres={genres}
          selectedGenre={currentGenre}
          onSelect={handleGenre}
        />
        <SortControl
          selectedValue={selectedSort || ""}
          onChange={handleSortChange}
        />
      </div>
      <React.Suspense fallback={<h3>Loading... Please wait</h3>}>
        <MovieTiles>
          {movies &&
            movies.map((movie, index) => (
              <MovieTile
                key={index}
                id={movie.id || 0}
                name={movie.title}
                imageUrl={movie.poster_path}
                genres={movie.genres}
                releaseYear={movie.release_date}
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
};

export default MovieListPage;
