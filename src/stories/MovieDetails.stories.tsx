import { StoryFn, Meta } from '@storybook/react';
import MovieDetails from '../components/movieDetails/MovieDetails';

export default {
  title: 'Components/MovieDetails',
  component: MovieDetails,
} as Meta;

const Template: StoryFn<typeof MovieDetails> = (args) => <MovieDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
  poster_path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj6_ot-pRVfLMtc2vyguVf_0m0HUuvdBw2I-EuFXkUIEB_eoAS",
  title: 'Pulp Fiction',
  genres: ["Action", "Adventure"],
  release_date: '1994',
  vote_average: 8.9,
  runtime: '2h 34min',
  overview:
    "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
};