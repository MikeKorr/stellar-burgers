import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.position + " text text_type_main-default"}>
      <div className={styles.menu + " mt-4 mb-4"}>
        <a className={styles.link + " p-5 mr-2"}>
          <BurgerIcon type="primary" />
          <span className="ml-2">Конструктор</span>
        </a>
        <a className={styles.link + " p-5"}>
          <ListIcon type="secondary" />
          <span className="text text_type_main-default text_color_inactive ml-2">
            Лента заказов
          </span>
        </a>
      </div>
      <div className={styles.box}>
        <Logo />
      </div>
      <a className={styles.link + " p-5"}>
        <ProfileIcon type="secondary" />
        <span className="text text_type_main-default text_color_inactive ml-2">
          Личный кабинет
        </span>
      </a>
    </div>
  );
}
