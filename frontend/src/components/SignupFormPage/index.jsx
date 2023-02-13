
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.scss';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);


  useEffect(()=>{
    if (password !== confirmPassword){
      setPasswordErrors(['Confirmation Password must be same as Password'])}
    else {setPasswordErrors("")}
  }, [password, confirmPassword])

  useEffect(()=>{
    setUsername(`${firstname} ${lastname}`)
  }, [firstname, lastname])

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      const errors = await dispatch(sessionActions.signup({ email, username, password }))
      setErrors(errors)
    }
  };

  return (
    <section className="signup-page">
      <h1 className="title-card">New Account</h1>
      <form className="signup-form-container" onSubmit={handleSubmit}>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>

        <li>
          <label>
            <h3>Email</h3>
            <p>required</p>
          </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </li>

        <li>
          <label>
            <h3>Password</h3>
            <p>required</p>
          </label>
            <input
              type="password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              required
            />
        </li>

        <li>
          <label htmlFor={confirmPassword}>
            <h3>Confirm Password</h3>
            <p>required</p>
          </label>
          <input
              type="password"
              value={confirmPassword}
              onChange={(e)=>{setConfirmPassword(e.target.value)}}
              required
            />
          <p className="password-errors">{passwordErrors}</p>
        </li>

        <li>
          <label>
            <h3>First Name</h3>
            <p>required</p>
          </label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
        </li>
        <li>
          <label>
            <h3>Last Name</h3>
            <p>required</p>
          </label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
        </li>
        <li>
          <button type="submit">Create Account</button>
        </li>
      </form>
    </section>
  );
}

export default SignupFormPage;
