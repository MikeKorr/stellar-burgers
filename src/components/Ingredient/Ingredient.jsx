import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Ingredient.module.css";

import { useDispatch, useSelector } from "react-redux";

import { useDrag } from "react-dnd";
import { useMemo } from "react";
import { ADD_DETAILS_ACTION } from "../../services/actions";
import PropTypes from "prop-types";
import { ingItem } from "../../utils/prop-types";
export function Bun({ ingType, setIsModalOpen, changeModal }) {
  const ingredients = useSelector(
    (state) => state.ingredientReducer.ingredient
  );
  return (
    <div>
      <p className="text text_type_main-medium">{ingType}</p>
      <div className={styles.grid + " pt-6"}>
        {ingredients.map((item) => {
          if (item.type == "bun") {
            return (
              <div draggable key={item._id}>
                <ProtoIngredient
                  key={item._id}
                  item={item}
                  setIsModalOpen={setIsModalOpen}
                  changeModal={changeModal}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export function Sauce({ ingType, setIsModalOpen, changeModal }) {
  const ingredients = useSelector(
    (state) => state.ingredientReducer.ingredient
  );

  return (
    <div>
      <p className="text text_type_main-medium">{ingType}</p>
      <div className={styles.grid + " pt-6"}>
        {ingredients.map((item) => {
          if (item.type == "sauce") {
            return (
              <div draggable key={item._id}>
                <ProtoIngredient
                  key={item._id}
                  item={item}
                  setIsModalOpen={setIsModalOpen}
                  changeModal={changeModal}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export function Main({ ingType, setIsModalOpen, changeModal }) {
  const ingredients = useSelector(
    (state) => state.ingredientReducer.ingredient
  );

  return (
    <div>
      <p className="text text_type_main-medium">{ingType}</p>
      <div className={styles.grid + " pt-6"}>
        {ingredients.map((item) => {
          if (item.type == "main") {
            return (
              <div key={item._id}>
                <ProtoIngredient
                  key={item._id}
                  item={item}
                  setIsModalOpen={setIsModalOpen}
                  changeModal={changeModal}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

function ProtoIngredient({ item, setIsModalOpen, changeModal }) {
  const main = useSelector((state) => state.constructorReducer.mains);
  const buns = useSelector((state) => state.constructorReducer.buns);

  const counter = useMemo(
    () =>
      main.filter((el) => el._id === item._id).length ||
      buns.filter((el) => el._id === item._id).length * 2,
    [buns, main, item._id]
  );

  const [, dragRef] = useDrag(
    {
      type: "ingredient",
      item: {
        item,
        id: item._id,
        type: item.type,
      },
    },
    []
  );

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(ADD_DETAILS_ACTION(item));
    setIsModalOpen(true);
    changeModal("Ing");
  };

  return (
    <div className={styles.ingredient} ref={dragRef} onClick={handleClick}>
      <img className="ml-4 mr-4" src={item.image} />
      {counter > 0 ? (
        <Counter
          id={item._id}
          count={counter}
          size="default"
          extraClass="m-1"
        />
      ) : null}
      <div className={styles.block + " mt-1 mb-1"}>
        <span className="text text_type_digits-default mr-1">{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.center + " text text_type_main-small"}>
        {item.name}
      </p>
    </div>
  );
}

ProtoIngredient.propTypes = {
  item: ingItem.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  changeModal: PropTypes.func.isRequired,
};

Main.propTypes = {
  ingType: PropTypes.string.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  changeModal: PropTypes.func.isRequired,
};
Bun.propTypes = {
  ingType: PropTypes.string.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  changeModal: PropTypes.func.isRequired,
};
Sauce.propTypes = {
  ingType: PropTypes.string.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  changeModal: PropTypes.func.isRequired,
};
