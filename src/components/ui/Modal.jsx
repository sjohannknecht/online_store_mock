import "./Modal.css";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import Button from "./Button";

const Modal = forwardRef(function Modal({ children }, ref) {
  function handleOk() {
    ref.current.close();
  }

  return (
    <dialog ref={ref}>
      <p>{children}</p>
      <Button className="Button--secondary" autoFocus onClick={handleOk}>
        Ok
      </Button>
    </dialog>
  );
});

Modal.propTypes = {
  children: PropTypes.node,
};

export default Modal;
