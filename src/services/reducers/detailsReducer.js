import { ADD_DETAILS, DEL_DETAILS } from "../actions";

export const detailState = {
  ingDetails: null,
};

export const detailReducer = (state = detailState, action) => {
  switch (action.type) {
    case ADD_DETAILS: {
      return {
        ...state,
        ingDetails: action.payload,
      };
    }
    case DEL_DETAILS: {
      return {
        ...state,
        ingDetails: null,
      };
    }
    default: {
      return state;
    }
  }
};
