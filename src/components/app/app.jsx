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
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { ProtectedRoute } from "../protected-route";
import { LoginPage } from "../../pages/LoginPage";
import { RegistrationPage } from "../../pages/RegistrationPage";
import { ForgotPass } from "../../pages/ForgotPass";
import { ResetPassPage } from "../../pages/ResetPassPage";
import { IngredientList } from "../Ingredient/Ingredient";
import { IngPage } from "../../pages/IngPage";
import { PageNotFound } from "../../pages/404page";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [itemModal, setItemModal] = useState("");

  function changeModal(mod) {
    setItemModal(mod);
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  }

  useEffect(() => {
    dispatch(getIngElements());
  }, [dispatch]);
  // const login = useSelector((state) => state.profileReducer.login) ||
  //   JSON.parse(sessionStorage.getItem("login"));
  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Switch location={background || location}>
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
        <ProtectedRoute exact={true} path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <AppMain setIsModalOpen={setIsModalOpen} changeModal={changeModal} />
        </Route>
        <Route path="/ingredients/:id" exact={true}>
          <IngPage />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen}>
          {itemModal === "Order" ? <OrderDetails /> : <IngredientsDetails />}
        </Modal>
      )}
    </div>
  );
}

export default App;
