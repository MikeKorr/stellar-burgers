import { SET_INGREDIENTS, SET_ITEM } from "../actions";

const initialState = {
  ingredient: [],
  item: {},
};

export const ingredientReducer = (state = initialState, action) => {
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
