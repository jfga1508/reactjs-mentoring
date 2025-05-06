import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import MovieDetails from "./components/movieDetails/MovieDetails.tsx";
import AddMovieForm from "./components/movieForm/AddMovieForm.tsx";
import EditMovieForm from "./components/movieForm/EditMovieForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "movie/:movieId",
        element: <MovieDetails />,
      },
      {
        path: "movie/:movieId/edit",
        element: <EditMovieForm />,
      },
      {
        path: "new",
        element: <AddMovieForm />,
      },
    ],
  },
  {
    path: "/movies/:movie?/genres?/:genre?",
    element: <App />
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
