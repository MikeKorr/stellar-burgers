import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import { AppMain } from "../AppMain/AppMain";
import { useEffect, useState } from "react";
import { Modal } from "../Modal/Modal";
import { IngredientsDetails } from "../IngredientsDetails/IngredientsDetails";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
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

const App: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [itemModal, setItemModal] = useState("");
  const history = useHistory();

  const closePopup = () => {
    setIsModalOpen(false);
    history.push("/");
  };

  useEffect(() => {
    dispatch(getIngElements());
    const loginData = JSON.parse(sessionStorage.getItem("login-data") || "{}");
    if (loginData.success) dispatch(USER_LOG_ACTION(loginData.success));
  }, [dispatch]);

  const location = useLocation<TLocation>();
  const background = location.state && location.state.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <AppMain setIsModalOpen={setIsModalOpen} />
        </Route>
        {/* <Route path="/ingredients/:id" exact>
          <IngPage />
        </Route> */}
        <Route path="/feed" exact={true}>
          <FeedPage />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <Modal closePopup={closePopup}>
            <CardDetails />
          </Modal>
        </Route>
        <Route path="/profile/orders/:id" exact={true}>
          <Modal closePopup={closePopup}>
            <CardProfileDetails />
          </Modal>
        </Route>
        <Route path="/ingredients/:id">
          <Modal closePopup={closePopup}>
            <IngredientsDetails />
          </Modal>
        </Route>
        <Route path="/order">
          <Modal closePopup={closePopup}>
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
      {/* 
      {background && (
        <Switch>
          <Route path="/ingredients/:id">
            <Modal closePopup={closePopup}>
              <IngredientsDetails />
            </Modal>
          </Route>

          <Route path="/">
            <Modal closePopup={closePopup}>
              <OrderDetails />
            </Modal>
          </Route>
        </Switch>
      )} */}
    </div>
  );
};

export default App;
