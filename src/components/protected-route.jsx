import { Route, Redirect, useLocation } from "react-router-dom";
import { useContext, createContext } from "react";
import { useSelector } from "react-redux";

// import { useEffect, useState } from "react";

// const AuthContext = createContext(undefined);

// export function useAuth() {
//   return useContext(AuthContext);
// }

export function ProtectedRoute({ children }) {
  // let { getUser, ...auth } = useAuth();
  // const [isUserLoaded, setUserLoaded] = useState(false);

  // const init = async () => {
  //   await getUser();
  //   setUserLoaded(true);
  // };

  // useEffect(() => {
  //   init();
  // }, []);

  // if (!isUserLoaded) {
  //   return null;
  // }

  // return auth.user ? element : <Redirect to="/login" replace />;
  const login = useSelector((state) => state.loginReducer.login);

  return (
    <Route render={() => (login ? children : <Redirect to="/login" />)}>
      {}
    </Route>
  );
}
