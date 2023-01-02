import { useRef } from "react";
import { Link } from "react-router-dom";
import "./ForgetPassword.css";

const ForgetPassword = () => {
  const errorRef = useRef(null);
  const emailInput = useRef(null);

  let isEmailValid = false;

  const handleChangeEmail = () => {
    isEmailValid = emailInput.current.checkValidity();
    if (isEmailValid === false)
      emailInput.current.style.borderBottom = "2px solid red";
    else emailInput.current.style.borderBottom = " 2px solid #b0b3b9";
  };

  const handelSubmitClick = (e) => {
    if (isEmailValid === false) {
      errorRef.current.innerText = "ERORR: the Email is incorrect!!";
      errorRef.current.style.background = "unset";
      errorRef.current.style.color = "#ff0000cf";
    } else {
      errorRef.current.innerText = "Please Check Your Email";
      errorRef.current.style.background = "#13b8609b";
      errorRef.current.style.color = "#111";
    }
  };

  return (
    <div className="forget-password-page">
      <div className="left">
        <div className="overlay"></div>
      </div>

      <div className="right">
        <h2 className="forget-password-header">Forget Your Password?</h2>
        <p>
          We get it, stuff happens. Just enter your email address below and
          we'll send you a link to reset your password!
        </p>
        <div className="inputs">
          <input
            className="forget-password-input-email"
            type="email"
            placeholder="Enter Email *"
            required
            ref={emailInput}
            onBlur={() => handleChangeEmail()}
          />
        </div>
        <div ref={errorRef} className="forget-password-error-msg"></div>
        <div className="submit-continer">
          <button
            className="submit-button"
            type="submit"
            onClick={(e) => handelSubmitClick(e)}
          >
            Reset Password
          </button>
        </div>
        <span className="link-sign-up">
          <Link to="/Signup">Create an Account!</Link>
          <br />
          <Link to="/Login">Already have an account? Login!</Link>
        </span>
      </div>
    </div>
  );
};

export default ForgetPassword;
