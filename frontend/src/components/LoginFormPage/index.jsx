
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import './LoginForm.css';
import { fetchItems } from '../../store/cartItemsReducer';
import { useEffect } from 'react';

function LoginFormPage() {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const errors = await dispatch(sessionActions.login({ credential, password }))
    setErrors(errors)
    setCredential("")
    setPassword("")
  }

  const handleDemo = (e) =>{
    e.preventDefault()
    dispatch(sessionActions.login({ credential:'demo@user.io',password:'password'}))
    setCredential("")
    setPassword("")
  }

  useEffect(()=>{
    if(sessionUser) dispatch(fetchItems(sessionUser.id))
  },[sessionUser])

  if (sessionUser) return <Redirect to="/" />;

  return (
    <div className='login-page'>
      <h1 className='title-card'>SIGN IN</h1>
      <div className='login-container'>
        <form className="login-form" onSubmit={handleSubmit} >
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          <label htmlFor={credential}>Email Addess:
          </label>
          <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          <label htmlFor={password}>
            Password:
          </label>
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          <button type="submit">Log In</button>
          <button onClick={handleDemo}>Demo User</button>
        </form>
        <div className='create-user-container'>
          <h3>NEW CUSTOMER?</h3>
          <div className='signup-info-container'>
            <p>
            Create an account with us and you'll be able to:
            </p>
            <li>
              Check out faster
            </li>
            <li>Sace multip shipping addresses</li>
            <li>Access your order history</li>
            <li>Track new orders</li>
          </div>
          <Link to="/signup"><button>Create Account</button></Link>

        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
