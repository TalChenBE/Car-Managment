import male from "../../utils/icons/male.svg";
import female from "../../utils/icons/female.svg";
import car from "../../utils/icons/car.svg";
import exit from "../../utils/icons/exit.png";
import Sidenav from "../Sidenav/Sidenav";
import { useCookies } from "react-cookie";
import useLogout from "../../hooks/useLogout";
import "./Navbar.css";

import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { setSession } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const logout = useLogout();
  // const nav = useNavigate();

  const handleExitClick = async (e) => {
    console.log("user Exit");
    setSession(false);
    await logout();
    setCookie("firstName", "Hello ", { path: "/", secure: true });
    setCookie("lastName", "Welcome", { path: "/", secure: true });
    removeCookie("gender", { path: "/", secure: true });
  };

  return (
    <div className="navbar-container">
      <img
        src={exit}
        alt="exit"
        className="navbar-img-icon"
        onClick={handleExitClick}
      />
      <div className="navbar-divider"></div>
      <div className="navbar-img-container">
        {cookies?.gender === "female" && (
          <img src={female} alt="female-icon" className="navbar-img-icon"></img>
        )}
        {cookies?.gender === "male" && (
          <img src={male} alt="male-icon" className="navbar-img-icon"></img>
        )}
      </div>

      <h6>
        {(cookies?.firstName === undefined ? "Hello" : cookies?.firstName) +
          " " +
          (cookies?.lastName === undefined ? "Welcome" : cookies?.lastName)}
      </h6>

      <a className="navbar-title-ContectUs" href="../ContactUs">
        Contact Us
      </a>
      <div className="navbar-divider"></div>
      <a href="/Dashboard" className="navbar-a">
        <h4 className="navbar-title">Car Management</h4>
        <img src={car} alt="car-icon" className="navbar-img-icon"></img>
      </a>
      <Sidenav />
    </div>
  );
};

export default Navbar;
