import { combineReducers, createStore } from "redux";

import { ingredientReducer } from "./reducers/ingredientsReducer";
import { scrollReducer } from "./reducers/scrollReduser";
import { detailReducer } from "./reducers/detailsReducer";
import { constructorReducer } from "./reducers/construcoReducer";
import { orderReducer } from "./reducers/orderReducer";
import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { forgotpassReducer } from "./reducers/forgotpassReducer";
import { loginReducer } from "./reducers/loginReducer";
import { profileReducer } from "./reducers/profileReducers";
import { registrationReducer } from "./reducers/registrationReducer";
import { resetReducer } from "./reducers/resetReducer";
import { wsReducer } from "./reducers/WsReducer";
import { socketMiddleware, wsUrl, ordersUrl } from "../middleware/ws";
import { wsActions, wsProfileActions } from "./actions/route-actions";
import { wsProfileReducer } from "./reducers/wsProfileReducer";

export const rootReducer = combineReducers({
  ingredientReducer,
  scrollReducer,
  detailReducer,
  constructorReducer,
  orderReducer,
  forgotpassReducer,
  loginReducer,
  profileReducer,
  registrationReducer,
  resetReducer,
  wsReducer,
  wsProfileReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(wsUrl, wsActions),
    socketMiddleware(ordersUrl, wsProfileActions)
  )
);

export const store = createStore(rootReducer, enhancer);
