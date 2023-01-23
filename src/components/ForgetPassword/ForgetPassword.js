import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import thinkMan from "../../utils/icons/thinking-man-icon.png";
import axios from "../../api/axios";
import "./ForgetPassword.css";

const FORGETPASS_URL = "/forget_password";

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

  const handelSubmitClick = async (e) => {
    if (isEmailValid === false) {
      console.log("errorRef.current.value:", errorRef.current.value);
      errorRef.current.value === undefined
        ? (errorRef.current.innerText = "Please enter an email")
        : (errorRef.current.innerText = "ERORR: the Email is incorrect!!");
      errorRef.current.style.background = "unset";
      errorRef.current.style.color = "#ff0000cf";
    } else {
      // emailInput.current.style.borderBottom = " 2px solid #13b8609b";
      try {
        console.log("emailInput.current.value:", emailInput.current.value);
        const response = await axios.post(
          FORGETPASS_URL,
          JSON.stringify({ email: emailInput.current.value }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(JSON.stringify(response?.data));
        errorRef.current.innerText = "Please Check Your Email";
        errorRef.current.style.background = "#13b8609b";
        errorRef.current.style.color = "#111";
        // const accessToken = response?.data?.accessToken;
        // setAuth({ email: email, password: password, accessToken });
      } catch (err) {
        errorRef.current.innerText = err?.response.data.message;
        errorRef.current.style.background = "unset";
        errorRef.current.style.color = "#ff0000cf";
      }
    }
  };

  return (
    <div className="forget-password-page">
      <div className="left">
        <div className="overlay">
          <img src={thinkMan} alt="thinkingMan" />
        </div>
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
