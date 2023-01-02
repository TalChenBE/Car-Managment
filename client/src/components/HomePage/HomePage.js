import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      <h1>This is HomePage page</h1>
      <p>Please login befor evrything!:</p>
      <Link to="/Login">Login</Link>
    </div>
  );
};

export default HomePage;
