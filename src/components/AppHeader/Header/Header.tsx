import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Header.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FC } from "react";

export const Header: FC = () => {
  const login: boolean = useSelector((state: any) => state.loginReducer.login);
  const location = useLocation();
  // const activeChanger = (activeStyle: boolean) =>
  //   `${styles.link}${(activeStyle && ` ${styles.activelink}`) || ""}`;
  console.log(location, "здесь");
  return (
    <div className={styles.position + " text text_type_main-default"}>
      <div className={styles.menu + " mt-4 mb-4"}>
        <NavLink
          to="/"
          className={
            location.pathname === "/"
              ? `${styles.activelink} text text_type_main-default p-5`
              : `${styles.disablelink} text text_type_main-default p-5`
          }
        >
          <BurgerIcon
            type={location.pathname === "/" ? "primary" : "secondary"}
          />
          <span className="ml-2">Конструктор</span>
        </NavLink>

        <NavLink
          to="#"
          className={
            location.pathname === "#"
              ? `${styles.activelink} text text_type_main-default p-5`
              : `${styles.disablelink} text text_type_main-default p-5`
          }
        >
          <ListIcon
            type={location.pathname === "#" ? "primary" : "secondary"}
          />
          <span className="ml-2">Лента заказов</span>
        </NavLink>
      </div>
      <div className={styles.box}>
        <Logo />
      </div>
      <NavLink
        to={login ? { pathname: "/profile" } : { pathname: "/login" }}
        className={
          location.pathname === "/profile"
            ? `${styles.activelink} text text_type_main-default p-5`
            : `${styles.disablelink} text text_type_main-default p-5`
        }
      >
        <ProfileIcon
          type={location.pathname === "/profile" ? "primary" : "secondary"}
        />
        <span className="ml-2">Личный кабинет</span>
      </NavLink>
    </div>
  );
};
