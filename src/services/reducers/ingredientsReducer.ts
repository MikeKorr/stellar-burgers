import { SET_INGREDIENTS, SET_ITEM, TIngredient } from "../actions";
import { TUnionActions } from "../actions/route-actions";

type TInitialState = {
  ingredient: Array<TIngredient> | [];
  item:
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

const initialState: TInitialState = {
  ingredient: [],
  item: {},
};

export const ingredientReducer = (
  state = initialState,
  action: TUnionActions
): TInitialState => {
  switch (action.type) {
    case SET_INGREDIENTS:
      return { ...state, ingredient: [...action.payload] };
    case SET_ITEM:
      return {
        ...state,
        item: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
