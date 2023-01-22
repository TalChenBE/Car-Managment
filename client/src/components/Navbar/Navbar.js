import male from "../../utils/icons/male.svg";
import female from "../../utils/icons/female.svg";
import car from "../../utils/icons/car.svg";
import exit from "../../utils/icons/exit.png";
import Sidenav from "../Sidenav/Sidenav";
import { useCookies } from "react-cookie";
import "./Navbar.css";
import { useEffect } from "react";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const [cookies, removeCookie] = useCookies(["cookie-name"]);
  const { setSession } = useAuth();
  const logout = useLogout();
  // const nav = useNavigate();

  useEffect(() => {
    console.log("gender:", cookies?.gender);
    console.log("firstName:", cookies?.firstName);
    console.log("lastName:", cookies?.lastName);
  }, [cookies]);

  const handleExitClick = async (e) => {
    console.log("user Exit");
    setSession(false);
    await logout();
    removeCookie();
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
