import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Clusters from "components/pages/Clusters";
import Tracing from "components/pages/Tracing";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "components/layout/Header";
import Footer from "components/layout/Footer";
import { StoreProvider } from "context";
import { QueryParamProvider } from "use-query-params";
import { ReactQueryDevtools } from "react-query-devtools";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryDevtools initialIsOpen={false} />
    <StoreProvider>
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Header />
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/tracing" exact component={Tracing} />
            <Route path="/clusters" exact component={Clusters} />
            {/*<Route path="/login-page" exact render={props => <Login {...props} />} />
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
        </QueryParamProvider>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
