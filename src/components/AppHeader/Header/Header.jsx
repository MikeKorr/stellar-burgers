import {
  Logo,
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const login = useSelector((state) => state.loginReducer.login);
  const activeChanger = (active) =>
    `${styles.link}${(active && ` ${styles.activelink}`) || ""}`;
  return (
    <div className={styles.position + " text text_type_main-default"}>
      <div className={styles.menu + " mt-4 mb-4"}>
        <NavLink
          activeClassName={styles.activetext}
          to="/"
          exact={true}
          className={({ active }) => activeChanger(active) + " p-5 mr-2"}
        >
          <BurgerIcon type="secondary" />
          <span className="text text_type_main-default text_color_inactive ml-2">
            Конструктор
          </span>
        </NavLink>

        <NavLink
          activeClassName={styles.activetext}
          to="#"
          exact={true}
          className={({ active }) => activeChanger(active) + " p-5"}
        >
          <ListIcon type="secondary" />
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
        className={({ active }) => activeChanger(active) + " p-5"}
      >
        <span className="text text_type_main-default text_color_inactive ml-2">
          Личный кабинет
        </span>
      </NavLink>
    </div>
  );
}
