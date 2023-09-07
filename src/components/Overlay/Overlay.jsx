import styles from "./Overlay.module.css";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modal");

export default function Overlay({ handleClose }) {
  return <div className={styles.overlay} onClick={handleClose}></div>;
}

Overlay.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
