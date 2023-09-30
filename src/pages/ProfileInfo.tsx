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
import { FormEventHandler } from "react";

export const ProfileInfo = () => {
  const dispatch = useDispatch();
  const chagngedEmail = useSelector(
    (state: any) => state.profileReducer.user.email
  );
  const chagngedName = useSelector(
    (state: any) => state.profileReducer.user.name
  );

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

  const removeInfo = () => {
    setValue({
      name: "",
      email: "",
      password: "",
    });
  };
  return (
    <div>
      <form className={styles.logform} onSubmit={saveProfileInfo}>
        <Input
          extraClass="mb-6"
          placeholder="Имя"
          onChange={(event) => setValue({ ...value, name: event.target.value })}
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
  );
};
