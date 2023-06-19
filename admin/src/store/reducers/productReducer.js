import {
    PRODUCTS_FETCH_SUCCESS
} from '../actions/actionType.js'

const initialState = { data: [], detailById: {} };

function productReducer(state = initialState, action) {
    switch (action.type) {
      case PRODUCTS_FETCH_SUCCESS:
        return { ...state, data: action.payload };
      default:
        return state;
    }
  }
  
  export default productReducer;