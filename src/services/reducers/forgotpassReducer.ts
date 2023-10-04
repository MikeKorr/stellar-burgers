import { GET_PASS, TUnionActions } from "../actions/route-actions";

type TForgotpassState = {
  success: boolean;
};

export const forgotpassState: TForgotpassState = {
  success: false,
};

export const forgotpassReducer = (
  state = forgotpassState,
  action: TUnionActions
): TForgotpassState => {
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
