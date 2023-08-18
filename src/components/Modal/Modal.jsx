import { useEffect } from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Overlay from "../Overlay/Overlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modal");

export default function Modal({ children, setIsModalOpen }) {
  useEffect(() => {
    function onEsc(evt) {
      if (evt.code === "Escape") {
        setIsModalOpen(false);
      }
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.button}>
          <CloseIcon
            type="primary"
            onClick={handleClose}
            extraClass={styles.button}
          />
        </div>
        {children}
      </div>
      <Overlay setIsModalOpen={setIsModalOpen} />
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
