import React, { Component, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import DataTables from "datatables.net-dt";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import date from "date-and-time";
import deleteTrash from "../../utils/icons/delete-trash.png";
import edit from "../../utils/icons/edit.svg";
import save from "../../utils/icons/save.png";
import cancel from "../../utils/icons/cancel.png";

import "./Table.css";

const TREATMENT_DELETE_URL = "/treatments";
const TREATMENT_CREATE_URL = "/treatment/create";
const TREATMENT_PUT_URL = "/treatments";

const EMPTY_ARRAY = [];

const Table = ({ tableData = EMPTY_ARRAY, headers = EMPTY_ARRAY }) => {
  const [treatmentInformation, setTreatmentInformation] = useState(null);
  const [treatmentDate, setTreatmentDate] = useState(null);
  const [workerEmail, setWorkerEmail] = useState(null);
  const [carNumber, setCarNumber] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  const tableRef = useRef(null);

  const axiosPrivate = useAxiosPrivate();

  $(document).ready(function () {
    $("#dataTable").DataTable();
  });

  const onAddTreatment = (e) => {
    e.preventDefault();
    const row_object = {
      Treatment_Information: treatmentInformation,
      Date: treatmentDate,
      Worker_email: workerEmail,
      Car_Number: carNumber,
    };

    onCreate(row_object);
  };

  const onCreate = async (row_object) => {
    try {
      const response = await axiosPrivate.post(TREATMENT_CREATE_URL, row_object);
      // console.log(JSON.stringify(response?.data));
      const result = response?.data.result;
      result.Date = date.format(new Date(result.Date), "YYYY-MM-DD");

      tableData.set(result.Treatment_Number, result);
      if (tableData.size === 0) window.location.reload(true);
      setOpenDialog(false);
      // const accessToken = response?.data?.accessToken;
      // setAuth({ email: email, password: password, accessToken });
    } catch (err) {
      console.error(err?.response.data.message);
    }
  };

  const onDelete = async (treatmentNum) => {
    try {
      const response = await axiosPrivate.delete(TREATMENT_DELETE_URL, {
        params: { treatmentNumber: treatmentNum },
      });
      console.log(JSON.stringify(response?.data));
      // setData
      tableData.delete(treatmentNum);
      window.location.reload(true);
      // const accessToken = response?.data?.accessToken;
      // setAuth({ email: email, password: password, accessToken });
    } catch (err) {
      console.error(err?.response.data.message);
    }
  };

  const updateTreatment = async (treatmentNum, row_object) => {
    try {
      const response = await axiosPrivate.put(TREATMENT_PUT_URL, row_object, {
        headers: { "Content-Type": "application/json" },
        params: { treatmentNumber: treatmentNum },
      });
      // console.log(JSON.stringify(response?.data));
      // const accessToken = response?.data?.accessToken;
      // setAuth({ email: email, password: password, accessToken });
    } catch (err) {
      console.error(err?.response.data.message);
    }
  };

  const onEdit = ({ id }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    const treatment = tableData.get(id);
    setTreatmentInformation(treatment.Treatment_Information);
    setTreatmentDate(treatment.Date);
    setWorkerEmail(treatment.Worker_email);
    setCarNumber(treatment.Car_Number);
  };

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null,
    });
  };

  const onSave = ({ id }) => {
    const treatment = tableData.get(id);
    treatment.Treatment_Information = treatmentInformation;
    treatment.Date = treatmentDate;
    treatment.Worker_email = workerEmail;
    treatment.Car_Number = carNumber;
    tableData.set(id, treatment);

    updateTreatment(id, tableData.get(id));

    setInEditMode({
      status: false,
      rowKey: null,
    });
  };

  return (
    <div id="wrapper" ref={tableRef}>
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="add-new-row-continer">
            <button
              className="tbale-add-new-row-btn"
              onClick={() => setOpenDialog(!openDialog)}
            >
              Add Treatment
            </button>
            <Dialog
              className="dialog-continer"
              onClose={() => setOpenDialog(false)}
              open={openDialog}
            >
              <h2 className="dialog-title">Add new treatment</h2>
              <form className="dialog-form">
                <div className="inputs">
                  <label className="labels">Treatment Information:</label>
                  <input
                    className="tbale-input"
                    type="text"
                    required
                    onChange={(e) => setTreatmentInformation(e.target.value)}
                  />
                </div>
                <div className="inputs">
                  <label className="labels">Treatment Date:</label>
                  <input
                    className="tbale-input"
                    type="date"
                    required
                    onChange={(e) => setTreatmentDate(e.target.value)}
                  />
                </div>
                <div className="inputs">
                  <label className="labels">Worker Email:</label>
                  <input
                    className="tbale-input"
                    type="email"
                    required
                    onChange={(e) => setWorkerEmail(e.target.value)}
                  />
                </div>
                <div className="inputs">
                  <label className="labels">Car Number:</label>
                  <input
                    className="tbale-input"
                    type="Number"
                    required
                    onChange={(e) => setCarNumber(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="tbale-btn"
                  onClick={(e) => onAddTreatment(e)}
                />
              </form>
            </Dialog>
          </div>
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  {headers.map((header, _i) => (
                    <th key={_i}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from(tableData.values()).map((item) => (
                  <tr
                    key={item.Treatment_Number}
                    className="table-winery-report-rows"
                  >
                    <td>{item.Treatment_Number}</td>
                    <td>
                      {inEditMode.status &&
                      inEditMode.rowKey === item.Treatment_Number ? (
                        <input
                          type="text"
                          value={treatmentInformation}
                          onChange={(e) =>
                            setTreatmentInformation(e.target.value)
                          }
                        />
                      ) : (
                        item.Treatment_Information
                      )}
                    </td>
                    <td>
                      {inEditMode.status &&
                      inEditMode.rowKey === item.Treatment_Number ? (
                        <input
                          type="date"
                          required
                          value={treatmentDate}
                          onChange={(e) => setTreatmentDate(e.target.value)}
                        />
                      ) : (
                        item.Date
                      )}
                    </td>
                    <td>
                      {inEditMode.status &&
                      inEditMode.rowKey === item.Treatment_Number ? (
                        <input
                          type="email"
                          required
                          value={workerEmail}
                          onChange={(e) => setWorkerEmail(e.target.value)}
                        />
                      ) : (
                        item.Worker_email
                      )}
                    </td>
                    <td>
                      {inEditMode.status &&
                      inEditMode.rowKey === item.Treatment_Number ? (
                        <input
                          type="Number"
                          required
                          value={carNumber}
                          onChange={(e) => setCarNumber(e.target.value)}
                        />
                      ) : (
                        item.Car_Number
                      )}
                    </td>
                    <td>
                      {inEditMode.status &&
                      inEditMode.rowKey === item.Treatment_Number ? (
                        <span>
                          <img
                            className=" tbale-row-btn"
                            onClick={() =>
                              onSave({ id: item.Treatment_Number })
                            }
                            alt="Save"
                            src={save}
                          />
                          <img
                            className=" tbale-row-btn"
                            onClick={() => onCancel()}
                            alt="Cancel"
                            src={cancel}
                          />
                        </span>
                      ) : (
                        <span>
                          <img
                            className=" tbale-row-btn"
                            onClick={() =>
                              onEdit({
                                id: item.Treatment_Number,
                              })
                            }
                            alt="Edit"
                            src={edit}
                          />
                          <img
                            className=" tbale-row-btn"
                            onClick={() =>
                              onDelete({
                                id: item.Treatment_Number,
                              })
                            }
                            src={deleteTrash}
                            alt="Delete"
                          />
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  {headers.map((header, _i) => (
                    <th key={_i}>{header}</th>
                  ))}
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
