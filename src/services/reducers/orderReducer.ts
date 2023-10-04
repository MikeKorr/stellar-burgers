import { GET_ORDER_DONE } from "../actions";
import { TUnionActions } from "../actions/route-actions";

type TOrderState = {
  id: string;
};

export const orderState: TOrderState = {
  id: "",
};

export const orderReducer = (
  state = orderState,
  action: TUnionActions
): TOrderState => {
  switch (action.type) {
    case GET_ORDER_DONE: {
      return {
        ...state,

        id: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
