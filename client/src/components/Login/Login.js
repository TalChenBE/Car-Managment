import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useCookies } from "react-cookie";
import "./Login.css";

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useAuth();
  const [cookies, setCookie] = useCookies(["cookie-name"]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const errorRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

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

  const handelSubmitClick = async (e) => {
    e.preventDefault();
    if (isPasswordValid === false) {
      errorRef.current.innerText = `ERORR: the password is incorrect!!${
        !isTrueLength ? "\nThe length mast be at lest 6 chars" : ""
      }${!hasUpperCase ? "\nThe password mast includes upper case" : ""}${
        !hasLowerCase ? "\nThe password mast includes upper case" : ""
      }${!hasNum ? "\nThe password mast includes Numner" : ""}${
        !hasSpecialChar ? "\nThe password mast includes Spacial chars" : ""
      }`;
    } else {
      passwordRef.current.style.borderBottom = " 2px solid #13b8609b";
      try {
        const response = await axios.post(
          LOGIN_URL,
          JSON.stringify({
            email: email.toLocaleLowerCase(),
            password: password,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(JSON.stringify(response?.data));
        const user = response?.data.foundUser;

        setCookie("firstName", user.firstname, { path: "/", secure: true });
        setCookie("lastName", user.lastName, {});
        setCookie("gender", user.gender, {});

        console.log("Cookie:", cookies);
        const accessToken = response?.data?.accessToken;
        // setAuth({ email: email, password: password, accessToken });
        setEmail("");
        setPassword("");
        console.log("hello move to dashboard!");
        navigate("/Dashboard");
      } catch (err) {
        errorRef.current.innerText = err?.response.data.message;
      }
    }
  };

  return (
    <div>
      <form className="login-page" onSubmit={(e) => handelSubmitClick(e)}>
        <div className="left">
          <div className="overlay">
            <h2>Nice to have you here</h2>
            <h1>WELCOME BACK</h1>
            <div className="divider"></div>
            <p>car managment website</p>
          </div>
        </div>

        <div className="right">
          <h2 className="login-header">Login</h2>
          <div className="login-email-continer inputs">
            <i className="bi bi-envelope-at"></i>
            <input
              className="login-input login-input-email"
              ref={emailRef}
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
              ref={passwordRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password *"
              onBlur={() => handleChangePassword()}
              required
            />
          </div>
          <Link className="forget-pass" to="/ForgetPassword">
            forget password?
          </Link>
          <div ref={errorRef} className="login-error-msg"></div>
          {/* <ReCAPTCHA
            sitekey="YOUR-SITE-KEY"
            onChange={() => console.log("reCAPTCHA change!")}
          /> */}
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
