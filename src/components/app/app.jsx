import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { IngredientsDetails } from "../IngredientsDetails/IngredientsDetails";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { SET_INGREDIENTS_ACTION } from "../../services/actions";

// import { compose, createStore, applyMiddleware } from "redux";
// import { compose, createStore } from "redux";
// const composeEnhancers =
//   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const enhancer = composeEnhancers();

// const store = createStore(rootReducer, enhancer);

function App() {
  const {
    ingredient: { ingredient },
  } = useSelector((store) => ({
    ingredient: store.ingredientReducer,
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [itemModal, setItemModal] = useState("");
  //dnd
  // const [elements, setElements] = useState(ingredient);

  function changeModal(mod) {
    setItemModal(mod);
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  }

  useEffect(() => {
    fetch("https://norma.nomoreparties.space/api/ingredients")
      .then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            dispatch(SET_INGREDIENTS_ACTION(data.data));
          });
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppMain setIsModalOpen={setIsModalOpen} changeModal={changeModal} />
      {isModalOpen && (
        <>
          <Modal setIsModalOpen={setIsModalOpen}>
            {itemModal == "Order" ? <OrderDetails /> : <IngredientsDetails />}
          </Modal>
        </>
      )}
    </div>
  );
}

export default App;
