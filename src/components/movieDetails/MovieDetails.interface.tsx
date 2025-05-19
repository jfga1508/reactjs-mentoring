export interface MovieDetailsProps {
  id?: number;
  title: string;
  poster_path: string;
  release_date: string;
  genres: string[];
  vote_average: number;
  runtime: number;
  overview: string;
}
