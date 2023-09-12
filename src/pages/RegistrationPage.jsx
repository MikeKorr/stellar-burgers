import styles from "./Pages.module.css";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { userReg } from "../services/actions/route-actions";
import { useState } from "react";

export function RegistrationPage() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.registrationReducer.success);
  const registrationForm = (event) => {
    event.preventDefault();
    const user = {
      name: value.name,
      email: value.email,
      password: value.password,
    };
    dispatch(userReg(user));
  };
  const [value, setValue] = useState({
    email: "",
    name: "",
    password: "",
  });

  return (
    <div className={styles.mainbox}>
      <form className={styles.logform} onSubmit={registrationForm}>
        <span className={styles.logtitle + " text text_type_main-medium mb-6"}>
          Регистрация
        </span>
        <Input
          extraClass="mb-6"
          placeholder="Имя"
          name={"name"}
          onChange={(event) => setValue({ ...value, name: event.target.value })}
          value={value.name}
        />
        <Input
          extraClass="mb-6"
          placeholder="E-mail"
          name={"email"}
          onChange={(event) =>
            setValue({ ...value, email: event.target.value })
          }
          value={value.email}
        />
        <PasswordInput
          extraClass="mb-6"
          name={"password"}
          onChange={(event) =>
            setValue({ ...value, password: event.target.value })
          }
          value={value.password}
        />
        <Button extraClass="mb-20 ">Зарегестрироваться</Button>
        {login ? <Redirect to="/profile" /> : <Redirect to="/register" />}
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
  );
}
