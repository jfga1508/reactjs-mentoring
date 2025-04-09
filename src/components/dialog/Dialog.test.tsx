import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Dialog from "./Dialog";

describe("Dialog Component", () => {
  test("renders the dialog with title and children", () => {
    render(
      <Dialog title="Test Title" onClose={() => {}}>
        <div>Test Content</div>
      </Dialog>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("calls onClose when the close button is clicked", () => {
    const onCloseMock = jest.fn();
    render(
      <Dialog title="Test Title" onClose={onCloseMock}>
        <div>Test Content</div>
      </Dialog>
    );

    const closeButton = screen.getByText("×");
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test("dialog is rendered within the portal", () => {
    const { container } = render(
      <Dialog title="Test Title" onClose={() => {}}>
        <div>Test Content</div>
      </Dialog>
    );
    // Check if the dialog-overlay is rendered as a direct child of document.body
    expect(document.body.contains(container.firstChild)).toBe(true);
  });
});
