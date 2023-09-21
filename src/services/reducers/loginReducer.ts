import { USER_LOG, USER_LOGOUT, TUnionActions } from "../actions/route-actions";

type TUserState = {
  login: boolean;
  logout: boolean;
  // user: object,
};

const userState = {
  login: false,
  logout: false,
  // user: {},
};

export const loginReducer = (
  state = userState,
  action: TUnionActions
): TUserState => {
  switch (action.type) {
    case USER_LOG: {
      return {
        ...state,
        login: action.payload,
        logout: !action.payload,
        // user: action.payload,
      };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        login: !action.payload,
        logout: action.payload,
        // user: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
