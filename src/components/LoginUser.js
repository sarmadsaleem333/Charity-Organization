import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './signin.css';
import userAuthContext from '../context/userContext/userAuthContext';
import serverAuthContext from '../context/serverContext/serverAuthContext';
import alertContext from '../context/alertContext/AlertContext';
const LoginUser = () => {
  const context = useContext(userAuthContext);
  const context1 = useContext(serverAuthContext);
  const context2 = useContext(alertContext);
  const { signUpUser, loginUser } = context;
  const { showAlert } = context2;

  const [activeForm, setActiveForm] = useState('login');
  const [loginCredentials, setLoginCredentials] = useState({ email: "", password: "" });
  const [signUpCredentials, setSignUpCredentials] = useState({ name: "", email: "", phone: "", status: "", password: "", cpassword: "" });

  const onChangeSignUp = (e) => {
    setSignUpCredentials({ ...signUpCredentials, [e.target.name]: e.target.value });
  }

  const onChangeLogin = (e) => {
    setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginCredentials.email.length <= 0) {
      setLoginCredentials({ email: "", password: "" })
      return showAlert("Please enter the email", "danger");

    }
    const response = await loginUser(loginCredentials.email, loginCredentials.password);
    setLoginCredentials({ email: "", password: "" })
    if (response.success) {
      showAlert("You have logged in successfully", "success");
    }
    else {
      showAlert(response.error, "danger");

    }
  };

  const handleSignUp = async (e) => {

    e.preventDefault();
    if (signUpCredentials.password !== signUpCredentials.cpassword) {
      setSignUpCredentials({ name: "", email: "", phone: "", status: "", password: "", cpassword: "" })
      return showAlert("Your Password and Confirm Password did not match", "danger")
    }
    const response = await signUpUser(signUpCredentials.name, signUpCredentials.email, signUpCredentials.password, signUpCredentials.phone, signUpCredentials.status);
    setSignUpCredentials({ name: "", email: "", phone: "", status: "", password: "", cpassword: "" });
    if (response.success) {
      showAlert("Successfully Your account has been created", "success");
    }
    else {
      showAlert(response.error, "danger");
    }


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
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={loginCredentials.email}
                    onChange={onChangeLogin}
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="input-block">
                  <input
                    id="login-password"
                    type="password"
                    required
                    value={loginCredentials.password}
                    onChange={onChangeLogin}
                    name="password"
                    placeholder="Password"
                  />
                </div>
              </fieldset>
              <button type="submit" onClick={handleLogin} className="btn-login">
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
                <legend>Please, enter your details for sign up.</legend>
                <div className="input-block">
                  <input
                    type="text"
                    required
                    value={signUpCredentials.name}
                    onChange={onChangeSignUp}
                    name="name"
                    placeholder="Name"
                  />
                </div>
                <div className="input-block">
                  <input
                    id="signup-email"
                    type="email"
                    required
                    value={signUpCredentials.email}
                    onChange={onChangeSignUp}
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="input-block">
                  <input
                    type="number"
                    required
                    value={signUpCredentials.phone}
                    onChange={onChangeSignUp}
                    name="phone"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="input-block">
                  <input
                    type="text"
                    required
                    value={signUpCredentials.status}
                    onChange={onChangeSignUp}
                    name="status"
                    placeholder="Status"
                  />
                </div>
                <div className="input-block">
                  <input
                    id="signup-password"
                    type="password"
                    required
                    value={signUpCredentials.password}
                    onChange={onChangeSignUp}
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <div className="input-block">
                  <input
                    id="signup-password-confirm"
                    type="password"
                    required
                    value={signUpCredentials.cpassword}
                    onChange={onChangeSignUp}
                    name="cpassword"
                    placeholder="Confirm Password"
                  />
                </div>
              </fieldset>
              <button type="submit" onClick={handleSignUp} className="btn-login">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginUser;

