import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userLoginReducer,
  userRegisterReducer
} from './reducers/userReducers';
import {
  productListReducer,
  productDeleteReducer,
  productCreateReducer,
  productDetailsReducer,
  productReviewCreateReducer
} from './reducers/productReducers';
import { logger } from 'redux-logger';



const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productDetails: productDetailsReducer,
  productReviewCreate: productReviewCreateReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;


const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
};

//const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export default store;
