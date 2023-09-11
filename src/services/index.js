import { combineReducers, createStore } from "redux";

import { ingredientReducer } from "./reducers/ingredientsReducer";
import { scrollReducer } from "./reducers/scrollReduser";
import { detailReducer } from "./reducers/detailsReducer";
import { constructorReducer } from "./reducers/construcoReducer";
import { orderReducer } from "./reducers/orderReducer";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { forgotpassReducer } from "./reducers/forgotpassReducer";
import { loginReducer } from "./reducers/loginReducer";
import { profileReducer } from "./reducers/profileReducers";
import { registrationReducer } from "./reducers/registrationReducer";

const rootReducer = combineReducers({
  ingredientReducer,
  scrollReducer,
  detailReducer,
  constructorReducer,
  orderReducer,
  forgotpassReducer,
  loginReducer,
  profileReducer,
  registrationReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
