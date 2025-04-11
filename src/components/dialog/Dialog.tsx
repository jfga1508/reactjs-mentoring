import * as ReactDOM from "react-dom";
import { FocusTrap } from "focus-trap-react";
import "./Dialog.css";

export interface DialogProps {
  title: string;
  children: string | React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
}

const Dialog = ({ title, children, onClose, onConfirm }: DialogProps) => {
  const dialogRoot = document.getElementById("dialog-root") || document.body;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="dialog-overlay">
      <FocusTrap>
        <div className="dialog">
          <div className="dialog-header">
            <h2 className="dialog-title">{title}</h2>
            <button className="dialog-close-button" onClick={handleClose}>
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
