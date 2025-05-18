import { StoryFn, Meta } from '@storybook/react';
import MovieTile from '../components/movieTile/MovieTile';

export default {
  title: 'Components/MovieTile',
  component: MovieTile,
} as Meta;

const Template: StoryFn<typeof MovieTile> = (args) => <MovieTile {...args} />;

export const Default = Template.bind({});
Default.args = {
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj6_ot-pRVfLMtc2vyguVf_0m0HUuvdBw2I-EuFXkUIEB_eoAS",
  name: 'Pulp Fiction',
  releaseYear: '1994',
  genres: ['Crime', 'Drama'],
  onClick: () => alert('Movie Clicked!'),
  onEdit: () => alert('Edit Clicked!'),
  onDelete: () => alert('Delete Clicked!'),
};