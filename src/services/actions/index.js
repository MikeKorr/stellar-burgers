import { reqData } from "../../utils/api";

export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const SET_INGREDIENTS_ACTION = (ingredients) => {
  return {
    type: SET_INGREDIENTS,
    payload: ingredients,
  };
};

export const SET_ITEM = "SET_ITEM";
export const SET_ITEM_ACTION = (item) => {
  return {
    type: SET_ITEM,
    payload: item,
  };
};

export const SET_TAB = "SET_TAB";
export const SET_TAB_ACTION = (item) => ({
  type: SET_TAB,
  payload: item,
});

export const SCROLL_ING = "SCROLL_ING";
export const SCROLL_ING_ACTION = (item) => ({
  type: SCROLL_ING,
  payload: item,
});

export const GET_ING_REQUEST = "GET_ING_REQUEST";
export const GET_ING_ERR = "GET_ING_ERR";
export const GET_ING_DONE = "GET_ING_DONE";

export function getIngs() {}

//BURGER CONSTRUCTOR
export const SET_BUN = "SET_BUN";
export const SET_BUN_ACTION = (bun) => ({
  type: SET_BUN,
  payload: bun,
});

export const ADD_ING = "ADD_ING";
export const ADD_ING_ACTION = (ingredient) => ({
  type: ADD_ING,
  payload: ingredient,
});

export const DEL_ING = "DEL_ING";
export const DEL_ING_ACTION = (item) => ({
  type: DEL_ING,
  payload: item,
});

export const DND_ING = "DND_ING";
export const DND_ING_ACTION = (drag, drop) => ({
  type: DND_ING,
  payload: { drag, drop },
});

export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";
export const CLEAR_CONSTRUCTOR_ACTION = () => ({ type: CLEAR_CONSTRUCTOR });

//DETAILS
export const ADD_DETAILS = "ADD_DETAILS";
export const ADD_DETAILS_ACTION = (ingredient) => ({
  type: ADD_DETAILS,
  payload: ingredient,
});

export const DEL_DETAILS = "DEL_DETAILS";
export const DEL_DETAILS_ACTION = () => ({ type: DEL_DETAILS });

//ORDERS

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_ERR = "GET_ORDER_ERR";
export const GET_ORDER_DONE = "GET_ORDER_DONE";

export const GET_ORDER_DONE_ACTION = (id) => ({
  type: GET_ORDER_DONE,
  payload: id,
});

export const GET_ORDER_REQUEST_ACTION = () => ({
  type: GET_ORDER_REQUEST,
});

export const getOrder = (id) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: id,
    }),
  };
  return (dispatch) => {
    reqData(id, options)
      .then(({ order: { number } }) => {
        dispatch(GET_ORDER_DONE_ACTION(number));
      })
      .then(() => dispatch(CLEAR_CONSTRUCTOR_ACTION()))
      .catch((e) => console.log(e));
  };
};
