import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentList = ({ appointments, onEdit, onDelete }) => {
  const notify = (action) => {
    toast.success(`Appointment ${action} successfully!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <div>
      <h2>Appointments for Selected Date</h2>
      <ul>
        {appointments.map((appointment, index) => (
          <li key={index}>
            <strong>Name:</strong> {appointment.firstName}{" "}
            {appointment.lastName}, &nbsp;
            <strong>Location:</strong> {appointment.location}, &nbsp;
            <strong>Date Time:</strong>{" "}
            {new Date(appointment.dateTime).toLocaleString()}
            <div
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                
              }}
            >
              <button
                onClick={() => {
                  onEdit(index);
                  notify("edited");
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete(index);
                  notify("deleted");
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
