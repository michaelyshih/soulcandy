import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import "./reset.css"
import './index.scss';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import * as productsActions from './store/productsReducer';
import * as cartItemsActions from './store/cartItemsReducer';



const store = configureStore()

  //testing
      if (process.env.NODE_ENV !== 'production') {
        window.store = store;
        window.csrfFetch = csrfFetch;
        window.sessionActions = sessionActions;
        window.productsActions = productsActions;
        window.cartItemsActions = cartItemsActions;
      }
  //testing

  function Root() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }

  const renderApplication = () => {
    ReactDOM.render(
      <React.StrictMode>
        <Root />
      </React.StrictMode>,
      document.getElementById('root')
    );
  }

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null
) {
  store.dispatch(sessionActions.restoreSession())
  .then(renderApplication);
}
else {
  store.dispatch(cartItemsActions.fetchItems(store.getState().session.user.id)).then(renderApplication());
}
