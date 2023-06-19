import { legacy_createStore as createStore } from 'redux'
import rootReducer from "./reducers/rootReducer"
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

let store = createStore(rootReducer, applyMiddleware(thunk))

export default store