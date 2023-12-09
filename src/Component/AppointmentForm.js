import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Style/AppointmentForm.css";

const AppointmentForm = ({ onSubmit, formFields, setFormFields }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formFields);
    setFormFields({
      firstName: "",
      lastName: "",
      location: "",
      dateTime: new Date(),
    });
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={formFields.firstName}
          onChange={(e) =>
            setFormFields({ ...formFields, firstName: e.target.value })
          }
        />
      </label>

      <label>
        Last Name:
        <input
          type="text"
          value={formFields.lastName}
          onChange={(e) =>
            setFormFields({ ...formFields, lastName: e.target.value })
          }
        />
      </label>

      <label>
        Location:
        <input
          type="text"
          value={formFields.location}
          onChange={(e) =>
            setFormFields({ ...formFields, location: e.target.value })
          }
        />
      </label>

      <label>
        Appointment Date Time:
        <DatePicker
          selected={formFields.dateTime}
          onChange={(date) => setFormFields({ ...formFields, dateTime: date })}
          showTimeSelect
          dateFormat="Pp"
        />
      </label>

      <button type="submit">Schedule Appointment</button>
    </form>
  );
};

export default AppointmentForm;
