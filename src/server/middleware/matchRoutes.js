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

  const getInitialData = (comp) => {
    if (comp.getInitialData) {
      res.locals.serverPromises = comp.getInitialData(store);
      next();
    }
    return null;
  };

  const { component: loadableComponent } = Routes.find((route) => {
    return matchPath(req.path, route);
  });

  // if async loadable component
  if (loadableComponent.load) {
    loadableComponent.load().then((comp) => {
      console.log(
        "this is a lazy loaded component",
        getDisplayName(comp.default || comp)
      );
      getInitialData(comp.default || comp);
    });
  } else {
    // if normal component
    console.log(
      "this is a normal loaded component",
      getDisplayName(loadableComponent)
    );
    getInitialData(loadableComponent);
  }
};
