import { ADD_DETAILS, DEL_DETAILS, TIngredient } from "../actions";
import { TUnionActions } from "../actions/route-actions";

type TDetailState = {
  ingDetails:
    | {
        image_large?: string;
        name?: string;
        calories?: number;
        proteins?: number;
        fat?: number;
        carbohydrates?: number;
      }
    | TIngredient;
};

export const detailState: TDetailState = {
  ingDetails: {},
};

export const detailReducer = (
  state = detailState,
  action: TUnionActions
): TDetailState => {
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
        ingDetails: {},
      };
    }
    default: {
      return state;
    }
  }
};
