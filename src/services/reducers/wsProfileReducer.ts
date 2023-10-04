import {
  TUnionWsProfileActions,
  WS_ERR_PROFILE,
  WS_ORDER_PROFILE,
  WS_STOP_PROFILE,
  WS_SUCCESS_PROFILE,
} from "../actions/route-actions";
import { TOrderComponents } from "../types/types";

type TWsProfileState = {
  success: boolean;
  orders: Array<TOrderComponents> | [];
};

const wsProfileState: TWsProfileState = {
  success: false,
  orders: [],
};

export const wsProfileReducer = (
  state = wsProfileState,
  action: TUnionWsProfileActions
): TWsProfileState => {
  switch (action.type) {
    case WS_SUCCESS_PROFILE: {
      return {
        ...state,
        success: true,
      };
    }
    case WS_ERR_PROFILE: {
      return {
        ...state,
        success: false,
      };
    }
    case WS_STOP_PROFILE: {
      return {
        ...state,
        success: false,
        orders: [],
      };
    }
    case WS_ORDER_PROFILE: {
      // debugger;
      return {
        ...state,
        orders: action.payload.orders,
      };
    }

    default:
      return state;
  }
};
