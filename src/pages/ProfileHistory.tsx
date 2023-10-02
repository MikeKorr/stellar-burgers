import styles from "./Pages.module.css";
import { useSelector } from "react-redux";
import { Cards } from "./FeedPage";
import { useAppSelector, useAppDispatch } from "../services/hooks/hooks";
import {
  WS_START_PROFILE_ACTION,
  WS_STOP_PROFILE_ACTION,
} from "../services/actions/route-actions";
import { getCookie } from "../utils/cookies";
import { useEffect, FC } from "react";

export const ProfileHistory: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = getCookie("access");
    dispatch(WS_START_PROFILE_ACTION(token));
    return () => {
      dispatch(WS_STOP_PROFILE_ACTION);
    };
  }, []);
  const profileOrders = useAppSelector((state) => {
    console.log(state, "стейт");
    return state.wsProfileReducer.orders;
  });
  console.log(profileOrders, "проф");
  return (
    profileOrders && (
      <div>
        <div className={styles.historybox}>
          <div className={styles.feedscroll + " custom-scroll"}>
            {profileOrders.map((card: any) => {
              return <Cards card={card} key={card._id} />;
            })}
          </div>
        </div>
      </div>
    )
  );
};
