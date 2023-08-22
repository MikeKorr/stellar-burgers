import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { IngredientsDetails } from "../IngredientsDetails/IngredientsDetails";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import { useDispatch } from "react-redux";

import { getIngElements } from "../../services/actions";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [itemModal, setItemModal] = useState("");

  function changeModal(mod) {
    setItemModal(mod);
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  }

  useEffect(() => {
    dispatch(getIngElements());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppMain setIsModalOpen={setIsModalOpen} changeModal={changeModal} />
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen}>
          {itemModal === "Order" ? <OrderDetails /> : <IngredientsDetails />}
        </Modal>
      )}
    </div>
  );
}

export default App;
