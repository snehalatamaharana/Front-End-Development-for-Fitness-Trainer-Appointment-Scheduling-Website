import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Style/MainScreenStyles.css";
import AppointmentForm from "../Component/AppointmentForm";
import AppointmentCalendar from "../Component/AppointmentCalendar";
import AppointmentList from "../Component/AppointmentList";

const MainScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingIndex, setEditingIndex] = useState(null);
  const [formFields, setFormFields] = useState({
    firstName: "",
    lastName: "",
    location: "",
    dateTime: new Date(),
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setEditingIndex(null);
  };

  const handleFormSubmit = (newAppointment) => {
    if (editingIndex !== null) {
      const updatedAppointments = [...appointments];
      updatedAppointments[editingIndex] = newAppointment;
      setAppointments(updatedAppointments);
      setEditingIndex(null);
      notify("Appointment edited successfully!");
    } else {
      setAppointments([...appointments, newAppointment]);
      notify("New appointment scheduled successfully!");
    }
    setFormFields({
      firstName: "",
      lastName: "",
      location: "",
      dateTime: new Date(),
    });
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const { firstName, lastName, location, dateTime } = appointments[index];
    setFormFields({
      firstName,
      lastName,
      location,
      dateTime: new Date(dateTime),
    });
  };

  const handleDelete = (index) => {
    const updatedAppointments = [...appointments];
    updatedAppointments.splice(index, 1);
    setAppointments(updatedAppointments);
    notify("Appointment deleted successfully!");
  };

  const notify = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Fitness Trainer Appointment Scheduling</h1>
      </header>
      <div className="form-container">
        <AppointmentForm
          onSubmit={handleFormSubmit}
          formFields={formFields}
          setFormFields={setFormFields}
        />
        <AppointmentCalendar
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      </div>
      <div className="list-container">
        <AppointmentList
          appointments={appointments.filter(
            (appointment) =>
              new Date(appointment.dateTime).toDateString() ===
              selectedDate.toDateString()
          )}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default MainScreen;
