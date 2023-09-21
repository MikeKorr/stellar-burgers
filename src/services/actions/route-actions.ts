import { baseUrl, request } from "../../utils/api";
import { getCookie, setCookie } from "../../utils/cookies";
import { Dispatch } from "@reduxjs/toolkit";
import {
  ISET_INGREDIENTS_ACTION,
  ISET_ITEM_ACTION,
  ISET_TAB_ACTION,
  ISCROLL_ING_ACTION,
  ISET_BUN_ACTION,
  IADD_ING_ACTION,
  IDEL_ING_ACTION,
  IDND_ING_ACTION,
  ICLEAR_CONSTRUCTOR_ACTION,
  IADD_DETAILS_ACTION,
  IDEL_DETAILS_ACTION,
  IGET_ORDER_REQUEST_ACTION,
  IGET_ORDER_DONE_ACTION,
} from ".";

export const GET_PROFILE_INFO = "GET_PROFILE_INFO";
export const PATCH_PROFILE_INFO = "PATCH_PROFILE_INFO";

type TProfile = {
  email: string;
  name: string;
};

export type TPayloadProfile = {
  success: boolean;
  user: TProfile;
};

interface IGET_INFO_ACTION {
  readonly type: typeof GET_PROFILE_INFO;
  readonly payload: TPayloadProfile;
}

interface IPATCH_INFO_ACTION {
  readonly type: typeof PATCH_PROFILE_INFO;
  readonly payload: TPayloadProfile;
}

type TProfileActions = IGET_INFO_ACTION | IPATCH_INFO_ACTION;

const GET_INFO_ACTION = (payload: TPayloadProfile): IGET_INFO_ACTION => ({
  type: GET_PROFILE_INFO,
  payload,
});

const PATCH_INFO_ACTION = (payload: TPayloadProfile): IPATCH_INFO_ACTION => ({
  type: PATCH_PROFILE_INFO,
  payload,
});

export const getProfileInfo = () => {
  const profileUrl = `${baseUrl}/auth/user`;
  const options = {
    headers: {
      authorization: "Bearer " + getCookie("access"),
      "Content-Type": "application/json",
    },
  };
  return (dispatch: any) => {
    request(profileUrl, options)
      .then((data) => {
        const { done } = data;
        if (done) {
          dispatch(GET_INFO_ACTION(data));
        }
      })
      .catch((er) => console.log(er));
  };
};

export const patchProfileInfo = (
  name: string,
  email: string,
  password: string
) => {
  const profileUrl = `${baseUrl}/auth/user`;
  const options = {
    method: "PATCH",
    headers: {
      authorization: "Bearer " + getCookie("access"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  };
  return (dispatch: any) => {
    request(profileUrl, options)
      .then((data) => {
        const { done } = data;
        if (done) {
          dispatch(PATCH_INFO_ACTION(data));
        }
      })
      .catch((er) => console.log(er));
  };
};

//login

export const USER_LOG = "USER_LOG";
export const USER_LOGOUT = "USER_LOGOUT";

type TLogin = {
  email: string;
  password: string;
};

interface IUSER_LOG_ACTION {
  readonly type: typeof USER_LOG;
  readonly payload: boolean;
}

interface IUSER_LOGOUT_ACTION {
  readonly type: typeof USER_LOGOUT;
  readonly payload: boolean;
}

type TLoginActions = IUSER_LOG_ACTION | IUSER_LOGOUT_ACTION;

export const USER_LOG_ACTION = (payload: boolean): IUSER_LOG_ACTION => ({
  type: USER_LOG,
  payload: payload,
});

export const USER_LOGOUT_ACTION = (payload: boolean): IUSER_LOGOUT_ACTION => ({
  type: USER_LOGOUT,
  payload: payload,
});

export const userLogin = (user: TLogin) => {
  const { email, password } = user;
  const loginUrl = `${baseUrl}/auth/login`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  return (dispatch: any) => {
    request(loginUrl, options)
      .then((data) => {
        const { success, refreshToken, accessToken } = data;
        if (success) {
          sessionStorage.setItem("login-data", JSON.stringify(data));
          setCookie("access", accessToken.split("Bearer ")[1]);
          setCookie("refresh", refreshToken);
          dispatch(USER_LOG_ACTION(data));
        }
      })
      .catch((er) => console.log(er));
  };
};

export const userLogout = () => {
  const logoutUrl = `${baseUrl}/auth/logout`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refresh"),
    }),
  };
  return (dispatch: any) => {
    request(logoutUrl, options)
      .then((data) => {
        const { success } = data;
        if (success) {
          sessionStorage.removeItem("login-data");
          dispatch(USER_LOGOUT_ACTION(data));
        }
      })
      .catch((er) => console.log(er));
  };
};

