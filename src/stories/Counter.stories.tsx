import { Meta, StoryFn } from "@storybook/react";
import Counter from "../components/counter/Counter";
import '../index.css';

// Meta configuration for Storybook
const meta: Meta = {
  title: "Components/Counter",
  component: Counter,
  argTypes: {
    initial: {
      control: { type: "number" }, // Enables control for the `initial` prop
      defaultValue: 0, // Default value for the prop
      description: "Initial value of the counter",
    },
  },
};

export default meta;

// Template for the Counter component stories
const Template: StoryFn<{ initial: number }> = (args) => <Counter {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  initial: 0, // Default initial value for the counter
};

// Story with a custom starting value
export const StartAtTen = Template.bind({});
StartAtTen.args = {
  initial: 10, // Counter starts at 10
};

// Story with a negative starting value
export const StartAtNegativeFive = Template.bind({});
StartAtNegativeFive.args = {
  initial: -5, // Counter starts at -5
};