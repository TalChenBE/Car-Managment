import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import thinkMan from "../../utils/icons/thinking-man-icon.png";
import axios from "../../api/axios";
import "./ResetPassword.css";

const RESETPASS_URL = "/reset_password/";

const ResetPassword = () => {
  const { token } = useParams();

  const [password, setPassword] = useState(""); // Tt123@
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const errorRef = useRef(null);

  let isTrueLength, hasUpperCase, hasLowerCase, hasNum, format, hasSpecialChar;

  const handleChangePassword = () => {
    isTrueLength = password.length >= 6;
    hasUpperCase = /[A-Z]/.test(password);
    hasLowerCase = /[a-z]/.test(password);
    hasNum = /[1-9]/.test(password);

    format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    hasSpecialChar = format.test(password);

    if (
      isTrueLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNum &&
      hasSpecialChar
    )
      setIsPasswordValid(true);

    if (isPasswordValid === false)
      passwordRef.current.style.borderBottom = "2px solid red";
    else passwordRef.current.style.borderBottom = " 2px solid #b0b3b9";
    if (isPasswordValid && passwordConfirm === password) {
      const element = document.getElementById("confirm-password-text");
      element.innerHTML = "";
    }
  };

  const handleChangeConfirmPassword = () => {
    const element = document.getElementById("confirm-password-text");
    if (passwordConfirm === password) {
      passwordConfirmRef.current.style.borderBottom = " 2px solid #b0b3b9";
      element.innerHTML = "";
    } else {
      passwordConfirmRef.current.style.borderBottom = "2px solid red";
      element.innerHTML = "The passwords do not match";
    }
    if (isPasswordValid) {
      element.innerHTML = "Password is not valid";
    }
  };

  const handelSubmitClick = async (e) => {
    if (isPasswordValid === false) {
      errorRef.current.innerText = `ERORR: the password is incorrect!!${
        !isTrueLength ? "\nThe length mast be at lest 6 chars" : ""
      }${!hasUpperCase ? "\nThe password mast includes upper case" : ""}${
        !hasLowerCase ? "\nThe password mast includes upper case" : ""
      }${!hasNum ? "\nThe password mast includes Numner" : ""}${
        !hasSpecialChar ? "\nThe password mast includes Spacial chars" : ""
      }`;
    } else if (passwordConfirm === password) {
      try {
        const response = await axios.post(
          RESETPASS_URL + token,
          JSON.stringify({ password: passwordRef.current.value }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(JSON.stringify(response?.data));
        errorRef.current.innerText = "Please Check Your Email";
        errorRef.current.style.background = "#13b8609b";
        errorRef.current.style.color = "#111";
        const accessToken = response?.data?.accessToken;
        // setAuth({ email: email, password: password, accessToken });
      } catch (err) {
        console.error(err?.response.data.message);
      }
    } else {
      errorRef.innerHTML = "passeord are not equal";
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
        <h2 className="forget-password-header">Reset Password</h2>
        <p>
          We get it, stuff happens. Just enter your email address below and
          we'll send you a link to reset your password!
        </p>
        <div className="forget-password-continer inputs">
          <i className="bi bi-lock"></i>
          <input
            className="forget-password-input forget-password-input-password"
            ref={passwordRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password *"
            onBlur={handleChangePassword}
            required
          />
        </div>
        <div className="forget-password-password-continer inputs">
          <i className="bi bi-lock"></i>
          <input
            className="forget-password-input forget-password-input-confirm-password"
            ref={passwordConfirmRef}
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Confirm Password *"
            onBlur={handleChangeConfirmPassword}
            required
          />
        </div>
        <div id="confirm-password-text"></div>
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

export default ResetPassword;
