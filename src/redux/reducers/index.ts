import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { shoppingReducer } from "./shoppingReducer";

const combinedReducers = combineReducers({
  user: userReducer,
  shopping: shoppingReducer,
});

export type ApplicationState = ReturnType<typeof combinedReducers>;

export default combinedReducers;
