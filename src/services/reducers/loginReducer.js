import { USER_LOG, USER_LOGOUT } from "../actions/route-actions";

const userState = {
  login: null,
  logout: false,
  user: {},
};

export const loginReducer = (state = userState, action) => {
  switch (action.type) {
    case USER_LOG: {
      return {
        ...state,
        login: action.payload.success,
        logout: !action.payload.success,
        user: action.payload.user,
      };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        login: !action.payload.success,
        logout: action.payload.success,
        user: action.payload.user,
      };
    }
    default: {
      return state;
    }
  }
};
