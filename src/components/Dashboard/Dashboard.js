// import "bootstrap/dist/css/bootstrap.min.css";
import Table from "../Table/Table";

import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div>
      <h1 className="Dashboard-title">Car Treatments Dashboard</h1>
      <p className="Dashboard-p">
        This table represent the table menagment for car treatments{" "}
      </p>
      <Table />
    </div>
  );
};

export default Dashboard;
