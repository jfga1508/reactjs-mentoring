import { Meta, StoryFn } from "@storybook/react";
import SearchBar from "../components/search/Search";
import '../index.css';

export default {
  title: "Components/SearchBar",
  component: SearchBar,
  argTypes: {
    initialQuery: {
      control: { type: "text" },
      description: "Initial value of the search input",
    },
    onSearch: {
      action: "searched",
      description: "Callback function triggered when the search button is clicked or Enter is pressed",
    },
  },
} as Meta;

const Template: StoryFn<{
  initialQuery: string;
  onSearch?: (query: string) => void;
}> = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialQuery: "",
  onSearch: (query: string) => {
    alert(`Search triggered with query: ${query}`);
  },
};
