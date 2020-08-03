import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route, Redirect } from "react-router-dom";
import ReactGA from 'react-ga';
import * as loginActions from "../src/redux/actions/login.action";
import { useSelector } from "react-redux";
import "./assets/css/index.css";

// Fas Icons Import
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBars, faDragon, faStreetView, faHome, faShieldAlt } from '@fortawesome/free-solid-svg-icons'

// Pages 
import LandingPage from './pages/LandingPage';
import Register from "./pages/auth/RegisterPage";
import Login from "./pages/auth/LoginPage";
import PasswordForgotPage from './pages/auth/password/PasswordForgotPage';
import PasswordResetPage from './pages/auth/password/PasswordResetPage';

// App
import HomePage from './pages/app/HomePage';
import Profile from "./pages/app/ProfilePage";
import ProfilePage from "./pages/app/profile/ProfilePage";
// CRUD template
import CRUDPage_create from './pages/app/CRUDPage/CRUD_create';
import CRUDPage_index from './pages/app/CRUDPage/CRUD_index';
import CRUDPage_update from './pages/app/CRUDPage/CRUD_update';

// Start Icons
library.add(fab, faBars, faDragon, faStreetView, faHome, faShieldAlt)

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const App = () => {
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
        <Switch>
          <Route exact path="/" component={LandingPage}/>

          {/* Auth Pages */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/login/:notify?" component={Login} />
          <Route exact path="/password-reset/:token" component={PasswordResetPage} />
          <Route exact path="/password/forgot" component={PasswordForgotPage} />

          {/* User Pages */}
          <SecuredRoute exact path="/profile" component={ProfilePage} />
          <SecuredRoute exact path="/profile/update" component={Profile} />
          <SecuredRoute exact path="/home" component={HomePage} />

          {/* Crud Pages */}
          <SecuredRoute exact path="/crud/update/:id" component={CRUDPage_update} />
          <SecuredRoute exact path="/crud/new" component={CRUDPage_create} />
          <SecuredRoute exact path="/crud/" component={CRUDPage_index} />
        </Switch>
  );
}

export default App;