import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import { AppMain } from "../AppMain/AppMain";
import { useEffect, useState } from "react";
import { Modal } from "../Modal/Modal";
import { IngredientsDetails } from "../IngredientsDetails/IngredientsDetails";
import { OrderDetails } from "../OrderDetails/OrderDetails";

import { getIngElements } from "../../services/actions";
import { ProfilePage } from "../../pages/ProfilePage";
import {
  Switch, //устанавливается 5 версия, невозможно поставить 6 и использовать Routes, приходится использовать switch
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";
import { ProtectedRoute } from "../protected-route";
import { LoginPage } from "../../pages/LoginPage";
import { RegistrationPage } from "../../pages/RegistrationPage";
import { ForgotPass } from "../../pages/ForgotPass";
import { ResetPassPage } from "../../pages/ResetPassPage";
import { IngPage } from "../../pages/IngPage";
import { PageNotFound } from "../../pages/404page";
import { USER_LOG_ACTION } from "../../services/actions/route-actions";
import { FC } from "react";
import { TLocation } from "../../services/types/types";
import { FeedPage } from "../../pages/FeedPage";
import { CardDetails } from "../../pages/CardDetails";
import { CardProfileDetails } from "../../pages/CardProfileDetails";
import { useAppDispatch } from "../../services/hooks/hooks";

const App: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngElements());
    const loginData = JSON.parse(sessionStorage.getItem("login-data") || "{}");
    if (loginData.success) dispatch(USER_LOG_ACTION(loginData.success));
  }, [dispatch]);

  const location = useLocation<TLocation>();
  let background = location.state && location.state.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <AppMain setIsModalOpen={setIsModalOpen} />
        </Route>
        <Route path="/ingredients/:id">
          <IngPage />
        </Route>
        <Route path="/feed" exact={true}>
          <FeedPage />
        </Route>
        <Route path="/feed/:id">
          <CardDetails />
        </Route>
        <Route path="/profile/orders/:id">
          <CardProfileDetails />
        </Route>

        <Route path="/order">
          <Modal closePopup={() => setIsModalOpen(false)}>
            <OrderDetails />
          </Modal>
        </Route>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegistrationPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPass />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPassPage />
        </Route>
        <ProtectedRoute path={"/profile"}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>

      {background && (
        <Switch>
          <Route path="/ingredients/:id">
            <Modal closePopup={() => setIsModalOpen(false)}>
              <IngredientsDetails />
            </Modal>
          </Route>
          <Route path="/profile/orders/:id">
            <Modal closePopup={() => setIsModalOpen(false)}>
              <CardProfileDetails />
            </Modal>
          </Route>
          <Route path="/feed/:id">
            <Modal closePopup={() => setIsModalOpen(false)}>
              <CardDetails />
            </Modal>
          </Route>
        </Switch>
      )}
    </div>
  );
};

export default App;
