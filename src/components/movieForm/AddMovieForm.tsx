import React, { useState } from "react";
import Dialog, { DialogProps } from "../dialog/Dialog";
import MovieForm from "./MovieForm";
import { createMovie } from "../../helpers/moviesApi";
import { useNavigate } from "react-router-dom";

const AddMovieForm = () => {
  const navigate = useNavigate();
  const [dialog, setDialog] = useState<DialogProps | null>({
    title: "Add movie",
    children: (
      <MovieForm
        onSubmit={async (movie) => {
          const res = await createMovie(movie);
          console.log("Movie added", res);
          navigate(`/movie/${res.id}`);
          setDialog({
            title: "Add movie",
            children: <>Movie has been added!</>,
            onClose: () => setDialog(null),
          });
        }}
      />
    ),
    onClose: () => setDialog(null),
  });

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

export default AddMovieForm;
