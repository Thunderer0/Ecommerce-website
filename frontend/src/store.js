import {
    createStore,
    combineReducers,
    applyMiddleware
} from "redux";
import thunk from "redux-thunk";
import {
    composeWithDevTools
} from "redux-devtools-extension";

const reducer = combineReducers({

});
let inittialState = {};
const middleware = [thunk];
const store = createStore(reducer, inittialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store;