import { useRef } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
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

  const handelSubmitClick = (e) => {
    if (isPasswordValid === false) {
      errorRef.current.innerText = `ERORR: the password is incorrect!!${
        !isTrueLength ? "\nThe length mast be at lest 6 chars" : ""
      }${!hasUpperCase ? "\nThe password mast includes upper case" : ""}${
        !hasLowerCase ? "\nThe password mast includes upper case" : ""
      }${!hasNum ? "\nThe password mast includes Numner" : ""}${
        !hasSpecialChar ? "\nThe password mast includes Spacial chars" : ""
      }`;
      e.preventDefault();
    } else {
      alert(`You are in !`);
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
