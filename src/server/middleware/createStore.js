import { configureStore } from "shared/store";

const createStore = (req, res, next) => {
  res.locals.store = configureStore({});
  next();
};
export default createStore;
