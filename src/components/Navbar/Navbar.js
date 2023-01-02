import "./Navbar.css";
import male from "../../utils/icons/male.svg";
import female from "../../utils/icons/female.svg";
import car from "../../utils/icons/car.svg";
import { Link } from "react-router-dom";

const Navbar = ({ fullName = "FirstName LastName", gender = "female" }) => {
  return (
    <div className="navbar-container">
      <div className="navbar-img-container">
        {gender === "female" && (
          <img src={female} alt="female-icon" className="navbar-img-icon"></img>
        )}
        {gender === "male" && (
          <img src={male} alt="male-icon" className="navbar-img-icon"></img>
        )}
      </div>

      <h6>{fullName}</h6>

      <a className="navbar-title-ContectUs" href="../ContectUs">
        Contect Us
      </a>
      <div className="navbar-divider"></div>
      <h4 className="navbar-title">Car Menagment</h4>
      <img src={car} alt="car-icon" className="navbar-img-icon"></img>
    </div>
  );
};

export default Navbar;
