import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { store, rootReducer } from "..";
import { TUnionActions } from "../actions/route-actions";
import { ActionCreator, Action } from "redux";
import { ThunkAction } from "redux-thunk";

export type AppDispatch = typeof store.dispatch;
export type DispatchHook = () => AppDispatch | ThunkFunc;
export type RootState = ReturnType<typeof rootReducer>;
export type ThunkFunc<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TUnionActions>
>;

export const useAppDispatch: DispatchHook = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
