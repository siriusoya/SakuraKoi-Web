import { combineReducers } from "redux";
import detailReducer from "./detailReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
  product: productReducer,
  detail: detailReducer,
});

export default rootReducer;
