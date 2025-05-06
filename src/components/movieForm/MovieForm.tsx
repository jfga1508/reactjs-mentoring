import { useForm } from "react-hook-form";
import "./MovieForm.css";
import data from "../../data/genres.json";
import { MovieDetailsProps } from "../movieDetails/MovieDetails.interface";

interface MovieFormProps {
  initialMovie?: MovieDetailsProps;
  onSubmit: (movie: MovieDetailsProps) => void;
}

const MovieForm = ({ initialMovie, onSubmit }: MovieFormProps) => {
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<MovieDetailsProps>({
      defaultValues: {
        id: initialMovie?.id,
        title: initialMovie?.title || "",
        release_date: initialMovie?.release_date || "",
        poster_path: initialMovie?.poster_path || "",
        vote_average: initialMovie?.vote_average || 0,
        genres: initialMovie?.genres || [],
        runtime: initialMovie?.runtime || 0,
        overview: initialMovie?.overview || "",
      },
    });

  const genresList = data;
  const selectedGenres = watch("genres");

  const onFormSubmit = (data: MovieDetailsProps) => {
    onSubmit(data);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="movie-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="title">TITLE</label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="release_date">RELEASE DATE</label>
          <input
            type="text"
            id="release_date"
            {...register("release_date", {
              required: "Release date is required",
            })}
            placeholder="Input Date"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="poster_path">MOVIE URL</label>
          <input
            type="text"
            id="poster_path"
            {...register("poster_path", { required: "Movie URL is required" })}
            placeholder="https://"
          />
        </div>

        <div className="form-group">
          <label htmlFor="vote_average">RATING</label>
          <input
            type="text"
            id="vote_average"
            {...register("vote_average", {
              valueAsNumber: true,
              required: "Rating is required",
            })}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="genres">GENRE</label>
          <div className="genres-options">
            {genresList.map((genre: string, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  value={genre}
                  checked={selectedGenres?.includes(genre)}
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    if (checked) {
                      setValue("genres", [...(selectedGenres || []), value]);
                    } else {
                      setValue(
                        "genres",
                        (selectedGenres || []).filter((g) => g !== value)
                      );
                    }
                  }}
                />
                {genre}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="runtime">RUNTIME</label>
          <input
            type="text"
            id="runtime"
            {...register("runtime", {
              valueAsNumber: true,
              required: "Runtime is required",
            })}
            placeholder="minutes"
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="overview">DESCRIPTION</label>
        <textarea
          id="overview"
          {...register("overview", { required: "Description is required" })}
          placeholder="Overview"
        />
      </div>

      <div className="form-actions">
        <button type="button" className="reset-button" onClick={handleReset}>
          RESET
        </button>
        <button type="submit" className="submit-button">
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
