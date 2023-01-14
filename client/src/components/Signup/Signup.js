import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import ReCAPTCHA from "react-google-recaptcha";
import "./Signup.css";

const SIGNUP_URL = "/register";

const Signin = () => {
  // const { setAuth } = useAuth();

  const [firstname, setFirstname] = useState(""); //Tal Chen
  const [lastName, setLastname] = useState(""); //Ben-Eliyahu
  const [email, setEmail] = useState(""); //Talchenben1234@gmail.com
  const [password, setPassword] = useState(""); // Tt123@
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const genderFRef = useRef(null);
  const genderMRef = useRef(null);
  const genderORef = useRef(null);
  const errorRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  const navigate = useNavigate();

  // let isPasswordValid = false;
  let isTrueLength, hasUpperCase, hasLowerCase, hasNum, format, hasSpecialChar;

  const handleChangeEmail = () => {
    if (emailRef.current.checkValidity() === false)
      emailRef.current.style.borderBottom = "2px solid red";
    else emailRef.current.style.borderBottom = " 2px solid #b0b3b9";
  };

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
  };

  const handleChangeConfirmPassword = () => {
    const element = document.getElementById("confirm-password-text");

    if (isPasswordValid && passwordConfirm === password) {
      passwordConfirmRef.current.style.borderBottom = " 2px solid #b0b3b9";
      element.innerHTML = "";
    } else {
      passwordConfirmRef.current.style.borderBottom = "2px solid red";
      element.innerHTML = "The passwords do not match";
    }
  };

  const handelSubmitClick = async (e) => {
    e.preventDefault();

    if (isPasswordValid === false) {
      errorRef.current.innerText = `ERORR: the password is incorrect!!${
        !isTrueLength ? "\nThe length must be at last 6 chars" : ""
      }${!hasUpperCase ? "\nThe password must includes upper case" : ""}${
        !hasLowerCase ? "\nThe password must includes upper case" : ""
      }${!hasNum ? "\nThe password must includes Number" : ""}${
        !hasSpecialChar ? "\nThe password must includes Special chars" : ""
      }`;
    } else {
      try {
        const gender = genderFRef.current.checked
          ? "female"
          : genderMRef.current.checked
          ? "male"
          : "other";
        const response = await axios.post(
          SIGNUP_URL,
          JSON.stringify({
            firstname: firstname,
            lastName: lastName,
            email: email.toLocaleLowerCase(),
            password: password,
            gender: gender,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(JSON.stringify(response?.data));
        // const accessToken = response?.data?.accessToken;
        // setAuth({ email: email, password: password, accessToken });
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        navigate("/Login");
      } catch (err) {
        errorRef.current.innerText = err?.response.data.message;
      }
    }
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
          <div className="signup-ditails-container">
            <div>
              <div className="signup-firstname-continer inputs">
                <input
                  className="signup-input signup-input-firstname"
                  ref={firstnameRef}
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="Enter First Name *"
                  required
                />
              </div>
              <div className="signup-lastname-continer inputs">
                <input
                  className="signup-input signup-input-lastname"
                  ref={lastnameRef}
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Enter Last Name *"
                  required
                />
              </div>
              <div className="signup-gender-continer inputs">
                <label> Gender:</label>
                <div>
                  <input
                    type="radio"
                    id="female"
                    name="drone"
                    value="female"
                    ref={genderFRef}
                  />
                  <label htmlFor="female">Female</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="male"
                    name="drone"
                    value="male"
                    ref={genderMRef}
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="other"
                    name="drone"
                    value="other"
                    ref={genderORef}
                  />
                  <label htmlFor="other">Other</label>
                </div>
              </div>
            </div>
            <div>
              <div className="signup-email-continer inputs">
                <i className="bi bi-envelope-at"></i>
                <input
                  className="signup-input signup-input-email"
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email *"
                  required
                  onBlur={() => handleChangeEmail()}
                />
              </div>
              <div className="signup-password-continer inputs">
                <i className="bi bi-lock"></i>
                <input
                  className="signup-input signup-input-password"
                  ref={passwordRef}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password *"
                  onBlur={() => handleChangePassword()}
                  required
                />
              </div>
              <div className="signup-password-continer inputs">
                <i className="bi bi-lock"></i>
                <input
                  className="signup-input signup-input-confirm-password"
                  ref={passwordConfirmRef}
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="Confirm Password *"
                  onBlur={() => handleChangeConfirmPassword()}
                  required
                />
              </div>
            </div>
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
