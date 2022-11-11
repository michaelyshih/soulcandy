import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import { fetchItems } from "../../store/cartItemsReducer";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    dispatch(sessionActions.logout());
    dispatch(fetchItems());
    history.push("/")
  };

  return (
    <>
      {!showMenu && (
      <button className="profile" onClick={openMenu} >
        <i className="fa-solid fa-user-circle" />
      </button>
      )}
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.email}</li>
          <li>
            <button className="log-out-button" onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
