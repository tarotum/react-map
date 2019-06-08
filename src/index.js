import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import PrivateRoute from "./helpers/PrivateRoute";

// Import style
import "./index.less";

import store from "./store";

import App from "./components/App/App";

// Import pages
import Main from "./pages/Main";
import Auth from "./pages/Auth";
import Autor from "./pages/Autor";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <PrivateRoute exact path="/" component={Main} />
          <Route path="/auth" component={Auth} />
          <Route path="/autor" component={Autor} />
          <Redirect from="*" to="/" />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
