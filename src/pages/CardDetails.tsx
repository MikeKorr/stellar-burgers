import styles from "./Pages.module.css";
import { FC, useEffect, useMemo } from "react";
import { getIngElements } from "../services/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  WS_START_ACTION,
  WS_START_PROFILE_ACTION,
} from "../services/actions/route-actions";
import { getCookie } from "../utils/cookies";

export const CardDetails: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location.pathname, "локация");
  useEffect(() => {
    dispatch(getIngElements());
    // const token = getCookie("access");
    // dispatch(WS_START_ACTION(token));
    // dispatch(WS_START_PROFILE_ACTION(token));
  }, []);
  const ingredients = useSelector(
    (state: any) => state.ingredientReducer.ingredient
  );

  const data = useSelector((state: any) => state.wsReducer.orders);

  const { id } = useParams<{ id: string }>();

  const orderData = useMemo(() => {
    return data.find((el: any) => el._id === id);
  }, [data, id]);

  const detailArrs = () => {
    return ingredients.filter((el: any) =>
      orderData?.ingredients.includes(el._id)
    );
  };

  const detailArr = detailArrs();

  const ordPrice = orderData?.ingredients.map((el: any) => {
    return ingredients.find((elem: any) => elem._id === el);
  });

  const reducePrice = ordPrice?.reduce(
    (acc: any, item: any) => acc + item.price,
    0
  );

  // console.log(detailIngs, "инг");
  return (
    <div className={styles.detailbox}>
      <div className={styles.detailtitle}>
        <span className={styles.dtitle + " text_type_digits-default"}>
          {"# " + orderData?.number}
        </span>
        <span className="text text_type_main-medium mb-4">
          {orderData?.name}
        </span>
        <span className={styles.textdone + " text_type_main-default mb-4"}>
          {orderData?.status === "done" ? "Выполнен" : "Готовится"}
        </span>
      </div>
      <div className={styles.startposition}>
        <span className="text text_type_main-medium">Cостав:</span>
        <div className={styles.detscroll + " custom-scroll"}>
          {orderData &&
            detailArr.map((el: any) => {
              return (
                <div key={el._id} className={styles.detscrollbox}>
                  <img className={styles.imgcard} src={el.image_mobile} />
                  <div
                    className={
                      styles.detName + " text text_type_main-default ml-6"
                    }
                  >
                    {el.name}
                  </div>
                  <div
                    className={
                      styles.detgrow + " text text_type_digits-default mr-2"
                    }
                  >
                    {ordPrice?.filter((it: any) => it._id === el._id).length}x
                    {el.price}
                  </div>
                  <CurrencyIcon type="primary" />
                </div>
              );
            })}
        </div>
      </div>
      <div className={styles.dataprice + " mt-10"}>
        <FormattedDate date={new Date(orderData.createdAt)} />
        <div className={styles.dcenter}>
          <div className="text text_type_digits-default mr-2">
            {reducePrice}
          </div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
