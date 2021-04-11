import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer
} from './reducers/userReducers';
import {
  productListReducer,
  productDeleteReducer,
  productCreateReducer,
  productDetailsReducer,
  productUpdateReducer,
  productReviewCreateReducer
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from './reducers/orderReducers';

import { logger } from 'redux-logger';


const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  productCreate: productCreateReducer,
  productDetails: productDetailsReducer,
  productReviewCreate: productReviewCreateReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer
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
