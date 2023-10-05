import { Route, Redirect, RouteProps, useLocation } from "react-router-dom";
import { FC } from "react";

import { useAppSelector } from "../services/hooks/hooks";
type TRProtectedRoute = RouteProps;

export const ProtectedRoute: FC<TRProtectedRoute> = ({ children }) => {
  const login = useAppSelector((state) => state.loginReducer.login);
  const location = useLocation();
  return (
    <Route>
      {login
        ? children
        : (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          ) || <Redirect to={{ pathname: "/", state: { from: location } }} />}
    </Route>
  );
};
