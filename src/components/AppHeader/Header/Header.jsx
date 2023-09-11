import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
export default function Header() {
  const login = JSON.parse(sessionStorage.getItem("login"));

  return (
    <div className={styles.position + " text text_type_main-default"}>
      <div className={styles.menu + " mt-4 mb-4"}>
        <NavLink to="/" exact={true} className={styles.link + " p-5 mr-2"}>
          <BurgerIcon type="primary" />
          <span className="text text_type_main-default text_color_inactive ml-2">
            Конструктор
          </span>
        </NavLink>

        <NavLink to="#" exact={true} className={styles.link + " p-5"}>
          <ListIcon type="primary" />
          <span className="text text_type_main-default text_color_inactive ml-2">
            Лента заказов
          </span>
        </NavLink>
      </div>
      <div className={styles.box}>
        <Logo />
      </div>
      <NavLink
        to={login ? { pathname: "/profile" } : { pathname: "/login" }}
        className={styles.link + " p-5"}
      >
        <span className="text text_type_main-default text_color_inactive ml-2">
          Личный кабинет
        </span>
      </NavLink>
    </div>
  );
}
