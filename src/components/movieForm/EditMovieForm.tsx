import React, { useEffect, useState } from "react";
import Dialog, { DialogProps } from "../dialog/Dialog";
import MovieForm from "./MovieForm";
import { getMovieById, updateMovie } from "../../helpers/moviesApi";
import { useNavigate, useParams } from "react-router-dom";

const EditMovieForm = () => {
  const segmentParams = useParams();
  const movieId = segmentParams.movieId;
  const navigate = useNavigate();
  const [dialog, setDialog] = useState<DialogProps | null>();
  console.log('EditMovieForm');
  

  useEffect(() => {
    const fetchData = async () => {
      console.log('refetch');
      
      const moviesData = await getMovieById(Number(movieId));
      setDialog({
        title: "Edit movie",
        children: (
          <MovieForm
            initialMovie={moviesData}
            onSubmit={async (movie) => {
              const res = await updateMovie(movie);
              console.log("Movie updated", res);
              navigate(`/movie/${movie.id}`);
              setDialog({
                title: "Edit movie",
                children: <>{movie.title} has been edited!</>,
                onClose: () => setDialog(null),
              });
            }}
          />
        ),
        onClose: () => setDialog(null),
      });
    };

    fetchData();
  }, [movieId]);

  return (
    <>
      {dialog && (
        <React.Suspense>
          <Dialog {...dialog} />
        </React.Suspense>
      )}
    </>
  );
};

export default EditMovieForm;
