import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "components/Layout/Header";
import Footer from "components/Layout/Footer";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={App} />
        {/*<Route
        path="/landing-page"
        exact
        render={props => <Landing {...props} />}
        />
      <Route path="/login-page" exact render={props => <Login {...props} />} />
      <Route
      path="/profile-page"
      exact
      render={props => <Profile {...props} />}
      />
      <Route
      path="/register-page"
      exact
      render={props => <Register {...props} />}
    />*/}
        <Redirect to="/" />
      </Switch>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
