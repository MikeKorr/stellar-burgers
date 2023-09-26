import { GET_PASS } from "../actions/route-actions";

const forgotpassState = {
  success: false,
};

export const forgotpassReducer = (state = forgotpassState, action) => {
  switch (action.type) {
    case GET_PASS: {
      return {
        ...state,
        success: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
