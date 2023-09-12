import styles from "./Pages.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getForgotPass } from "../services/actions/route-actions";
import { useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ForgotPass() {
  const dispatch = useDispatch();
  const success = useSelector((state) => state.forgotpassReducer.success);
  const history = useHistory();

  const [value, setValue] = useState("");

  const handlePass = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(getForgotPass());
      success
        ? history.push("/reset-password")
        : history.push("/forgot-password");
    },
    [dispatch, history, success]
  );

  //Есть баг с необходимость нажать на кнопку восстановть 2 раза, чтобы перейти на сброс пароля.

  return (
    <div className={styles.mainbox}>
      <form className={styles.logform} onSubmit={handlePass}>
        <span className={styles.logtitle + " text text_type_main-medium mb-6"}>
          Восстановление пароля
        </span>
        <Input
          onChange={(event) => setValue(event.target.value)}
          extraClass="mb-6"
          placeholder="Укажите E-mail"
          value={value}
          name="email"
        />

        <Button extraClass="mb-20 ">Восстановить</Button>
        <div>
          <span className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </span>
          <Link
            className={
              styles.noline +
              " text text_type_main-default text_color_inactive ml-2"
            }
            to="/login"
          >
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}
