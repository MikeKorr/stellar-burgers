import { USER_LOG, USER_LOGOUT, TUnionActions } from "../actions/route-actions";

type TUserState = {
  login: boolean;
  logout: boolean;
};

export const userState = {
  login: false,
  logout: false,
};

export const loginReducer = (
  state = userState,
  action: TUnionActions
): TUserState => {
  switch (action.type) {
    case USER_LOG: {
      console.log(action.payload, "пэй");
      return {
        ...state,
        login: action.payload,
        logout: !action.payload,
      };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        login: !action.payload,
        logout: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
