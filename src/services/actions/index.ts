import { request } from "../../utils/api";
import { baseUrl } from "../../utils/api";
import { checkResponse } from "../../utils/api";

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  id?: string;
};

export const SET_INGREDIENTS = "SET_INGREDIENTS";

export interface ISET_INGREDIENTS_ACTION {
  readonly type: typeof SET_INGREDIENTS;
  readonly payload: Array<TIngredient>;
}

export const SET_INGREDIENTS_ACTION = (
  payload: Array<TIngredient>
): ISET_INGREDIENTS_ACTION => {
  return {
    type: SET_INGREDIENTS,
    payload: payload,
  };
};

export type TIngAction = ISET_INGREDIENTS_ACTION;

//items

export const SET_ITEM = "SET_ITEM";

export interface ISET_ITEM_ACTION {
  readonly type: typeof SET_ITEM;
  readonly payload: TIngredient;
}

export const SET_ITEM_ACTION = (payload: TIngredient): ISET_ITEM_ACTION => {
  return {
    type: SET_ITEM,
    payload: payload,
  };
};

// TAB
export const SET_TAB = "SET_TAB";

export interface ISET_TAB_ACTION {
  readonly type: typeof SET_TAB;
  readonly payload: string;
}

export const SET_TAB_ACTION = (item: string): ISET_TAB_ACTION => ({
  type: SET_TAB,
  payload: item,
});

//SCROLL
export const SCROLL_ING = "SCROLL_ING";

export interface ISCROLL_ING_ACTION {
  readonly type: typeof SCROLL_ING;
  readonly payload: string;
}

export const SCROLL_ING_ACTION = (item: string): ISCROLL_ING_ACTION => ({
  type: SCROLL_ING,
  payload: item,
});

// export const GET_ING_REQUEST = "GET_ING_REQUEST";
// export const GET_ING_ERR = "GET_ING_ERR";
// export const GET_ING_DONE = "GET_ING_DONE";

// export function getIngs() {}

//BURGER CONSTRUCTOR
export const SET_BUN = "SET_BUN";

export interface ISET_BUN_ACTION {
  readonly type: typeof SET_BUN;
  readonly payload: TIngredient;
}

export const SET_BUN_ACTION = (bun: TIngredient): ISET_BUN_ACTION => ({
  type: SET_BUN,
  payload: bun,
});

export const ADD_ING = "ADD_ING";

export interface IADD_ING_ACTION {
  readonly type: typeof ADD_ING;
  readonly payload: TIngredient;
}

export const ADD_ING_ACTION = (ingredient: TIngredient): IADD_ING_ACTION => ({
  type: ADD_ING,
  payload: ingredient,
});

export const DEL_ING = "DEL_ING";

export interface IDEL_ING_ACTION {
  readonly type: typeof DEL_ING;
  readonly payload: TIngredient;
}

export const DEL_ING_ACTION = (item: TIngredient): IDEL_ING_ACTION => ({
  type: DEL_ING,
  payload: item,
});

export const DND_ING = "DND_ING";

export interface IDND_ING_ACTION {
  readonly type: typeof DND_ING;
  readonly payload: {
    drag: number;
    drop: number;
  };
}

export const DND_ING_ACTION = (
  drag: number,
  drop: number
): IDND_ING_ACTION => ({
  type: DND_ING,
  payload: { drag, drop },
});

export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";

export interface ICLEAR_CONSTRUCTOR_ACTION {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export const CLEAR_CONSTRUCTOR_ACTION = (): ICLEAR_CONSTRUCTOR_ACTION => ({
  type: CLEAR_CONSTRUCTOR,
});

//DETAILS
export const ADD_DETAILS = "ADD_DETAILS";

export interface IADD_DETAILS_ACTION {
  readonly type: typeof ADD_DETAILS;
  readonly payload: TIngredient;
}

export const ADD_DETAILS_ACTION = (
  ingredient: TIngredient
): IADD_DETAILS_ACTION => ({
  type: ADD_DETAILS,
  payload: ingredient,
});

export const DEL_DETAILS = "DEL_DETAILS";

export interface IDEL_DETAILS_ACTION {
  readonly type: typeof DEL_DETAILS;
}

export const DEL_DETAILS_ACTION = (): IDEL_DETAILS_ACTION => ({
  type: DEL_DETAILS,
});

//ORDERS

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";

export interface IGET_ORDER_REQUEST_ACTION {
  readonly type: typeof GET_ORDER_REQUEST;
}

export const GET_ORDER_DONE = "GET_ORDER_DONE";

export interface IGET_ORDER_DONE_ACTION {
  readonly type: typeof GET_ORDER_DONE;
  readonly payload: string;
}

export const GET_ORDER_DONE_ACTION = (id: string): IGET_ORDER_DONE_ACTION => ({
  type: GET_ORDER_DONE,
  payload: id,
});

export const GET_ORDER_REQUEST_ACTION = (): IGET_ORDER_REQUEST_ACTION => ({
  type: GET_ORDER_REQUEST,
});

export const getOrder = (id: string[]) => {
  const orderUrl = `${baseUrl}/orders`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: id,
    }),
  };
  return (dispatch: any) => {
    request(orderUrl, options)
      .then(({ success, order: { number } }) => {
        if (success) {
          dispatch(GET_ORDER_DONE_ACTION(number));
        }
      })
      .then(() => dispatch(CLEAR_CONSTRUCTOR_ACTION()))
      .catch((e) => console.log(e));
  };
};

export const getIngElements = () => {
  return (dispatch: any) => {
    return fetch(baseUrl + "/ingredients")
      .then(checkResponse)
      .then((data) => {
        dispatch(SET_INGREDIENTS_ACTION(data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
