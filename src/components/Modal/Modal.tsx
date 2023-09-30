import { useEffect } from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Overlay } from "../Overlay/Overlay";
import PropTypes from "prop-types";
import { ReactNode, FC } from "react";

const modalRoot = document.getElementById("react-modal");

type TModal = {
  children: ReactNode;
  closePopup: () => void;
};

export const Modal: FC<TModal> = ({ children, closePopup }) => {
  useEffect(() => {
    function onEsc(evt: KeyboardEvent) {
      if (evt.code === "Escape") {
        handleClose();
      }
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  const handleClose = () => {
    closePopup();
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.button}>
          <CloseIcon
            type="primary"
            onClick={handleClose}
            // extraClass={styles.button}
          />
        </div>
        {children}
      </div>
      <Overlay handleClose={handleClose} />
    </>,
    modalRoot as HTMLDivElement
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};
