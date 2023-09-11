import { USER_REG } from "../actions/route-actions";

const regState = {
  done: false,
  user: {},
};

export const registrationReducer = (state = regState, action) => {
  switch (action.type) {
    case USER_REG: {
      return {
        ...state,
        done: action.payload.done,
        user: action.payload.user,
      };
    }
    default: {
      return state;
    }
  }
};
