import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useCookies } from "react-cookie";
import "./Login.css";

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["cookie-name"]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const errorRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const captchaRef = useRef(null);

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
        !isTrueLength ? "\nThe length must be at last 6 chars" : ""
      }${!hasUpperCase ? "\nThe password must includes upper case" : ""}${
        !hasLowerCase ? "\nThe password must includes upper case" : ""
      }${!hasNum ? "\nThe password must includes Number" : ""}${
        !hasSpecialChar ? "\nThe password must includes Special chars" : ""
      }`;
    } else {
      passwordRef.current.style.borderBottom = " 2px solid #13b8609b";
      try {
        e.preventDefault();
        // const token = captchaRef.current.getValue();
        const token = await captchaRef.current.executeAsync();
        console.log("token", token);
        captchaRef.current.reset();

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

        const userInfo = response?.data.foundUser;

        setCookie("firstName", userInfo.firstname, { path: "/", secure: true });
        setCookie("lastName", userInfo.lastName, { path: "/", secure: true });
        setCookie("gender", userInfo.gender, { path: "/", secure: true });

        console.log("Cookie:", cookies);
        const user = {
          email: userInfo.email,
          accessToken: response?.data.accessToken,
        };
        setAuth({ user });
        setEmail("");
        setPassword("");
        console.log("hello move to dashboard!");
        navigate("/Dashboard");
      } catch (err) {
        errorRef.current.innerText = err?.response.data.message;
      }
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

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
          <div className="persistCheck">
            <input
              type="checkbox"
              id="persist"
              onChange={togglePersist}
              checked={persist}
            />
            <label htmlFor="persist">remember me</label>
          </div>
          <div ref={errorRef} className="login-error-msg"></div>
          {/* <ReCAPTCHA
            sitekey={process.env.REACT_APP_SITE_KEY}
            ref={captchaRef}
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
