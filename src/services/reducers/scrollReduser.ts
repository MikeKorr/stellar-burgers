import { SET_TAB, SCROLL_ING } from "../actions";
import { TUnionActions } from "../actions/route-actions";

type TScroll = {
  current: string;
  scroll: string;
};

export const scrollState: TScroll = {
  current: "",
  scroll: "",
};

export const scrollReducer = (
  state = scrollState,
  action: TUnionActions
): TScroll => {
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
