import { useRef } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signin = () => {
  const errorRef = useRef(null);

  let isPasswordValid = false;
  let isTrueLength, hasUpperCase, hasLowerCase, hasNum, format, hasSpecialChar;
  let passwordVal;

  const handleChangeEmail = () => {
    const emailInput = document.getElementsByClassName("signup-input-email")[0];
    if (emailInput.checkValidity() === false)
      emailInput.style.borderBottom = "2px solid red";
    else emailInput.style.borderBottom = " 2px solid #b0b3b9";
  };

  const handleChangePassword = () => {
    console.log("handleChangePassword:");
    const passwordInput = document.getElementsByClassName(
      "signup-input-password"
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
    else {
      passwordInput.style.borderBottom = " 2px solid #b0b3b9";
      passwordVal = passwordInput.value;
    }
  };

  const handleChangeConfirmPassword = () => {
    const passwordInput = document.getElementsByClassName(
      "signup-input-confirm-password"
    )[0];
    const element = document.getElementById("confirm-password-text");

    if (isPasswordValid && passwordInput.value === passwordVal) {
      passwordInput.style.borderBottom = " 2px solid #b0b3b9";
      element.innerHTML = "";
    } else {
      passwordInput.style.borderBottom = "2px solid red";
      element.innerHTML = "The passwords do not match";
    }
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
    } else alert("You are sign in!");
  };

  return (
    <div>
      <form className="signup-page" onSubmit={(e) => handelSubmitClick(e)}>
        <div className="left">
          <div className="overlay">
            <h2>Nice to have you hare</h2>
            <h1>WELCOME</h1>
            <div className="divider"></div>
            <p>Some text here</p>
          </div>
        </div>

        <div className="right">
          <h2 className="signup-header">Signup</h2>
          <div className="signup-email-continer inputs">
            <i className="bi bi-envelope-at"></i>
            <input
              className="signup-input signup-input-email"
              type="email"
              placeholder="Enter Email *"
              required
              onBlur={() => handleChangeEmail()}
            />
          </div>
          <div className="signup-password-continer inputs">
            <i className="bi bi-lock"></i>
            <input
              className="signup-input signup-input-password"
              type="password"
              placeholder="Enter Password *"
              onBlur={() => handleChangePassword()}
              required
            />
          </div>
          <div className="signup-password-continer inputs">
            <i className="bi bi-lock"></i>
            <input
              className="signup-input signup-input-confirm-password"
              type="password"
              placeholder="Confirm Password *"
              onBlur={() => handleChangeConfirmPassword()}
              required
            />
          </div>
          <div id="confirm-password-text"></div>
          <div ref={errorRef} className="login-error-msg"></div>
          <div className="submit-continer">
            <input
              className="submit-button"
              type="submit"
              value="Create my account"
            />
          </div>
          <span className="link-sign-up">
            Already a member?
            <Link to="/Login">Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signin;
