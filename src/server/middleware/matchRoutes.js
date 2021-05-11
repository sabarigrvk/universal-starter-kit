import { matchPath } from "react-router-dom";
import Routes from "shared/Routes";

export const getDisplayName = (WrappedComponent) => {
  return (
    (WrappedComponent &&
      (WrappedComponent.displayName || WrappedComponent.name)) ||
    "Component"
  );
};

export default (req, res, next) => {
  const store = res.locals.store;

  const { component: loadableComponent } = Routes.find((route) => {
    return matchPath(req.path, route);
  });

  // if async loadable component
  if (loadableComponent.load) {
    loadableComponent.load().then(({ default: comp }) => {
      res.locals.serverPromises = comp.getInitialData
        ? comp.getInitialData(store)
        : Promise.resolve(null);
      next();
    });
  } else {
    res.locals.serverPromises = loadableComponent.getInitialData
      ? loadableComponent.getInitialData(store)
      : Promise.resolve(null);
    next();
  }
};
