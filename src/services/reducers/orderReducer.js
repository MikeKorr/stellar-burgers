import { GET_ORDER_REQUEST, GET_ORDER_DONE, GET_ORDER_ERR } from "../actions";

const orderState = {
  id: "",
  orderErr: false,
  orderRequest: false,
};

export const orderReducer = (state = orderState, action) => {
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
    case GET_ORDER_ERR: {
      return {
        ...state,
        orderRequest: false,
        orderErr: true,
      };
    }
    default: {
      return state;
    }
  }
};
