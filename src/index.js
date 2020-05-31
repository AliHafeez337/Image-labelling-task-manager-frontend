/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import Login from "./views/Login/login.js";
import SingUp from "./views/SingUp/singup.js";

import 'jquery/src/jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "assets/css/material-dashboard-react.css?v=1.8.0";

import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Local imports
import reducer from './store/reducer';

const store = createStore(reducer);
const hist = createBrowserHistory();

const getToken  = () => {
  return localStorage.getItem('token') === null
}

ReactDOM.render(
  <Provider store = { store }>
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin} />
        {getToken() ? <Route path="/login" component={Login} /> : <Redirect to="/admin/dashboard" />}
        {getToken() ? <Route path="/signup" component={SingUp} /> : <Redirect to="/admin/dashboard" />}
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
