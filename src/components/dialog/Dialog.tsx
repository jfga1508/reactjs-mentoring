import * as ReactDOM from "react-dom";
import { FocusTrap } from "focus-trap-react";
import "./Dialog.css";
import { useEffect, useRef } from "react";

export interface DialogProps {
  title: string;
  children: string | React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
}

const Dialog = ({ title, children, onClose, onConfirm }: DialogProps) => {
  const dialogRoot = document.getElementById("dialog-root") || document.body;

  const dialogRef = useRef<HTMLDivElement>(null);

  // Handle closing the dialog on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="dialog-overlay">
      <FocusTrap>
        <div className="dialog" ref={dialogRef}>
          <div className="dialog-header">
            <h2 className="dialog-title">{title}</h2>
            <button className="dialog-close-button" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="dialog-body">{children}</div>
          <div className="dialog-footer">
            {onConfirm && (
              <button type="submit" className="submit-button" onClick={onConfirm}>
                CONFIRM
              </button>
            )}
          </div>
        </div>
      </FocusTrap>
    </div>,
    dialogRoot
  );
};

export default Dialog;