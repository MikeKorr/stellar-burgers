import styles from "./Pages.module.css";
import { useDispatch } from "react-redux";
import { userLogin } from "../services/actions/route-actions";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

export function LoginPage() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.loginReducer.login);
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const submitForm = (event) => {
    event.preventDefault();
    const user = {
      pass,
      email,
    };
    dispatch(userLogin(user));
  };

  if (login) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div className={styles.mainbox}>
      <form className={styles.logform} onSubmit={submitForm}>
        <span className={styles.logtitle + " text text_type_main-medium mb-6"}>
          Вход
        </span>
        <Input
          onChange={(event) => setEmail(event.target.value)}
          extraClass="mb-6"
          placeholder="E-mail"
          value={email}
        />
        <PasswordInput
          extraClass="mb-6"
          onChange={(event) => setPass(event.target.value)}
          value={pass}
        />
        <Button extraClass="mb-20 ">Войти</Button>
      </form>
      <div className={styles.logpass}>
        <div>
          <span className="text text_type_main-default text_color_inactive">
            Вы - новый пользователь?
          </span>
          <Link
            className={
              styles.noline +
              " text text_type_main-default text_color_inactive ml-2"
            }
            to="/register"
          >
            Зарегестрироваться
          </Link>
        </div>

        <div>
          <span className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </span>
          <Link
            className={
              styles.noline +
              " text text_type_main-default text_color_inactive ml-2 mb-4"
            }
            to="/forgot-password"
          >
            Восстановить пароль
          </Link>
        </div>
      </div>
    </div>
  );
}
