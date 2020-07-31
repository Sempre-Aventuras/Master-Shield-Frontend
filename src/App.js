import React, { useRef, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';
import * as loginActions from "../src/redux/actions/login.action";
import { useSelector } from "react-redux";
import "./assets/css/index.css";

// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Pages 
import HomePage from './pages/HomePage';
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Profile from "./pages/ProfilePage";
import PasswordForgotPage from './pages/password/PasswordForgotPage';
import PasswordResetPage from './pages/password/PasswordResetPage';
// CRUD template
import CRUDPage_create from './pages/CRUDPage/CRUD_create';
import CRUDPage_index from './pages/CRUDPage/CRUD_index';
import CRUDPage_update from './pages/CRUDPage/CRUD_update';

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useSelector(({ loginReducer }) => loginReducer);
  const SecuredRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        // ternary condition

        loginActions.isLoggedIn() === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={HomePage} layout={LayoutDefault} />

          {/* Auth Pages */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/login/:notify?" component={Login} />
          <Route exact path="/password-reset/:token" component={PasswordResetPage} />
          <Route exact path="/password/forgot" component={PasswordForgotPage} />

          {/* User Pages */}
          <SecuredRoute exact path="/profile" component={Profile} />
          <SecuredRoute exact path="/home" component={HomePage} />

          {/* Crud Pages */}
          <SecuredRoute exact path="/crud/update/:id" component={CRUDPage_update} />
          <SecuredRoute exact path="/crud/new" component={CRUDPage_create} />
          <SecuredRoute exact path="/crud/" component={CRUDPage_index} />
        </Switch>
      )} />
  );
}

export default App;