import { GET_ORDER_REQUEST, GET_ORDER_DONE } from "../actions";
import { TUnionActions } from "../actions/route-actions";

type TOrderState = {
  id: string;
  orderErr: boolean;
  orderRequest: boolean;
};

const orderState: TOrderState = {
  id: "",
  orderErr: false,
  orderRequest: false,
};

export const orderReducer = (
  state = orderState,
  action: TUnionActions
): TOrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_DONE: {
      return {
        ...state,
        orderErr: false,
        orderRequest: false,
        id: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
