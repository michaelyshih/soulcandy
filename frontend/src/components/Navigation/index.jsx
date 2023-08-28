
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton.jsx';
import './Navigation.scss';
import { getTotalCartCount } from '../../store/cartItemsReducer';
import SearchBar from '../SearchBar';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const cartLength = useSelector(getTotalCartCount)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login"><i id="account" className="fa-regular fa-user"></i></NavLink>
      </>
    );
  }

  return (
    <nav className="nav-bar">
      <section className="redirection-section">
        <NavLink className="logo" to="/">
          <img src="./favicon.ico" width="33" alt="logo" />
          <h1>SoulCandy</h1>
        </NavLink>
        <section className="nav-shop">
          <Link className="shop" to="/products">
            <h3>SHOP</h3>
          </Link>
          <section className="shop-dropdown">
            <ul>
              <h3>
                <Link to="/shop/earbuds">Earbuds</Link>
              </h3>
              <li>
                <Link to="/shop/earbuds/wireless">True Wireless Earbuds</Link>
              </li>
              <li>
                <Link to="/shop/earbuds/wired">Wired Earbuds</Link>
              </li>
              <li>
                <Link to="/shop/earbuds">Shop All Earbuds</Link>
              </li>
            </ul>
            <ul>
              <h3>
                <Link to="/shop/headset">Headphones</Link>
              </h3>
              <li>
                <Link to="/shop/headset/wireless">Wireless Headphones</Link>
              </li>
              <li>
                <Link to="/shop/headset/wired">Wired Headphones</Link>
              </li>
              <li>
                <Link to="/shop/headset">Shop All Headphones</Link>
              </li>
            </ul>
            <ul>
              <h3>
                <Link to="/shop/gaming">Gaming</Link>
              </h3>
              <li>
                <Link to="/shop/gaming/headset">Gaming Headphones</Link>
              </li>
              <li>
                <Link to="/shop/gaming/accessory">Gaming Accessory</Link>
              </li>
              <li>
                <Link to="/shop/gaming">Shop All Gaming</Link>
              </li>
            </ul>
            <ul>
              <h3>
                <Link to="/shop/accessory">Acessories</Link>
              </h3>
            </ul>
          </section>
        </section>
      </section>
      <ul className="purchase-nav">
        <li>{sessionLinks}</li>
        <li>
          <Link to="/cart" className="cart-icon">
              <i className="fa-solid fa-bag-shopping "></i>
              {cartLength ?
               (<span className="cart-badge" id="lblCartCount">
                  {cartLength}
                </span>) : ("")
              }
          </Link>
        </li>
        <li>
              <SearchBar/>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation;
