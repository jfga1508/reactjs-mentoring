import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import GenreSelector from "../components/genreSelector/GenreSelector";
import '../index.css';

const meta: Meta = {
  title: "Components/GenreSelector",
  component: GenreSelector,
  argTypes: {
    genres: {
      control: { type: "array" },
      description: "List of genres to display",
    },
    selectedGenre: {
      control: { type: "text" },
      description: "Currently selected genre",
    },
    onSelect: {
      action: "onSelect", 
      description: "Callback function triggered when a genre is selected",
    },
  },
};

export default meta;

// Template for the GenreSelector component stories
const Template: StoryFn<{
  genres: string[];
  selectedGenre: string;
  onSelect?: (genre: string) => void;
}> = (args) => <GenreSelector {...args} />;

// Default story: Basic usage with a list of genres
export const Default = Template.bind({});
Default.args = {
  genres: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"],
  selectedGenre: "Action",
};

// Story with dynamic selection using state
export const InteractiveSelection: StoryFn = () => {
  const [selectedGenre, setSelectedGenre] = useState("Comedy");

  return (
    <GenreSelector
      genres={["Action", "Comedy", "Drama", "Horror", "Sci-Fi"]}
      selectedGenre={selectedGenre}
      onSelect={(genre) => {
        setSelectedGenre(genre); // Update selected genre
      }}
    />
  );
};

// Story with a custom list of genres
export const CustomGenres = Template.bind({});
CustomGenres.args = {
  genres: ["Romance", "Thriller", "Fantasy", "Mystery"],
  selectedGenre: "Fantasy",
};
