import axios from "axios";
import { MovieDetailsProps } from "../components/movieDetails/MovieDetails.interface";

const BASE_URL = "http://localhost:4000/movies";

/**
 * Fetch all movies
 */
export const getMovies = async (params: string) => {
  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

/**
 * Fetch a movie by ID
 */
export const getMovieById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new movie
 */
export const createMovie = async (movie: MovieDetailsProps) => {
  try {
    const response = await axios.post(BASE_URL, movie, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating movie:", error);
    throw error;
  }
};

/**
 * Update an existing movie
 */
export const updateMovie = async (movie: MovieDetailsProps) => {
  if (!movie.id) {
    throw new Error("Movie ID is required for updating a movie.");
  }

  try {
    const response = await axios.put(BASE_URL, movie, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating movie with ID ${movie.id}:`, error);
    throw error;
  }
};

/**
 * Delete a movie by ID
 */
export const deleteMovie = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting movie with ID ${id}:`, error);
    throw error;
  }
};