//registration
export const USER_REG = "USER_REG";

type TRegister = {
  email: string;
  password: string;
  name: string;
};

export type TPayloadRegister = {
  success: boolean;
  user: TRegister | {};
};

interface IUSER_REG_ACTION {
  readonly type: typeof USER_REG;
  readonly payload: TPayloadRegister;
}

type TRegisterAction = IUSER_REG_ACTION;

const USER_REG_ACTION = (payload: TPayloadRegister): IUSER_REG_ACTION => ({
  type: USER_REG,
  payload: payload,
});

export const userReg = (user: TRegister) => {
  const { email, password, name } = user;
  const regUrl = `${baseUrl}/auth/register`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  };
  return (dispatch: any) => {
    request(regUrl, options)
      .then((res) => {
        dispatch(USER_REG_ACTION(res));
      })
      .catch((er: any) => console.log(er));
  };
};

//forgotPass

export const GET_PASS = "GET_PASS";

interface IGET_PASS_ACTION {
  readonly type: typeof GET_PASS;
  readonly payload: boolean;
}

type TForgotAction = IGET_PASS_ACTION;

export const GET_PASS_ACTION = (payload: boolean): IGET_PASS_ACTION => ({
  type: GET_PASS,
  payload: payload,
});

export const getForgotPass = () => {
  const passUrl = `${baseUrl}/password-reset`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "",
    }),
  };
  return (dispatch: any) => {
    request(passUrl, options)
      .then(({ success }) => {
        dispatch(GET_PASS_ACTION(success));
      })
      .catch((er: any) => console.log(er));
  };
};

//reset password

export const RESET_PASS = "RESET_PASS";

interface IRESET_PASS_ACTION {
  type: typeof RESET_PASS;
  payload: boolean;
}

type TResetAction = IRESET_PASS_ACTION;

const RESET_PASS_ACTION = (payload: boolean): IRESET_PASS_ACTION => ({
  type: RESET_PASS,
  payload: payload,
});

export const resetPassAction = () => {
  const resetUrl = `${baseUrl}/password-reset/reset`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: "",
      token: "",
    }),
  };
  return (dispatch: Dispatch<IRESET_PASS_ACTION>) => {
    request(resetUrl, options)
      .then(({ success }) => {
        dispatch(RESET_PASS_ACTION(success));
      })
      .catch((er: any) => console.log(er));
  };
};

export type TUnionActions =
  | TProfileActions
  | TLoginActions
  | TRegisterAction
  | TForgotAction
  | TResetAction
  | ISET_INGREDIENTS_ACTION
  | ISET_ITEM_ACTION
  | ISET_TAB_ACTION
  | ISCROLL_ING_ACTION
  | ISET_BUN_ACTION
  | IADD_ING_ACTION
  | IDEL_ING_ACTION
  | IDND_ING_ACTION
  | ICLEAR_CONSTRUCTOR_ACTION
  | IADD_DETAILS_ACTION
  | IDEL_DETAILS_ACTION
  | IGET_ORDER_REQUEST_ACTION
  | IGET_ORDER_DONE_ACTION;
