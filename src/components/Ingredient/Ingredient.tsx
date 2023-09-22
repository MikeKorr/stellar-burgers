import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Ingredient.module.css";

import { useDispatch, useSelector } from "react-redux";

import { useDrag } from "react-dnd";
import { useMemo } from "react";
import { ADD_DETAILS_ACTION, TIngredient } from "../../services/actions";
import PropTypes from "prop-types";
import { ingItem } from "../../utils/prop-types";
import { Link } from "react-router-dom";
import { FC } from "react";

type TIngredientList = {
  type: string;
  ingType: string;
  setIsModalOpen: () => void;
};

export const IngredientList: FC<TIngredientList> = ({
  type,
  ingType,
  setIsModalOpen,
}) => {
  const ingredients = useSelector(
    (state: any) => state.ingredientReducer.ingredient
  );
  return (
    <>
      <p className="text text_type_main-medium">{ingType}</p>
      <div className={styles.grid + " pt-6"}>
        {ingredients
          .filter((item: TIngredient) => item.type === type)
          .map((item: TIngredient) => (
            <div draggable key={item._id}>
              <ProtoIngredient
                key={item._id}
                item={item}
                setIsModalOpen={setIsModalOpen}
                // changeModal={changeModal}
              />
            </div>
          ))}
      </div>
    </>
  );
};

type TProtoIngredient = {
  item: TIngredient;
  setIsModalOpen: (t: boolean) => void;
};

const ProtoIngredient: FC<TProtoIngredient> = ({ item, setIsModalOpen }) => {
  const main = useSelector((state: any) => state.constructorReducer.mains);
  const buns = useSelector((state: any) => state.constructorReducer.buns);

  const counter = useMemo(
    () =>
      main.filter((el: TIngredient) => el._id === item._id).length ||
      buns.filter((el: TIngredient) => el._id === item._id).length * 2,
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
    // changeModal("Ing");
  };

  return (
    <div ref={dragRef} onClick={handleClick}>
      <Link
        className={styles.ingredient + " text"}
        to={{
          pathname: `/ingredients/${item._id}`,
        }}
      >
        <img className="ml-4 mr-4" src={item.image} />
        {counter > 0 ? (
          <Counter
            // id={item._id}
            count={counter}
            size="default"
            extraClass="m-1"
          />
        ) : null}
        <div className={styles.block + " mt-1 mb-1"}>
          <span className="text text_type_digits-default mr-1">
            {item.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={styles.center + " text text_type_main-small"}>
          {item.name}
        </p>
      </Link>
    </div>
  );
};

// ProtoIngredient.propTypes = {
//   item: ingItem.isRequired,
//   setIsModalOpen: PropTypes.func.isRequired,
//   changeModal: PropTypes.func.isRequired,
// };