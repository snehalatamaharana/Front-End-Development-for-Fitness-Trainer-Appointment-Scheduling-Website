import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AppointmentCalendar = ({ selectedDate, onDateChange }) => {
  return (
    <div>
      <label>Select Date:</label>
      <DatePicker selected={selectedDate} onChange={onDateChange} />
    </div>
  );
};

export default AppointmentCalendar;
