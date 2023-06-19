import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
  product: productReducer,
  category: categoryReducer,
});

export default rootReducer;
