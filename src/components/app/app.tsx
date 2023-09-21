import styles from "./app.module.css";
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
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

const App: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [itemModal, setItemModal] = useState("");
  const history = useHistory();

  function changeModal(mod: string) {
    setItemModal(mod);
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  }

  const closePopup = () => {
    setIsModalOpen(false);
    history.push("/");
  };

  useEffect(() => {
    dispatch(getIngElements());
    const loginData = JSON.parse(sessionStorage.getItem("login-data") || "{}");
    if (loginData) dispatch(USER_LOG_ACTION(loginData));
  }, [dispatch]);

  type TLocation = {
    background: TLocation;
    hash: string;
    key: string;
    pathname: string;
    search: string;
    from: string;
    state: {
      background?: {
        pathname: string;
        search: string;
        hash: string;
        key: string;
      };
    };
  };

  const location = useLocation<TLocation>();
  const background = location.state && location.state.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <AppMain setIsModalOpen={setIsModalOpen} changeModal={changeModal} />
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
        <Route path="/ingredients/:id">
          {isModalOpen && (
            <Modal closePopup={closePopup}>
              <IngredientsDetails />
            </Modal>
          )}
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
        {/* <Route path="/ingredients/:id">
          {background && (
            <>
              {isModalOpen && (
                <Modal setIsModalOpen={setIsModalOpen}>
                  <IngredientsDetails />
                </Modal>
              )}
            </>
          )}
        </Route> */}
      </Switch>
      {/* {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen}>
          {itemModal === "Order" ? <OrderDetails /> : <IngredientsDetails />}
        </Modal>
      )} */}
      {/* {background && (
        <Switch>
          <Route path="/ingredients/:id">
            {isModalOpen && (
              <Modal closePopup={closePopup}>
                <IngredientsDetails />
              </Modal>
            )}
          </Route>
        </Switch>
      )} */}
    </div>
  );
};

export default App;
