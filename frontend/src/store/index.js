import {combineReducers, applyMiddleware, createStore, compose} from "redux"
import thunk from "redux-thunk"
import session from "./session"
import products from "./productsReducer";
import cart_items from "./cartItemsReducer";
import reviews from "./reviewsReducer"
import searchResults from "./searchResultsReducer"

const rootReducer = combineReducers({
  session,
  products,
  searchResults,
  cart_items,
  reviews
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
