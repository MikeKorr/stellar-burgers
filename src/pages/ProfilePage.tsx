import styles from "./Pages.module.css";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Button,
  PasswordInput,
  EditIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { patchProfileInfo } from "../services/actions/route-actions";
import { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { userLogout } from "../services/actions/route-actions";
import { FC, FormEventHandler } from "react";
import { delCookie } from "../utils/cookies";

export const ProfilePage: FC = () => {
  const dispatch = useDispatch();
  const chagngedEmail = useSelector(
    (state: any) => state.profileReducer.user.email
  );
  const chagngedName = useSelector(
    (state: any) => state.profileReducer.user.name
  );
  // const login = useSelector((state) => state.loginReducer.login);
  const [value, setValue] = useState({
    name: chagngedName,
    email: chagngedEmail,
    password: "",
  });

  useEffect(() => {
    setValue({
      name: chagngedName,
      email: chagngedEmail,
      password: "",
    });
  }, [chagngedEmail, chagngedName]);

  const saveProfileInfo: FormEventHandler<HTMLFormElement> = (event) => {
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

        <form className={styles.logform} onSubmit={saveProfileInfo}>
          <Input
            extraClass="mb-6"
            placeholder="Имя"
            onChange={(event) =>
              setValue({ ...value, name: event.target.value })
            }
            value={value.name}
            name="name"
            icon={"EditIcon"}
          />
          <Input
            extraClass="mb-6"
            placeholder="Логин"
            onChange={(event) =>
              setValue({ ...value, email: event.target.value })
            }
            value={value.email}
            name="email"
            icon={"EditIcon"}
          />
          <PasswordInput
            extraClass="mb-6"
            onChange={(event) =>
              setValue({ ...value, password: event.target.value })
            }
            value={value.password}
            name="password"
            icon={"EditIcon"}
          />

          <div className={styles.profilebtn}>
            <div className="mr-5">
              <Button htmlType="submit" onClick={removeInfo}>
                Отмена
              </Button>
            </div>
            <div>
              <Button htmlType="submit">Сохранить</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
