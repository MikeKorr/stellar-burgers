import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import styles from "./AppMain.module.css";
import { FC } from "react";

export const AppMain = ({ setIsModalOpen }) => {
  return (
    <main className={styles.main}>
      <BurgerIngredients setIsModalOpen={setIsModalOpen} />
      <BurgerConstructor setIsModalOpen={setIsModalOpen} />
    </main>
  );
};
