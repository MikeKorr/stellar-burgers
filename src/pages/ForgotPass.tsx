import styles from "./Pages.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getForgotPass } from "../services/actions/route-actions";
import { useState, useCallback, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ForgotPass() {
  const dispatch = useDispatch();
  const success = useSelector((state: any) => state.forgotpassReducer.success);

  const [value, setValue] = useState("");

  const handlePass = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(getForgotPass());
    },
    [dispatch]
  );

  if (success) {
    return <Redirect to={"/reset-password"} />;
  }

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

        <Button htmlType="submit" extraClass="mb-20 ">
          Восстановить
        </Button>
        {/* {success ? <Redirect to={"/reset-password"} /> : null} */}
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
