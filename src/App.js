import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import * as loginActions from "./redux/actions/login.action";
import { useSelector } from "react-redux";
import "./assets/css/index.css";

import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Profile from "./pages/ProfilePage";
import PasswordForgotPage from './pages/password/PasswordForgotPage';
import PasswordResetPage from './pages/password/PasswordResetPage';
// CRUD template
import CRUDPage_create from './pages/CRUDPage/CRUD_create';
import CRUDPage_index from './pages/CRUDPage/CRUD_index';
import CRUDPage_update from './pages/CRUDPage/CRUD_update';


const App = (props) => {
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
      <Router>
        <Switch>
          <div>
            {/* LandingPage */}
            <Route exact path="/"  component={Login} />

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
          </div>
        </Switch>
      </Router>
    );

}

export default App;