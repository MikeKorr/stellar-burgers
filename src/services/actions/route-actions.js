import { baseUrl, checkResponse } from "../../utils/api";
import { getCookie, setCookie } from "../../utils/cookies";

const request = async (url, options) => {
  const res = await fetch(url, options);
  return checkResponse(res);
};

export const GET_PROFILE_INFO = "GET_PROFILE_INFO";
export const PATCH_PROFILE_INFO = "PATCH_PROFILE_INFO";

const GET_INFO_ACTION = (payload) => ({
  type: GET_PROFILE_INFO,
  payload,
});

const PATCH_INFO_ACTION = (payload) => ({
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

export const patchProfileInfo = (name, email, password) => {
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

const USER_LOG_ACTION = (payload) => ({
  type: USER_LOG,
  payload: payload,
});

const USER_LOGOUT_ACTION = (payload) => ({
  type: USER_LOGOUT,
  payload: payload,
});

export const userLogin = (user) => {
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
  return (dispatch) => {
    request(logoutUrl, options)
      .then((data) => {
        const { success } = data;
        if (success) {
          dispatch(USER_LOGOUT_ACTION(data));
        }
      })
      .catch((er) => console.log(er));
  };
};

//registration
export const USER_REG = "USER_REG";

const USER_REG_ACTION = (payload) => ({
  type: USER_REG,
  payload: payload,
});

export const userReg = (user) => {
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
const GET_PASS_ACTION = (payload) => ({
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
const RESET_PASS_ACTION = (payload) => ({
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
  return (dispatch) => {
    request(resetUrl, options)
      .then(({ success }) => {
        dispatch(RESET_PASS_ACTION(success));
      })
      .catch((er) => console.log(er));
  };
};
