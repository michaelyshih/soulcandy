
import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.scss';
import { useState } from 'react';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const [searchValue,setSearchValue] = useState();
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
    if (searchValue === "Search for Item"){
      history.push("/search/NO INPUT")
    } else {
      setSearchValue("")
      history.push(`/search/${searchValue}`)
    }

  }

  // const handleLeave = (e) =>{
    // e.preventDefault();
    // if (searchValue === "") {
    //   setSearchValue("Search for Item")
    // }
  // }

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
              <h3><Link to="/shop/earbuds">Earbuds</Link></h3>
              <li><Link to="/shop/earbuds/wireless">True Wireless Earbuds</Link></li>
              <li><Link to="/shop/earbuds/wired">Wired Earbuds</Link></li>
              <li><Link to="/shop/earbuds">Shop All Earbuds</Link></li>
            </ul>
            <ul>
              <h3><Link to="/shop/headset">Headphones</Link></h3>
              <li><Link to="/shop/headset/wireless">Wireless Headphones</Link></li>
              <li><Link to="/shop/headset/wired">Wired Headphones</Link></li>
              <li><Link to="/shop/headset">Shop All Headphones</Link></li>
            </ul>
            <ul>
              <h3><Link to="/shop/gaming">Gaming</Link></h3>
              <li><Link to="/shop/gaming/headset">Gaming Headphones</Link></li>
              <li><Link to="/shop/gaming/accessory">Gaming Accessory</Link></li>
              <li><Link to="/shop/gaming">Shop All Gaming</Link></li>
            </ul>
            <ul>
              <h3><Link to="/shop/accessory">Acessories</Link></h3>
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
            // onBlur={handleLeave}
            placeholder={"Search for Item"}
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
