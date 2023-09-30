import {
  SET_BUN,
  ADD_ING,
  CLEAR_CONSTRUCTOR,
  DND_ING,
  DEL_ING,
} from "../actions";

import { TIngredient } from "../actions";
import { TUnionActions } from "../actions/route-actions";

type TConstructorState = {
  buns: Array<TIngredient>;
  mains: Array<TIngredient>;
};

const constructorState: TConstructorState = {
  buns: [],
  mains: [],
};

export const constructorReducer = (
  state = constructorState,
  action: TUnionActions
): TConstructorState => {
  switch (action.type) {
    case SET_BUN: {
      return {
        ...state,
        buns: state.buns.find((item) => item._id === action.payload._id)
          ? [...state.buns]
          : [action.payload],
      };
    }
    case ADD_ING: {
      return {
        ...state,
        mains: [...state.mains, action.payload],
      };
    }
    case DEL_ING: {
      return {
        ...state,
        mains: state.mains.filter((item) => item.id !== action.payload.id),
      };
    }
    case DND_ING: {
      let result = [];
      const { drag, drop } = action.payload;
      if (drag === drop) {
        return state;
      } else if (drag > drop) {
        result = [
          ...state.mains.slice(0, drop),
          state.mains[drag],
          ...state.mains.slice(drop, drag),
          ...state.mains.slice(drag + 1),
        ];
      } else {
        result = [
          ...state.mains.slice(0, drag),
          ...state.mains.slice(drag + 1, drop + 1),
          state.mains[drag],
          ...state.mains.slice(drop + 1),
        ];
      }
      return {
        ...state,
        mains: result,
      };
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        mains: [],
        buns: [],
      };
    }
    default: {
      return state;
    }
  }
};
