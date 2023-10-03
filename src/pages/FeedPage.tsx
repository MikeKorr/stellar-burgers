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
  WS_STOP_ACTION,
} from "../services/actions/route-actions";

import { useAppSelector, useAppDispatch } from "../services/hooks/hooks";
import { nanoid } from "nanoid";

export const FeedPage: FC = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.wsReducer.orders);
  console.log(order, "фиид");
  const total = useAppSelector((state) => state.wsReducer.total);
  const totalToday = useAppSelector((state) => state.wsReducer.totalToday);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/feed") {
      dispatch(WS_STOP_ACTION());
    } else {
      dispatch(WS_START_ACTION());
      return () => {};
    }
  }, [location, dispatch]);

  return (
    order && (
      <div className={styles.orderpage + " mt-9"}>
        <div className={styles.orderscroll}>
          <span className="text text_type_main-large">Лента заказов</span>
          <div className={styles.feedscroll + " custom-scroll"}>
            {order.map((card) => {
              return <Cards card={card} key={card._id} />;
            })}
          </div>
        </div>
        <div className={styles.donepending}>
          <div className={styles.donegrid}>
            <span className="text text_type_main-medium">Готовы:</span>
            <span className="text text_type_main-medium">В работе:</span>
            <div className={styles.donescroll + " custom-scroll"}>
              {order.map((it, index) => {
                if (it.status === "done" && index < 20)
                  return (
                    <div
                      key={it._id}
                      className={styles.spandone + " text_type_digits-default"}
                    >
                      <div>{it.number}</div>
                    </div>
                  );
              })}
            </div>
            <div className={styles.gridorders}>
              {order.map((el) => {
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
  const ingredients = useAppSelector(
    (state) => state.ingredientReducer.ingredient
  );

  const location = useLocation();
  const cardIng = card.ingredients;
  const reduceCard = () =>
    cardIng
      .map((el) => {
        return ingredients.filter((item) => item._id === el);
      })
      .reduce((acc, item) => {
        return acc.concat(item);
      });

  const ingResult = reduceCard();

  const cardPrice = () => {
    return ingResult.reduce((acc, item) => acc + item.price, 0);
  };

  return (
    <div>
      <Link
        to={{
          pathname:
            location.pathname === "/profile/orders"
              ? `/profile/orders/${card._id}`
              : `/feed/${card._id}`,
          state: { background: location },
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
            {ingResult.slice(0, 5).map((el) => (
              <div key={nanoid()} className={styles.flexbox}>
                <img
                  className={styles.imgcard}
                  src={el.image_mobile}
                  alt={el.name}
                />
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
