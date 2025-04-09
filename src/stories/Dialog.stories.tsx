import Dialog from "../components/dialog/Dialog";

export default {
  title: "Components/Dialog",
  component: Dialog,
};

const Template = (args) => (
  <Dialog {...args}>This is the dialog content.</Dialog>
);

export const Default = Template.bind({});
Default.args = {
  title: "Dialog",
  onClose: () => alert("Close button clicked!"),
};
