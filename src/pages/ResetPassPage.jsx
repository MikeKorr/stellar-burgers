import styles from "./Pages.module.css";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { resetPassAction } from "../services/actions/route-actions";
import { useState } from "react";

export function ResetPassPage() {
  const resetPass = (event) => {
    event.preventDefault();
    resetPassAction();
  };
  const [value, setValue] = useState();
  return (
    <div>
      <form>
        <PasswordInput />
        <Input />
        <Button />
      </form>
    </div>
  );
}
