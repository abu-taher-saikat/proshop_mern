import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducer';
import { productDetailsReducer, productListReducer } from './reducers/productReducer';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducer';

const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart : cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer
});



//first save the data on localstorage. 
const cartItemsFromStorage = localStorage.getItem('cartItem')
  ? JSON.parse(localStorage.getItem('cartItem'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: null

const initialState = {
    cart : { 
        cartItems : cartItemsFromStorage
    },
    userLogin : {
        userInfo : userInfoFromStorage // here data is coming from local storage.
    }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;