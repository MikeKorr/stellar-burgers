import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import { useDrag, useDrop } from "react-dnd";

import { useDispatch, useSelector } from "react-redux";
import { SET_BUN_ACTION, DEL_ING_ACTION } from "../../services/actions";
import { ADD_ING_ACTION, DND_ING_ACTION } from "../../services/actions";
import { nanoid } from "nanoid";
import { useRef } from "react";
import { OrderButton } from "../OrderButton/OrderButton";
import { getOrder } from "../../services/actions";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { ingItem } from "../../utils/prop-types";

export default function BurgerConstructor({ changeModal }) {
  const dispatch = useDispatch();
  const main = useSelector((state) => state.constructorReducer.mains);
  const bunCollect = useSelector((state) => state.constructorReducer.buns);
  const [, dropIng] = useDrop(() => ({
    accept: "ingredient",
    drop: (item) => newCardElement(item.item),
  }));

  const newCardElement = (element) => {
    element = { ...element, id: nanoid() };
    if (element.type === "bun") {
      dispatch(SET_BUN_ACTION(element));
    }
    if (element.type !== "bun") {
      dispatch(ADD_ING_ACTION(element));
    }
  };

  const ordId = useMemo(() => {
    return bunCollect.map((el) => el._id);
  }, [main]);

  const requestId = () => {
    dispatch(getOrder(ordId));
  };

  const delElem = (item) => {
    dispatch(DEL_ING_ACTION(item));
  };

  const [, dropConst] = useDrop(() => ({
    accept: "elem",
    drop: (item) => DND_ING_ACTION(item.item),
  }));
  return (
    <div ref={dropIng}>
      <div className={styles.const + " mb-4 mt-4"}>
        {bunCollect.map((item) => {
          if (item.type === "bun")
            return (
              <div className={styles.ing} key={item.id}>
                <div className={styles.hidden}>
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${item.name} (верх)`}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            );
        })}
      </div>
      <div className={styles.main + " custom-scroll"} ref={dropConst}>
        {main.map((item, index) => {
          if (item.type !== "bun") {
            return (
              <BurgerConstElement
                elem={item}
                index={index}
                id={item.id}
                key={item.id}
                delElem={delElem}
              />
            );
          }
        })}
      </div>
      <div className={styles.ing}>
        <div className={styles.const + " mb-4 mt-4"}>
          {bunCollect.map((item) => {
            if (item.type === "bun")
              return (
                <div className={styles.ing} key={item.id}>
                  <div className={styles.hidden}>
                    <DragIcon type="primary" />
                  </div>
                  <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${item.name} (низ)`}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </div>
              );
          })}
        </div>
      </div>

      <div
        className={styles.order}
        onClick={() => {
          changeModal("Order");
          requestId();
        }}
      >
        <OrderButton />
      </div>
    </div>
  );
}

function BurgerConstElement({ elem, delElem, id, index }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const changeCardPosition = (drag, drop) => {
    dispatch(DND_ING_ACTION(drag, drop));
  };
  const [, drop] = useDrop({
    accept: "elem",

    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      changeCardPosition(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: "elem",
    item: () => {
      return { id, index };
    },
  });
  drag(drop(ref));

  return (
    <div className={styles.ing} ref={ref} key={elem.id}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={elem.name}
        price={elem.price}
        thumbnail={elem.image}
        extraClass="mb-4"
        handleClose={() => delElem(elem)}
      />
    </div>
  );
}

BurgerConstElement.propTypes = {
  elem: ingItem.isRequired,
  delElem: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

BurgerConstructor.propTypes = {
  changeModal: PropTypes.func.isRequired,
};
