import { useSelector } from "react-redux";
import styles from "./OrderDetails.module.css";

export function OrderDetails() {
  const order = useSelector((state: any) => state.orderReducer.id);
  return (
    <div className={styles.box + " mt-30 mb-30"}>
      <p className="text text_type_digits-large">{order}</p>
      <p className="text text_type_main-medium pt-8 pb-15">
        Идентификатор заказа
      </p>
      <img src="../../graphics.png" alt="Done" className="pb-15" />
      <p className="text text_type_main-small pb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
