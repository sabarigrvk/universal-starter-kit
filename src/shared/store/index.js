import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createRootReducer from "./rootReducer";

export const configureStore = ({ initialState }) => {
  const store = createStore(
    createRootReducer,
    initialState,
    applyMiddleware(thunk)
  );

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("./rootReducer", () =>
        store.replaceReducer(require("./rootReducer").default)
      );
    }
  }

  return store;
};
