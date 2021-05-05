import { matchPath } from "react-router-dom";
import Routes from "shared/Routes";

export default (req, res, next) => {
  const store = res.locals.store;
  const matches = Routes.map((route) => {
    const match = matchPath(req.path, route.path, route);
    // We then look for static getInitialData function on each top level component
    const { component } = route;
    if (match) {
      if (!match.isExact && route.exact) {
        return null;
      }

      const obj = {
        route,
        match,
        promise: component.load
          ? component
              .load()
              .then(() =>
                component.getInitialData
                  ? component.getInitialData(store)
                  : Promise.resolve(null)
              )
          : component.getInitialData
          ? component.getInitialData(store)
          : Promise.resolve(null),
      };
      return obj;
    }
    return null;
  });

  const promises = matches.map((match) => (match ? match.promise : null));

  res.locals.serverPromises = promises;
  next();
};
