import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import styles from "./AppMain.module.css";

export default function AppMain({ setIsModalOpen, changeModal }) {
  return (
    <main className={styles.main}>
      <BurgerIngredients
        setIsModalOpen={setIsModalOpen}
        changeModal={changeModal}
      />
      <BurgerConstructor
        setIsModalOpen={setIsModalOpen}
        changeModal={changeModal}
      />
    </main>
  );
}
