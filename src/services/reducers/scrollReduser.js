import { SET_TAB, SCROLL_ING } from "../actions";

const scroll = {
  current: "",
  scroll: "",
};

export const scrollReducer = (state = scroll, action) => {
  switch (action.type) {
    case SET_TAB: {
      return {
        ...state,
        current: action.payload,
      };
    }
    case SCROLL_ING: {
      return {
        ...state,
        scroll: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
