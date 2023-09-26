import { RESET_PASS } from "../actions/route-actions";

const resetState = {
  success: false,
};

export const resetReducer = (state = resetState, action) => {
  switch (action.type) {
    case RESET_PASS: {
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
