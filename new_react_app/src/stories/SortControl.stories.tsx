import { StoryFn, Meta } from '@storybook/react';
import SortControl from '../components/sortControl/SortControl';

export default {
  title: 'Components/SortControl',
  component: SortControl,
} as Meta;

const Template: StoryFn<typeof SortControl> = (args) => <SortControl {...args} />;

export const Default = Template.bind({});
Default.args = {
  selectedValue: 'releaseDate',
  onChange: (value) => alert(`Sort by: ${value}`),
};