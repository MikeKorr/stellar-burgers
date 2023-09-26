import { USER_REG } from "../actions/route-actions";

const regState = {
  success: false,
  user: {},
};

export const registrationReducer = (state = regState, action) => {
  switch (action.type) {
    case USER_REG: {
      return {
        ...state,
        success: action.payload.success,
        user: action.payload.user,
      };
    }
    default: {
      return state;
    }
  }
};
