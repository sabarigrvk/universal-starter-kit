import { combineReducers } from "redux";
import userReducer from "./users/reducers";
export default combineReducers({
  users: userReducer,
});
