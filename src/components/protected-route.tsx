import { Route, Redirect, RouteProps, useLocation } from "react-router-dom";
import { FC } from "react";
import { useSelector } from "react-redux";
type TRProtectedRoute = RouteProps;

export const ProtectedRoute: FC<TRProtectedRoute> = ({ children }) => {
  const login = useSelector((state: any) => state.loginReducer.login);
  const location = useLocation();
  return (
    <Route>
      {login
        ? children
        : (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          ) || (
            <Redirect
              to={{ pathname: "/profile", state: { from: location } }}
            />
          )}
    </Route>
  );
};
