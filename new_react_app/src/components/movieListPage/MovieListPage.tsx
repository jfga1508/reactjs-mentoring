import MovieTile from "../movieTile/MovieTile";
import SortControl from "../sortControl/SortControl";
import React, { useEffect, useState } from "react";
import { MovieDetailsProps } from "../movieDetails/MovieDetails.interface";
import { DialogProps } from "../dialog/Dialog";
import MovieForm from "../movieForm/MovieForm";
import axios from "axios";
import { useParams, useSearchParams } from "react-router";
import SearchBar from "../search/Search";
import GenreSelector from "../genreSelector/GenreSelector";
import genres from "../../data/genres.json";
import { useNavigate } from "react-router-dom";
import { Params } from "./MovieListPage.interface";
import { Outlet } from "react-router-dom";

const Dialog = React.lazy(() => import("../dialog/Dialog"));

const initialQuery = {
  sortOrder: "asc",
  sortBy: "",
  search: "",
  searchBy: "title",
  filter: "",
};

const MovieListPage = () => {
  const [selectedSort, setSelectedSort] = useState<string>();
  const [currentGenre, setCurrentGenre] = useState<string>(genres[0]);
  const [movies, setMovies] = useState<MovieDetailsProps[]>();
  const [dialog, setDialog] = useState<DialogProps | null>();
  const navigate = useNavigate();
  const segmentParams = useParams();
  const [searchParams] = useSearchParams();
  const [params, setParams] = useState<Params>({ ...initialQuery, sortBy: searchParams.get("sortBy") || "" });

  const moviesApi = axios.create({
    baseURL: "http://localhost:4000/movies",
  });

  useEffect(() => {
    const convertedParams = new URLSearchParams(params).toString();
    moviesApi.get("?" + convertedParams).then((response) => {
      setMovies(response.data.data);
    });
  }, [params]);

  useEffect(() => {
    if (!segmentParams) return;
    if (segmentParams.genre)
      setParams({
        ...params,
        search: segmentParams.movie || "",
        filter: segmentParams.genre || "",
      });
  }, [segmentParams]);

  const handleMovieClick = async (id: number) => {
    navigate(`/movie/${id}`);
  };

  const handleMovieAdd = () => {
    setDialog({
      title: "Add movie",
      children: <MovieForm onSubmit={() => {}} />,
      onClose: () => setDialog(null),
    });
  };

  const handleMovieEdit = async (id: number) => {
    const movie = await moviesApi
      .get("/" + id)
      .then((response) => response.data);
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
    navigate(`?sortBy=${value}`);
  };

  const handleSearch = (value: string) => {
    setParams({ ...params, filter: "", search: value });
    navigate(`/movies/${value}`);
  };

  const handleGenre = (value: string) => {
    setCurrentGenre(value);
  };

  return (
    <>
      <div className="relative">
        <button
          className="movie-add bg-transparent absolute right-0"
          onClick={handleMovieAdd}
        >
          ADD MOVIE
        </button>
        {<SearchBar initialQuery="" onSearch={handleSearch} />}
        {<Outlet />}
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
        <div className="flex flex-wrap gap-1">
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
        </div>
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
