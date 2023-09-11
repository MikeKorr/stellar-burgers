import styles from "./Pages.module.css";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { patchProfileInfo } from "../services/actions/route-actions";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { userLogout } from "../services/actions/route-actions";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const chagngedEmail = useSelector((state) => state.profileReducer.user.email);
  const chagngedName = useSelector((state) => state.profileReducer.user.name);

  const [value, setValue] = useState({
    name: chagngedName,
    email: chagngedEmail,
    password: "",
  });

  const watcher =
    value.name !== chagngedName ||
    value.email !== chagngedEmail ||
    value.password.length > 0;

  useEffect(() => {
    setValue({
      name: chagngedName,
      email: chagngedEmail,
      password: "",
    });
  }, [chagngedEmail, chagngedName]);

  const saveUserInfo = (event) => {
    event.preventDefault();
    const { name, email, password } = value;
    dispatch(patchProfileInfo(name, email, password));
    setValue({
      name: chagngedName,
      email: chagngedEmail,
      password: "",
    });
  };

  const logoutProfile = useCallback(() => {
    dispatch(userLogout());
  }, [dispatch]);

  const removeInfo = () => {
    setValue({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <div>
        <div>
          <NavLink to={{ pathname: "/profile" }} exact={true}>
            Профиль
          </NavLink>
          <NavLink to={{ pathname: "/profile/orders" }}>
            История заказов
          </NavLink>
          <NavLink to={{ pathname: "/login" }}>Выход</NavLink>
        </div>
      </div>
      <div className={styles.mainbox}>
        <form className={styles.logform} onSubmit={saveUserInfo}>
          <span
            className={styles.logtitle + " text text_type_main-medium mb-6"}
          >
            Регистрация
          </span>
          <Input
            extraClass="mb-6"
            placeholder="Имя"
            onChange={(event) =>
              setValue({ ...value, name: event.target.value })
            }
            value={value.name}
            errorText={"Допущена ошибка"}
          />
          <Input
            extraClass="mb-6"
            placeholder="E-mail"
            onChange={(event) =>
              setValue({ ...value, email: event.target.value })
            }
            value={value.email}
            errorText={"Допущена ошибка"}
          />
          <PasswordInput
            extraClass="mb-6"
            onChange={(event) =>
              setValue({ ...value, password: event.target.value })
            }
            value={value.password}
            errorText={"Допущена ошибка"}
          />
          <Button extraClass="mb-20 ">Зарегестрироваться</Button>
          <div>
            <span className="text text_type_main-default text_color_inactive">
              Уже зарегестрированы?
            </span>
            <Link
              to="/login"
              className={
                styles.noline +
                " text text_type_main-default text_color_inactive ml-2 mb-4"
              }
            >
              Войти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
