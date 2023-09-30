import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./OrderButton.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../services/actions";
import { FC, SetStateAction, Dispatch } from "react";
import { GET_ORDER_DONE_ACTION } from "../../services/actions";

export const OrderButton: FC = () => {
  const main: TIngredient[] = useSelector(
    (state: any) => state.constructorReducer.mains
  );
  const bunCollect: TIngredient[] = useSelector(
    (state: any) => state.constructorReducer.buns
  );
  const orderPrice = useMemo(
    () =>
      main.reduce((acc, { price }) => acc + price, 0) +
      bunCollect.reduce((acc, { price }) => acc + price, 0) * 2,
    [main, bunCollect]
  );
  return (
    <div className={styles.left + " mt-10"}>
      <div className={styles.box + " mr-10"}>
        <p className="text text_type_digits-medium">{orderPrice}</p>
        <CurrencyIcon type="primary" />
      </div>

      <Button htmlType="button" type="primary" size="large">
        Оформить заказ
      </Button>
    </div>
  );
};
