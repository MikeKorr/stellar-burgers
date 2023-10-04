import styles from "./Overlay.module.css";

import { FC } from "react";

const modalRoot = document.getElementById("react-modal");

type TOverlay = {
  handleClose: () => void;
};

export const Overlay: FC<TOverlay> = ({ handleClose }) => {
  return <div className={styles.overlay} onClick={handleClose}></div>;
};
