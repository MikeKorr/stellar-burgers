import styles from "./Pages.module.css";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassAction } from "../services/actions/route-actions";
import { useEffect, useState } from "react";
import { GET_PASS_ACTION } from "../services/actions/route-actions";

export function ResetPassPage() {
  const dispatch = useDispatch();
  const successForgot = useSelector((state) => state.forgotpassReducer.success);
  const success = useSelector((state) => state.resetReducer.success);
  const resetPass = (event) => {
    event.preventDefault();
    dispatch(resetPassAction());
  };
  const [value, setValue] = useState({ password: "", token: "" });
  console.log("рпрпрпрп");
  useEffect(() => {
    return () => dispatch(GET_PASS_ACTION(false));
  }, []);

  if (!success && !successForgot) {
    console.log(success, "ресет");
    return <Redirect to={"/forgot-password"} />;
  }

  return (
    <div className={styles.mainbox}>
      <form className={styles.logform} onSubmit={resetPass}>
        <span className={styles.logtitle + " text text_type_main-medium mb-6"}>
          Восстановление пароля
        </span>
        <PasswordInput
          extraClass="mb-6"
          name={"password"}
          onChange={(event) =>
            setValue({ ...value, password: event.target.value })
          }
          placeholder="Введите новый пароль"
          value={value.password}
          type="password"
        />
        <Input
          extraClass="mb-6"
          name={"token"}
          onChange={(event) =>
            setValue({ ...value, token: event.target.value })
          }
          value={value.token}
          placeholder="Введите код из письма"
        />

        <Button htmlType="submit" extraClass="mb-20 ">
          Сохранить
        </Button>
        {success ? <Redirect to="/login" /> : null}
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
