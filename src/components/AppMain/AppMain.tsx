import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import styles from "./AppMain.module.css";
import { FC, SetStateAction, Dispatch } from "react";

type TAppMain = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const AppMain: FC<TAppMain> = ({ setIsModalOpen }) => {
  return (
    <main className={styles.main}>
      <BurgerIngredients setIsModalOpen={setIsModalOpen} />
      <BurgerConstructor setIsModalOpen={setIsModalOpen} />
    </main>
  );
};
