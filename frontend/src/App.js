import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import CategoryIndex from './components/CategoryIndex';
import ProductShowPage from './components/ProductShowPage';
import Splash from './components/Splash';
import CartIndex from './components/CartIndex';
import CategorySearch from './components/CategorySearch';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navigation />
      <div className='layer'/>
      <section className='main-content-container'>
        <Switch>
          <Route exact path="/">
            <Splash/>
          </Route>
          <Route exact path="/signup">
            <SignupFormPage/>
          </Route>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/products">
            <CategoryIndex />
          </Route>
          <Route exact path="/search/:query">
            <CategorySearch />
          </Route>
          <Route exact path="/products/:productName">
            <ProductShowPage />
          </Route>
          <Route exact path="/cart">
            <CartIndex />
          </Route>
          <Route exact path="/shop/:category">
            <CategoryIndex />
          </Route>
          <Route exact path="/shop/:category/:subcategory">
            <CategoryIndex />
          </Route>
          <Redirect from="*" to='/' />
        </Switch>
      </section>
    <Footer/>
    </>
  );
}

export default App;
