import {
  ConstructorElement,
  DragIcon,
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
import { useAppDispatch } from "../../services/hooks/hooks";
import { FC, SetStateAction, Dispatch } from "react";
import { TIngredient } from "../../services/actions";
import { useAppSelector } from "../../services/hooks/hooks";

type TIng = {
  id: string;
  item: TIngredient;
  type: string;
};

type TBurgerConstructor = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const BurgerConstructor: FC<TBurgerConstructor> = ({
  setIsModalOpen,
}) => {
  const dispatch = useAppDispatch();
  const mainCollect = useAppSelector((state) => state.constructorReducer.mains);
  const bunCollect = useAppSelector((state) => state.constructorReducer.buns);
  const [, dropIng] = useDrop(() => ({
    accept: "ingredient",
    drop: (item: TIng) => newCardElement(item.item),
  }));

  const newCardElement = (element: TIngredient) => {
    element = { ...element, id: nanoid() };
    if (element.type === "bun") {
      dispatch(SET_BUN_ACTION(element));
    }
    if (element.type !== "bun") {
      dispatch(ADD_ING_ACTION(element));
    }
  };

  const mainId = mainCollect.map((el: any) => el._id);
  const bunId = bunCollect.map((el: any) => el._id);
  const ordId = bunId.concat(mainId).concat(bunId);

  const requestId = () => {
    dispatch(getOrder(ordId));
    setIsModalOpen(true);
  };

  const delElem = (item: TIngredient) => {
    dispatch(DEL_ING_ACTION(item));
  };

  return (
    <div ref={dropIng} data-testid="dropIng">
      <div className={styles.const + " mb-4 mt-4"}>
        {bunCollect.map((item: TIngredient) => {
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
      <div className={styles.main + " custom-scroll"}>
        {mainCollect.map((item: TIngredient, index: number) => {
          if (item.type !== "bun") {
            return (
              <div data-testid="delElem">
                <BurgerConstElement
                  elem={item}
                  index={index}
                  id={item.id}
                  key={item.id}
                  delElem={delElem}
                />
              </div>
            );
          }
        })}
      </div>
      <div className={styles.ing}>
        <div className={styles.const + " mb-4 mt-4"}>
          {bunCollect.map((item: TIngredient) => {
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

      <OrderButton requestId={requestId} />
    </div>
  );
};

type TBurgerConstElement = {
  elem: TIngredient;
  delElem: (elem: TIngredient) => void;
  id: string | undefined;
  index: number;
};

const BurgerConstElement: FC<TBurgerConstElement> = ({
  elem,
  delElem,
  id,
  index,
}) => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const changeCardPosition = (drag: number, drop: number) => {
    dispatch(DND_ING_ACTION(drag, drop));
  };
  const [, drop] = useDrop({
    accept: "elem",

    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragItemIndex = item.index;
      const hoverItemIndex = index;
      if (dragItemIndex === hoverItemIndex) {
        return;
      }
      const refCurent: HTMLElement = ref.current;
      const hoverBoundingRect = refCurent?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragItemIndex < hoverItemIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragItemIndex > hoverItemIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      changeCardPosition(dragItemIndex, hoverItemIndex);
      item.index = hoverItemIndex;
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
};
