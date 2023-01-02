import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import DataTables from "datatables.net-dt";

import "./Table.css";

const Table = () => {
  // Call the dataTables jQuery plugin
  $(document).ready(function () {
    $("#dataTable").DataTable();
  });

  return (
    <div id="wrapper">
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>Treatment Info</th>
                  <th>Date</th>
                  <th>Worker email </th>
                  <th>Car Num</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tiger Nixon</td>
                  <td>System Architect</td>
                  <td>Edinburgh</td>
                  <td>61</td>
                  <td>2011/04/25</td>
                </tr>
                <tr>
                  <td>Garrett Winters</td>
                  <td>Accountant</td>
                  <td>Tokyo</td>
                  <td>63</td>
                  <td>2011/07/25</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Treatment Info</th>
                  <th>Date</th>
                  <th>Worker email </th>
                  <th>Car Num</th>
                  <th>Action</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
