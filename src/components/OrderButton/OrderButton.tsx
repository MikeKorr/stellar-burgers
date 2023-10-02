import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./OrderButton.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../services/actions";
import { FC } from "react";
import { useAppSelector } from "../../services/hooks/hooks";
import { Link } from "react-router-dom";
type TOrderButton = {
  requestId: () => void;
};

export const OrderButton: FC<TOrderButton> = ({ requestId }) => {
  const main: TIngredient[] = useAppSelector(
    (state) => state.constructorReducer.mains
  );
  const bunCollect: TIngredient[] = useAppSelector(
    (state) => state.constructorReducer.buns
  );
  const orderPrice = useMemo(
    () =>
      main.reduce((acc, { price }) => acc + price, 0) +
      bunCollect.reduce((acc, { price }) => acc + price, 0) * 2,
    [main, bunCollect]
  );
  const login: boolean = useAppSelector((state) => state.loginReducer.login);
  if (login) {
    <Button htmlType="button" disabled={false} />;
  }
  return (
    <div className={styles.left + " mt-10"}>
      <div className={styles.box + " mr-10"}>
        <p className="text text_type_digits-medium">{orderPrice}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Link
        className={styles.order + " text text_type_main-medium"}
        to={!login ? "/login" : "/order"}
      >
        <Button
          onClick={requestId}
          disabled={!login}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </Link>
    </div>
  );
};
