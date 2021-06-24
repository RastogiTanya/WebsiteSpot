import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	productListReducer,
	productDetailsReducer,
} from "./reducers/productReducers.js";

//merging reducers using combineReducers
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
});
const initialState = {};
const middleware = [thunk];

const store = createStore(
	reducer, //use for changing the state
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
