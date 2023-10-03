import styles from "./Pages.module.css";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { userLogout } from "../services/actions/route-actions";
import { FC } from "react";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileHistory } from "./ProfileHistory";
import {
  WS_START_ACTION,
  WS_START_PROFILE_ACTION,
} from "../services/actions/route-actions";
import { getCookie } from "../utils/cookies";
import { useAppDispatch } from "../services/hooks/hooks";
import { useLocation } from "react-router-dom";
import { TLocation } from "../services/types/types";

export const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();

  const logoutProfile = useCallback(() => {
    dispatch(userLogout());
  }, [dispatch]);

  const location = useLocation<TLocation>();
  let background = location.state && location.state.background;

  return (
    <div>
      <div className={styles.profilebox}>
        <div>
          <div className={styles.navbox + " mr-15"}>
            <NavLink
              activeClassName={styles.active}
              className={
                styles.profilelink +
                " text text_type_digits-default text_color_inactive"
              }
              to={{ pathname: "/profile" }}
              exact={true}
            >
              Профиль
            </NavLink>
            <NavLink
              activeClassName={styles.active}
              className={
                styles.profilelink +
                " text text_type_digits-default text_color_inactive"
              }
              to={{ pathname: "/profile/orders" }}
            >
              История заказов
            </NavLink>
            <NavLink
              to={{ pathname: "/login" }}
              activeClassName={styles.active}
              className={
                styles.profilelink +
                " text text_type_digits-default text_color_inactive"
              }
            >
              <span onClick={logoutProfile}>Выход</span>
            </NavLink>
            <div className={styles.psinfo + " mt-20"}>
              <span className="text text_type_main-default text_color_inactive">
                В этом разделе вы можете изменить свои персональные данные
              </span>
            </div>
          </div>
        </div>
        <Switch location={background || location}>
          <Route path="/profile" exact={true}>
            <ProfileInfo />
          </Route>
          <Route path="/profile/orders" exact={true}>
            <ProfileHistory />
          </Route>
        </Switch>
      </div>
    </div>
  );
};
