import {useRef, useState} from "react";
import useAuth from '../../hooks/useAuth';
import { Link } from "react-router-dom";
import "./Login.css";
import axios from '../../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
  const { setAuth } = useAuth();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const errorRef = useRef(null);

  let isPasswordValid = false;
  let isTrueLength, hasUpperCase, hasLowerCase, hasNum, format, hasSpecialChar;

  const handleChangeEmail = () => {
    const emailInput = document.getElementsByClassName("login-input-email")[0];
    if (emailInput.checkValidity() === false)
      emailInput.style.borderBottom = "2px solid red";
    else emailInput.style.borderBottom = " 2px solid #b0b3b9";
  };

  const handleChangePassword = () => {
    console.log("handleChangePassword:");
    const passwordInput = document.getElementsByClassName(
      "login-input-password"
    )[0];

    isTrueLength = passwordInput.value.length >= 6;
    hasUpperCase = /[A-Z]/.test(passwordInput.value);
    hasLowerCase = /[a-z]/.test(passwordInput.value);
    hasNum = /[1-9]/.test(passwordInput.value);

    format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    hasSpecialChar = format.test(passwordInput.value);

    if (
      isTrueLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNum &&
      hasSpecialChar
    )
      isPasswordValid = true;

    if (isPasswordValid === false)
      passwordInput.style.borderBottom = "2px solid red";
    else passwordInput.style.borderBottom = " 2px solid #b0b3b9";
  };

  const handelSubmitClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL,
          JSON.stringify({ email: email, password: pwd }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
      );
      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      setAuth({ email: email, password: pwd, accessToken });
      setEmail('');
      setPwd('');
      if (isPasswordValid === false) {
        errorRef.current.innerText = `ERORR: the password is incorrect!!${
            !isTrueLength ? "\nThe length mast be at lest 6 chars" : ""
        }${!hasUpperCase ? "\nThe password mast includes upper case" : ""}${
            !hasLowerCase ? "\nThe password mast includes upper case" : ""
        }${!hasNum ? "\nThe password mast includes Numner" : ""}${
            !hasSpecialChar ? "\nThe password mast includes Spacial chars" : ""
        }`;
      } else {
        alert(`You are in !`);
      }
    } catch (err) {
      if (!err?.response) {
        console.log('No Server Response');
      } else if (err.response?.status === 400) {
        console.log('Missing Username or Password');
      } else if (err.response?.status === 401) {
        console.log('Unauthorized');
      } else {
        console.log('Login Failed');
      }
    }

  };

  return (
    <div>
      <form className="login-page" onSubmit={(e) => handelSubmitClick(e)}>
        <div className="left">
          <div className="overlay">
            <h2>Nice to have you hare</h2>
            <h1>WELCOME BACK</h1>
            <div className="divider"></div>
            <p>Some text here</p>
          </div>
        </div>

        <div className="right">
          <h2 className="login-header">Login</h2>
          <div className="login-email-continer inputs">
            <i className="bi bi-envelope-at"></i>
            <input
              className="login-input login-input-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email *"
              required
              onBlur={() => handleChangeEmail()}
            />
          </div>
          <div className="login-password-continer inputs">
            <i className="bi bi-lock"></i>
            <input
              className="login-input login-input-password"
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Enter password *"
              onBlur={() => handleChangePassword()}
              required
            />
          </div>
          <Link className="forget-pass" to="/ForgetPassword">
            forget password?
          </Link>
          <div ref={errorRef} className="login-error-msg"></div>
          <div className="submit-continer">
            <input className="submit-button" type="submit" value="Submit" />
          </div>
          <span className="link-sign-up">
            Need an account?
            <Link to="/Signup">Sign Up</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
