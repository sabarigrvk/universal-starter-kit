import React from "react";
import { hydrate, render } from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { loadableReady } from "@loadable/component";
import { createBrowserHistory } from "history";
import { configureStore } from "shared/store";
import App from "components/App";

let history = createBrowserHistory();
const store = configureStore({
  initialState: window.__PRELOADED_STATE__,
});

function ClientBootstrap() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
}

function renderer() {
  const renderFunc = module.hot ? render : hydrate;
  renderFunc(<ClientBootstrap />, document.getElementById("app"));
}

if (module.hot) {
  renderer();
  module.hot.accept();
} else {
  loadableReady(renderer);
}
