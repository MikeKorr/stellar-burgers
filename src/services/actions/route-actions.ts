import { baseUrl, request } from "../../utils/api";
import { delCookie, getCookie, setCookie } from "../../utils/cookies";
import { Dispatch } from "react";
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
import { TOrderComponents } from "../types/types";
import { ThunkFunc } from "../hooks/hooks";
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

const GET_INFO_ACTION = (payload: TPayloadProfile): IGET_INFO_ACTION => ({
  type: GET_PROFILE_INFO,
  payload,
});

const PATCH_INFO_ACTION = (payload: TPayloadProfile): IPATCH_INFO_ACTION => ({
  type: PATCH_PROFILE_INFO,
  payload,
});

export const getProfileInfo: ThunkFunc = () => {
  const profileUrl = `${baseUrl}/auth/user`;
  const options = {
    headers: {
      authorization: "Bearer " + getCookie("access"),
      "Content-Type": "application/json",
    },
  };
  return (dispatch) => {
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

export const patchProfileInfo: ThunkFunc = (
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
  return (dispatch) => {
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

export const USER_LOG_ACTION = (payload: boolean): IUSER_LOG_ACTION => ({
  type: USER_LOG,
  payload: payload,
});

export const USER_LOGOUT_ACTION = (payload: boolean): IUSER_LOGOUT_ACTION => ({
  type: USER_LOGOUT,
  payload: payload,
});

export const userLogin: ThunkFunc = (user: TLogin) => {
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
  return (dispatch) => {
    request(loginUrl, options)
      .then((data) => {
        const { success, refreshToken, accessToken } = data;
        if (success) {
          dispatch(USER_LOG_ACTION(success));
          setCookie("access", accessToken.split("Bearer ")[1]);
          setCookie("refresh", refreshToken);
          sessionStorage.setItem("login-data", JSON.stringify(data));
        }
      })
      .catch((er) => console.log(er));
  };
};

export const userLogout: ThunkFunc = () => {
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
  return (dispatch) => {
    request(logoutUrl, options)
      .then((data) => {
        const { success } = data;
        if (success) {
          dispatch(USER_LOGOUT_ACTION(success));
          sessionStorage.removeItem("login-data");
          delCookie("access");
          delCookie("refresh");
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

const USER_REG_ACTION = (payload: TPayloadRegister): IUSER_REG_ACTION => ({
  type: USER_REG,
  payload: payload,
});

export const userReg: ThunkFunc = (user: TRegister) => {
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
  return (dispatch) => {
    request(regUrl, options)
      .then((res) => {
        dispatch(USER_REG_ACTION(res));
      })
      .catch((er) => console.log(er));
  };
};

//forgotPass

export const GET_PASS = "GET_PASS";

interface IGET_PASS_ACTION {
  readonly type: typeof GET_PASS;
  readonly payload: boolean;
}

export const GET_PASS_ACTION = (payload: boolean): IGET_PASS_ACTION => ({
  type: GET_PASS,
  payload: payload,
});

export const getForgotPass: ThunkFunc = () => {
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
  return (dispatch) => {
    request(passUrl, options)
      .then(({ success }) => {
        dispatch(GET_PASS_ACTION(success));
      })
      .catch((er) => console.log(er));
  };
};

//reset password

export const RESET_PASS = "RESET_PASS";

interface IRESET_PASS_ACTION {
  type: typeof RESET_PASS;
  payload: boolean;
}

const RESET_PASS_ACTION = (payload: boolean): IRESET_PASS_ACTION => ({
  type: RESET_PASS,
  payload: payload,
});

export const resetPassAction: ThunkFunc = () => {
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
  return (dispatch) => {
    request(resetUrl, options)
      .then(({ success }) => {
        dispatch(RESET_PASS_ACTION(success));
      })
      .catch((er) => console.log(er));
  };
};

export type TUnionActions =
  | IGET_INFO_ACTION
  | IPATCH_INFO_ACTION
  | IUSER_LOG_ACTION
  | IUSER_LOGOUT_ACTION
  | IUSER_REG_ACTION
  | IGET_PASS_ACTION
  | IRESET_PASS_ACTION
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
  | IGET_ORDER_DONE_ACTION
  | TUnionWsActions
  | TUnionWsProfileActions;

//ws

export type TUnionWsActions =
  | IWS_START_ACTION
  | IWS_SUCCESS_ACTION
  | IWS_ERR_ACTION
  | IWS_ORDER_ACTION
  | IWS_STOP_ACTION;

export const WS_START = "WS_START";

interface IWS_START_ACTION {
  readonly type: typeof WS_START;
}

export const WS_START_ACTION = (): IWS_START_ACTION => {
  return {
    type: WS_START,
  };
};

export const WS_SUCCESS = "WS_SUCCESS";

interface IWS_SUCCESS_ACTION {
  readonly type: typeof WS_SUCCESS;
}

export const WS_SUCCESS_ACTION = (): IWS_SUCCESS_ACTION => {
  return {
    type: WS_SUCCESS,
  };
};

export const WS_ERR = "WS_ERR";

interface IWS_ERR_ACTION {
  readonly type: typeof WS_ERR;
}

export const WS_ERR_ACTION = (): IWS_ERR_ACTION => {
  return {
    type: WS_ERR,
  };
};

export const WS_STOP = "WS_STOP";

interface IWS_STOP_ACTION {
  readonly type: typeof WS_STOP;
}

export const WS_STOP_ACTION = (): IWS_STOP_ACTION => {
  return {
    type: WS_STOP,
  };
};

export const WS_ORDER = "WS_ORDER";

type TWS_ORDER = {
  success: boolean;
  total: number;
  totalToday: number;
  orders: Array<TOrderComponents>;
};

interface IWS_ORDER_ACTION {
  readonly type: typeof WS_ORDER;
  readonly payload: TWS_ORDER;
  // {
  //   success: boolean,
  //   total: number,
  //   totalAll: number,
  //   order: Array<TOrderComponents>
  // }
}

export const WS_ORDER_ACTION = (payload: TWS_ORDER): IWS_ORDER_ACTION => {
  return {
    type: WS_ORDER,
    payload: payload,
  };
};

export const wsActions: IWS_ACTIONS = {
  wsInit: WS_START,
  onOpen: WS_SUCCESS,
  onError: WS_ERR,
  onOrders: WS_ORDER,
  onClose: WS_STOP,
};

export interface IWS_ACTIONS {
  readonly wsInit: typeof WS_START;
  readonly onOpen: typeof WS_SUCCESS;
  readonly onError: typeof WS_ERR;
  readonly onOrders: typeof WS_ORDER;
  readonly onClose: typeof WS_STOP;
}

///////////////wsProfile

export type TUnionWsProfileActions =
  | IWS_START_PROFILE_ACTION
  | IWS_SUCCESS_PROFILE_ACTION
  | IWS_ERR_PROFILE_ACTION
  | IWS_ORDER_PROFILE_ACTION
  | IWS_STOP_PROFILE_ACTION;

export const WS_START_PROFILE = "WS_START_PROFILE";

interface IWS_START_PROFILE_ACTION {
  readonly type: typeof WS_START_PROFILE;
  readonly payload: string | undefined;
}

export const WS_START_PROFILE_ACTION = (
  payload: string | undefined
): IWS_START_PROFILE_ACTION => {
  return {
    type: WS_START_PROFILE,
    payload: payload,
  };
};

export const WS_SUCCESS_PROFILE = "WS_SUCCESS_PROFILE";

interface IWS_SUCCESS_PROFILE_ACTION {
  readonly type: typeof WS_SUCCESS_PROFILE;
}

export const WS_SUCCESS_PROFILE_ACTION = (): IWS_SUCCESS_PROFILE_ACTION => {
  return {
    type: WS_SUCCESS_PROFILE,
  };
};

export const WS_ERR_PROFILE = "WS_ERR_PROFILE";

interface IWS_ERR_PROFILE_ACTION {
  readonly type: typeof WS_ERR_PROFILE;
}

export const WS_ERR_PROFILE_ACTION = (): IWS_ERR_PROFILE_ACTION => {
  return {
    type: WS_ERR_PROFILE,
  };
};

export const WS_STOP_PROFILE = "WS_STOP_PROFILE";

interface IWS_STOP_PROFILE_ACTION {
  readonly type: typeof WS_STOP_PROFILE;
}

export const WS_STOP_PROFILE_ACTION = (): IWS_STOP_PROFILE_ACTION => {
  return {
    type: WS_STOP_PROFILE,
  };
};

export const WS_ORDER_PROFILE = "WS_ORDER_PROFILE";

type TWS_ORDER_PROFILE = {
  success: boolean;
  orders: Array<TOrderComponents>;
};

interface IWS_ORDER_PROFILE_ACTION {
  readonly type: typeof WS_ORDER_PROFILE;
  readonly payload: TWS_ORDER_PROFILE;
}

export const WS_ORDER_PROFILE_ACTION = (
  payload: TWS_ORDER_PROFILE
): IWS_ORDER_PROFILE_ACTION => {
  return {
    type: WS_ORDER_PROFILE,
    payload: payload,
  };
};

export const wsProfileActions: IWS_PROFILE_ACTIONS = {
  wsInit: WS_START_PROFILE,
  onOpen: WS_SUCCESS_PROFILE,
  onError: WS_ERR_PROFILE,
  onOrders: WS_ORDER_PROFILE,
  onClose: WS_STOP_PROFILE,
};

export interface IWS_PROFILE_ACTIONS {
  readonly wsInit: typeof WS_START_PROFILE;
  readonly onOpen: typeof WS_SUCCESS_PROFILE;
  readonly onError: typeof WS_ERR_PROFILE;
  readonly onOrders: typeof WS_ORDER_PROFILE;
  readonly onClose: typeof WS_STOP_PROFILE;
}

export type TMiddlewareActions = IWS_PROFILE_ACTIONS | IWS_ACTIONS;
