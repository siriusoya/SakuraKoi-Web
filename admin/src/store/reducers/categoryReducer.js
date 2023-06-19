import {
    CATEGORIES_FETCH_SUCCESS
} from '../actions/actionType.js'

const initialState = { data: [], detailById: {} };

function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORIES_FETCH_SUCCESS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export default categoryReducer;
