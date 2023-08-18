import styles from "./Overlay.module.css";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modal");

export default function Overlay({ setIsModalOpen }) {
  const handleClick = () => {
    setIsModalOpen(false);
  };

  return <div className={styles.overlay} onClick={handleClick}></div>;
}

Overlay.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
};
