import { getCookie } from "../../utils/cookies";
import { USER_LOG, USER_LOGOUT } from "../actions/route-actions";

const userState = {
  login: getCookie("access") ? true : false,
  user: {},
};

export const loginReducer = (state = userState, action) => {
  switch (action.type) {
    case USER_LOG: {
      return {
        ...state,
        login: true,
        user: action.payload.user,
      };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        login: false,
        user: action.payload.user,
      };
    }
    default: {
      return state;
    }
  }
};
