import React, { Fragment } from "react";
import { Link, Route, Switch } from "react-router-dom";
import routes from "shared/Routes";

function App() {
  return (
    <Fragment>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Switch>
        {routes.map((route, i) => {
          return (
            <Route
              key={i}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          );
        })}
      </Switch>
    </Fragment>
  );
}

export default App;
