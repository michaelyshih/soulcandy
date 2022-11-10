import {combineReducers, applyMiddleware, createStore, compose} from "redux"
import thunk from "redux-thunk"
import session from "./session"
import products from "./productsReducer";
import cart_items from "./cartItemsReducer";
import reviews from "./reviewsReducer"
const rootReducer = combineReducers({
  session,
  products,
  cart_items,
  reviews
  // need users reducer to avoid error, slices of state in store need reducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
  } else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
  }

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
