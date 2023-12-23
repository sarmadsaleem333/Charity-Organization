import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signin.css';

const LoginUser = () => {
  const [activeForm, setActiveForm] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const collectData = (e) => {
    e.preventDefault();
    console.warn(email, password);
  };

  const switchForm = (form) => {
    setActiveForm(form);
  };

  return (
    <div className="main">
      <section className="forms-section">
        <h1 className="section-title">Animated Forms</h1>
        <div className={`forms`}>
          <div className={`form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`}>
            <button type="button" className="switcher switcher-login" onClick={() => switchForm('login')}>
              Login
              <span className="underline"></span>
            </button>
            <form className="form form-login">
              <fieldset>
                <legend>Please, enter your email and password for login.</legend>
                <div className="input-block">
                  <label htmlFor="login-email">E-mail</label>
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email!"
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="login-password">Password</label>
                  <input
                    id="login-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </fieldset>
              <button type="submit" onClick={collectData} className="btn-login">
                Login
              </button>
            </form>
          </div>
          <div className={`form-wrapper ${activeForm === 'signup' ? 'is-active' : ''}`}>
            <button type="button" className="switcher switcher-signup" onClick={() => switchForm('signup')}>
              Sign Up
              <span className="underline"></span>
            </button>
            <form className="form form-signup">
              <fieldset>
                <legend>Please, enter your email, password, and password confirmation for sign up.</legend>
                <div className="input-block">
                  <label htmlFor="signup-email">E-mail</label>
                  <input id="signup-email" type="email" required />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-password">Password</label>
                  <input id="signup-password" type="password" required />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-password-confirm">Confirm password</label>
                  <input id="signup-password-confirm" type="password" required />
                </div>
              </fieldset>
              <button type="submit" className="btn-signup">
                Continue
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginUser;

