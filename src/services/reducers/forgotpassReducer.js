import { GET_PASS } from "../actions/route-actions";

const forgotpassState = {
  email: "",
};

export const forgotpassReducer = (state = forgotpassState, action) => {
  switch (action.type) {
    case GET_PASS: {
      return {
        ...state,
        email: action.payload.email,
      };
    }
    default: {
      return state;
    }
  }
};
