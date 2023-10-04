import {
  USER_REG,
  TPayloadRegister,
  TUnionActions,
} from "../actions/route-actions";

type TRegState = TPayloadRegister;

export const regState: TRegState = {
  success: false,
  user: {},
};

export const registrationReducer = (
  state = regState,
  action: TUnionActions
): TRegState => {
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
