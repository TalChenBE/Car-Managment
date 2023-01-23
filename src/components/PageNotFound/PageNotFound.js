import { useRef } from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <h1 className="error" data-text="404">
        404
      </h1>
      <h2>Page Not Found</h2>
      <p> is looks like you found a glitch in the matrix...</p>
      <Link to="/Dashboard">&larr; Back to Dashboard</Link>
    </div>
  );
};

export default PageNotFound;
