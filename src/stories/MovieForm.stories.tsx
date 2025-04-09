import { StoryFn, Meta } from '@storybook/react';
import MovieForm from '../components/movieForm/MovieForm';

export default {
  title: 'Components/MovieForm',
  component: MovieForm,
} as Meta;

const Template: StoryFn = (args) => <MovieForm {...args} onSubmit={ () => {}} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit: (movie) => {
    console.log('Movie submitted:', movie);
  },
};

export const WithInitialData = Template.bind({});
WithInitialData.args = {
  initialMovie: {
    title: 'Moana',
    releaseDate: '2016-11-23',
    movieUrl: 'https://www.example.com/moana',
    rating: '7.6',
    genre: ['Animation', 'Adventure', 'Comedy'],
    runtime: '107',
  },
  onSubmit: (movie) => {
    console.log('Movie submitted:', movie);
  },
};