import styles from "./IngredientsDetails.module.css";
import { useSelector } from "react-redux";

export function IngredientsDetails() {
  const ingredient = useSelector(
    (state: any) => state.detailReducer.ingDetails
  );

  return (
    <div className={styles.box + " mt-30 mb-30"}>
      <div className={styles.title}>
        <p className=" text text_type_main-large">Детали ингредиента</p>
      </div>
      <img
        src={ingredient.image_large}
        className="pb-4"
        alt={ingredient.name}
      />
      <p className="text text_type_main-medium pb-8">{ingredient.name}</p>
      <div
        className={
          styles.row + " text text_type_main-default text_color_inactive"
        }
      >
        <div className={styles.str + " mr-5"}>
          <span>Калории,калл</span>
          <span>{ingredient.calories}</span>
        </div>
        <div className={styles.str + " mr-5"}>
          <span>Белки, г</span>
          <span>{ingredient.proteins}</span>
        </div>
        <div className={styles.str + " mr-5"}>
          <span>Жиры, г</span>
          <span>{ingredient.fat}</span>
        </div>
        <div className={styles.str}>
          <span>Углеводы, г</span>
          <span>{ingredient.carbohydrates}</span>
        </div>
      </div>
    </div>
  );
}
