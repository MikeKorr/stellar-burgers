import { RESET_PASS, TUnionActions } from "../actions/route-actions";

type TResetState = {
  success: boolean;
};

const resetState: TResetState = {
  success: false,
};

export const resetReducer = (
  state = resetState,
  action: TUnionActions
): TResetState => {
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
