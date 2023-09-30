import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Pages.module.css";
import { TOrderComponents } from "../services/types/types";
import { Link, useLocation } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect } from "react";
import {
  WS_START_ACTION,
  WS_START_PROFILE_ACTION,
} from "../services/actions/route-actions";
import { getCookie } from "../utils/cookies";

export const FeedPage: FC = () => {
  const dispatch = useDispatch();
  const order = useSelector((state: any) => state.wsReducer.orders);
  const total = useSelector((state: any) => state.wsReducer.total);
  const totalToday = useSelector((state: any) => state.wsReducer.totalToday);

  useEffect(() => {
    const token = getCookie("access");
    dispatch(WS_START_ACTION(token));
    dispatch(WS_START_PROFILE_ACTION(token));
  }, []);

  return (
    order && (
      <div className={styles.orderpage + " mt-9"}>
        <div className={styles.orderscroll}>
          <span className="text text_type_main-large">Лента заказов</span>
          <div className={styles.feedscroll + " custom-scroll"}>
            {order.map((card: any) => {
              return <Cards card={card} key={card._id} />;
            })}
          </div>
        </div>
        <div className={styles.donepending}>
          <div className={styles.donegrid}>
            <span className="text text_type_main-medium">Готовы:</span>
            <span className="text text_type_main-medium">В работе:</span>
            <div className={styles.donescroll + " custom-scroll"}>
              {order.map((el: any, index: any) => {
                if (el.status === "done" && index < 20)
                  return (
                    <div
                      className={styles.spandone + " text_type_digits-default"}
                    >
                      <div key={el._id}>{el.number}</div>
                    </div>
                  );
              })}
            </div>
            <div className={styles.gridorders}>
              {order.map((el: any) => {
                if (el.status === "pending")
                  return (
                    <span className={styles.spandone} key={el._id}>
                      {el.number}
                    </span>
                  );
              })}
            </div>
          </div>
          <div className={styles.feedcolumn}>
            <span className="text text_type_main-default">
              Выполнено за все время:
            </span>
            <span className="text text_type_digits-large">{total}</span>
          </div>
          <div className={styles.feedcolumn}>
            <span className="text text_type_main-default">
              Выполнено за сегодня:
            </span>
            <span className="text text_type_digits-large">{totalToday}</span>
          </div>
        </div>
      </div>
    )
  );
};

type TCards = {
  card: TOrderComponents;
};

export const Cards: FC<TCards> = ({ card }) => {
  const ingredients = useSelector(
    (state: any) => state.ingredientReducer.ingredient
  );
  const location = useLocation();
  const cardIng = card.ingredients;
  const reduceCard = () =>
    cardIng
      .map((el) => {
        return ingredients.filter((item: any) => item._id === el);
      })
      .reduce((acc, item) => {
        return acc.concat(item);
      });

  const ingResult = reduceCard();

  const cardPrice = () => {
    return ingResult.reduce((acc: any, item: any) => acc + item.price, 0);
  };

  return (
    <div>
      <Link
        to={{
          pathname:
            location.pathname === "/feed"
              ? `/feed/${card._id}`
              : `/profile/orders/${card._id}`,
        }}
        className={styles.cards}
      >
        <div className={styles.cardtitle}>
          <span className="text text_type_main-default">
            {"# " + card.number}
          </span>
          <span className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(card.createdAt)} />
          </span>
        </div>
        <span className="text text_type_main-medium">{card.name}</span>
        <div className={styles.dcenter}>
          <div className={styles.carding}>
            {ingResult.slice(0, 5).map((el: any) => (
              <div className={styles.flexbox}>
                <img className={styles.imgcard} src={el.image_mobile} />
              </div>
            ))}
          </div>
          <div className={styles.dcenter + " text text_type_main-medium"}>
            <div className="mr-2">{cardPrice()}</div>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </div>
  );
};
