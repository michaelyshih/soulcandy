
import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.scss';
import { fetchProductsBySearch } from '../../store/productsReducer';
import { useState } from 'react';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const [searchValue,setSearchValue] = useState("Search for Item");
  const dispatch = useDispatch();
  const history = useHistory();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger
    // console.log("hello")
    if (searchValue === "Search for Item"){
      dispatch(fetchProductsBySearch())
    }
    dispatch(fetchProductsBySearch(searchValue))
    setSearchValue("Search for Item")
    history.push(`/search`)

  }

  const handleLeave = (e) =>{
    e.preventDefault();
    if (searchValue === "") {
      setSearchValue("Search for Item")
    }
  }
  const handleFocus = (e) =>{
    e.preventDefault();
    if (searchValue === "Search for Item") {
      setSearchValue("")
    }
  }


  return (
    <nav className='nav-bar'>
      <section className='redirection-section'>
        <NavLink className="logo" to="/">
          <img src="./favicon.ico" width="33" alt="logo" />
          <h1>SoulCandy</h1>
        </NavLink>
        <section className="nav-shop">
          <Link className="shop" to="/products"><h3>SHOP</h3></Link>
          <section className='shop-dropdown'>
            <ul>
              <h3><Link to="/earbuds">Earbuds</Link></h3>
              <li><Link to="/earbuds/wireless">True Wireless Earbuds</Link></li>
              <li><Link to="/earbuds/wired">Wired Earbuds</Link></li>
              <li><Link to="/earbuds">Shop All Earbuds</Link></li>
            </ul>
            <ul>
              <h3><Link to="/headset">Headphones</Link></h3>
              <li><Link to="/headset/wireless">Wireless Headphones</Link></li>
              <li><Link to="/headset/wired">Wired Headphones</Link></li>
              <li><Link to="/headset">Shop All Headphones</Link></li>
            </ul>
            <ul>
              <h3><Link to="/gaming">Gaming</Link></h3>
              <li><Link to="/gaming/headset">Gaming Headphones</Link></li>
              <li><Link to="/gaming/accessory">Gaming Accessory</Link></li>
              <li><Link to="/gaming">Shop All Gaming</Link></li>
            </ul>
            <ul>
              <h3><Link to="/accessory">Acessories</Link></h3>
            </ul>
          </section>
        </section>
      </section>
      <ul className='purchase-nav'>
        <li>{sessionLinks}</li>
        <li>
          <Link to="/cart">
            <i className="fa-solid fa-bag-shopping"></i>
          </Link>
        </li>
        <li>
          <form onSubmit={handleSubmit}>

            <input
            type="text"
            value={searchValue}
            onChange={e=>setSearchValue(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleLeave}
            />

            <button type='submit' className='search-button'>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>

          </form>
        </li>
      </ul>

    </nav>
  );
}

export default Navigation;
