import "assets/scss/argon-design-system-react.scss?v1.1.0";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/vendor/nucleo/css/nucleo.css";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import Clusters from "components/pages/Clusters";
import Theme from "components/pages/Theme";
import Tracing from "components/pages/Tracing";
import { StoreProvider, ThemeProvider } from "context";
import React from "react";
import ReactDOM from "react-dom";
import { ReactQueryDevtools } from "react-query-devtools";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryDevtools initialIsOpen={false} />
    <StoreProvider>
      <ThemeProvider>
        <BrowserRouter>
          <QueryParamProvider ReactRouterRoute={Route}>
            <Header />

            <Switch>
              <Route path="/" exact component={App} />
              <Route path="/tracing" exact component={Tracing} />
              <Route path="/clusters" exact component={Clusters} />
              <Route path="/theme" exact component={Theme} />
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
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
