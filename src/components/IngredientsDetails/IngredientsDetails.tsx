import { useParams } from "react-router-dom";
import styles from "./IngredientsDetails.module.css";
import { useSelector } from "react-redux";

export function IngredientsDetails() {
  const ingredients = useSelector(
    (state: any) => state.ingredientReducer.ingredient
  );
  const { id } = useParams<{ id: string }>();
  const ing = ingredients.find((el: any) => el._id === id);

  return (
    <div className={styles.box + " mt-30 mb-30"}>
      <div className={styles.title}>
        <p className=" text text_type_main-large">Детали ингредиента</p>
      </div>
      <img src={ing?.image_large} className="pb-4" alt={ing?.name} />
      <p className="text text_type_main-medium pb-8">{ing?.name}</p>
      <div
        className={
          styles.row + " text text_type_main-default text_color_inactive"
        }
      >
        <div className={styles.str + " mr-5"}>
          <span>Калории,калл</span>
          <span>{ing?.calories}</span>
        </div>
        <div className={styles.str + " mr-5"}>
          <span>Белки, г</span>
          <span>{ing?.proteins}</span>
        </div>
        <div className={styles.str + " mr-5"}>
          <span>Жиры, г</span>
          <span>{ing?.fat}</span>
        </div>
        <div className={styles.str}>
          <span>Углеводы, г</span>
          <span>{ing?.carbohydrates}</span>
        </div>
      </div>
    </div>
  );
}
