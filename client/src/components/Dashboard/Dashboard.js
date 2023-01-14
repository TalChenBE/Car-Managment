import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
// import DataTables from "datatables.net-dt";
import Table from "../Table/Table";
import date from "date-and-time";
import CircularProgress from "@mui/material/CircularProgress";
import "./Dashboard.css";

const DASHBOARD_URL = "/treatments";

const Dashboard = () => {
  const [tableData, setTableData] = useState(null);
  // Call the dataTables jQuery plugin
  $(document).ready(function () {
    $("#dataTable").DataTable();
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(DASHBOARD_URL, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        // console.log(JSON.stringify(response?.data));
        const data = response?.data.data;
        const map = new Map();
        data.forEach((tretment) => {
          tretment.Date = date.format(new Date(tretment.Date), "YYYY-MM-DD");
          map.set(tretment.Treatment_Number, tretment);
        });
        setTableData(map);

        // const accessToken = response?.data?.accessToken;
        // setAuth({ email: email, password: password, accessToken });
      } catch (err) {
        console.error(err?.response.data.message);
      }
    };

    getData();
  }, []);

  const headers = [
    "Treatment Number",
    "Treatment Information",
    "Date",
    "Worker email",
    "Car Number",
    "Action",
  ];

  return (
    <div>
      <h1 className="Dashboard-title">Car Treatments Dashboard</h1>
      <p className="Dashboard-p">
        This table represent the table menagment for car treatments
      </p>
      {tableData ? (
        <Table headers={headers} tableData={tableData} />
      ) : (
        <div className="Dashboard-loading">
          <h1>Loading...</h1>
          <CircularProgress size={60} thickness={4} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
