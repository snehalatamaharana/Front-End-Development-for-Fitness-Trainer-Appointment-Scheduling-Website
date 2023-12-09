import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import Calendar from "react-calendar";
import "../Style/MainScreenStyles.css";
import AppointmentForm from "../Component/AppointmentForm";
import AppointmentCalendar from "../Component/AppointmentCalendar";
import AppointmentList from "../Component/AppointmentList";

//#region CHECK IN LAST
// const MainScreen = () => {
//   // State for clients
//   const [clients, setClients] = useState([
//     {
//       id: 1,
//       firstName: "John",
//       lastName: "Doe",
//       location: "City, Country",
//       appointments: ["2023-12-10 10:00 AM", "2023-12-15 3:30 PM"],
//     },
//     // Add more initial clients as needed
//   ]);

//   // State for managing new appointment
//   const [newAppointment, setNewAppointment] = useState({
//     clientId: null,
//     appointmentIndex: null,
//     date: new Date(),
//     time: "",
//     location: "",
//   });

//   // State for showing the calendar
//   const [showCalendar, setShowCalendar] = useState(false);

//   // State for appointments on selected date
//   const [appointmentsOnSelectedDate, setAppointmentsOnSelectedDate] = useState(
//     []
//   );

//   // Show success/error notification
//   const showToast = (message, type = "info") => {
//     toast[type](message, { position: toast.POSITION.TOP_RIGHT });
//   };

//   // Add new appointment for a new client
//   const handleAddAppointmentForNewClient = () => {
//     setNewAppointment({
//       clientId: null,
//       appointmentIndex: null,
//       date: new Date(),
//       time: "",
//       location: "",
//     });
//   };

//   // Add a new client
//   const handleAddNewClient = () => {
//     const newClientId = clients.length + 1;
//     setClients([
//       ...clients,
//       {
//         id: newClientId,
//         firstName: "New",
//         lastName: "Client",
//         location: "City, Country",
//         appointments: [],
//       },
//     ]);
//     handleAddAppointmentForNewClient(); // Also add a new appointment for the new client
//   };

//   // Save new appointment
//   const handleSaveAppointment = () => {
//     if (
//       !newAppointment.clientId ||
//       !newAppointment.date ||
//       !newAppointment.time
//     ) {
//       showToast(
//         "Please select a date and time for the new appointment",
//         "error"
//       );
//       return;
//     }

//     const updatedClients = clients.map((client) =>
//       client.id === newAppointment.clientId
//         ? {
//             ...client,
//             appointments: [
//               ...client.appointments,
//               `${newAppointment.date.toDateString()} ${newAppointment.time}`,
//             ],
//           }
//         : client
//     );
//     setClients(updatedClients);
//     setNewAppointment({
//       clientId: null,
//       appointmentIndex: null,
//       date: new Date(),
//       time: "",
//       location: "",
//     });
//     showToast("New appointment added successfully", "success");
//   };

//   // Edit appointment
//   const handleEditAppointment = (clientId, appointmentIndex) => {
//     setNewAppointment({
//       clientId,
//       appointmentIndex,
//       date: new Date(clients[clientId - 1].appointments[appointmentIndex]),
//       time: clients[clientId - 1].appointments[appointmentIndex].split(" ")[1],
//       location: clients[clientId - 1].location,
//     });
//   };

//   // Save edited appointment
//   const handleSaveEditedAppointment = (clientId, appointmentIndex) => {
//     if (!newAppointment.clientId) return;

//     const updatedClients = clients.map((client) =>
//       client.id === newAppointment.clientId
//         ? {
//             ...client,
//             location: newAppointment.location,
//             appointments: client.appointments.map((appointment, index) =>
//               index === newAppointment.appointmentIndex
//                 ? `${newAppointment.date.toDateString()} ${newAppointment.time}`
//                 : appointment
//             ),
//           }
//         : client
//     );
//     setClients(updatedClients);
//     setNewAppointment({
//       clientId: null,
//       appointmentIndex: null,
//       date: new Date(),
//       time: "",
//       location: "",
//     });
//     showToast("Appointment updated successfully", "success");
//   };

//   // Delete appointment
//   const handleDeleteAppointment = (clientId, appointmentIndex) => {
//     const isConfirmed = window.confirm(
//       "Are you sure you want to delete this appointment?"
//     );
//     if (isConfirmed) {
//       const updatedClients = clients.map((client) =>
//         client.id === clientId
//           ? {
//               ...client,
//               appointments: client.appointments.filter(
//                 (_, index) => index !== appointmentIndex
//               ),
//             }
//           : client
//       );
//       setClients(updatedClients);
//       showToast("Appointment deleted successfully", "success");
//     }
//   };

//   // Edit client information inline
//   const handleEditClientInfo = (clientId, field, value) => {
//     setClients((prevClients) =>
//       prevClients.map((client) =>
//         client.id === clientId ? { ...client, [field]: value } : client
//       )
//     );
//   };

//   // Handle calendar date change
//   const handleCalendarDateChange = (date) => {
//     const formattedDate = date.toISOString().split("T")[0];
//     const matchingAppointments = clients
//       .filter((client) => client.appointments.includes(formattedDate))
//       .map((client) => `${client.firstName} ${client.lastName}`);

//     setAppointmentsOnSelectedDate(matchingAppointments);
//   };

//   // Toggle calendar visibility
//   const toggleCalendar = () => {
//     setShowCalendar(!showCalendar);
//   };

//   return (
//     <div className="container mt-4">
//       <h1 className="mb-4">Fitness Trainer App</h1>

//       <div className="row">
//         {clients.map((client) => (
//           <div key={client.id} className="col-lg-6 mb-4">
//             <div className="card">
//               <div className="card-body">
//                 <h5 className="card-title">
//                   {newAppointment.clientId === client.id ? (
//                     <>
//                       <input
//                         type="text"
//                         className="form-control mb-2"
//                         placeholder="First Name"
//                         value={client.firstName}
//                         onChange={(e) =>
//                           handleEditClientInfo(
//                             client.id,
//                             "firstName",
//                             e.target.value
//                           )
//                         }
//                       />
//                       <input
//                         type="text"
//                         className="form-control mb-2"
//                         placeholder="Last Name"
//                         value={client.lastName}
//                         onChange={(e) =>
//                           handleEditClientInfo(
//                             client.id,
//                             "lastName",
//                             e.target.value
//                           )
//                         }
//                       />
//                     </>
//                   ) : (
//                     `${client.firstName} ${client.lastName}`
//                   )}
//                 </h5>

//                 <div className="form-group">
//                   <label>Location:</label>
//                   {newAppointment.clientId === client.id ? (
//                     <input
//                       type="text"
//                       className="form-control mb-2"
//                       placeholder="Location"
//                       value={newAppointment.location}
//                       onChange={(e) =>
//                         setNewAppointment({
//                           ...newAppointment,
//                           location: e.target.value,
//                         })
//                       }
//                     />
//                   ) : (
//                     <span>{client.location}</span>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label>Appointments:</label>
//                   {client.appointments.length > 0 ? (
//                     <ul className="list-group">
//                       {client.appointments.map((appointment, index) => (
//                         <li key={index} className="list-group-item">
//                           {index === newAppointment.appointmentIndex &&
//                           newAppointment.clientId === client.id ? (
//                             <>
//                               <DatePicker
//                                 selected={newAppointment.date}
//                                 onChange={(date) =>
//                                   setNewAppointment({ ...newAppointment, date })
//                                 }
//                                 className="form-control"
//                               />
//                               <input
//                                 type="time"
//                                 className="form-control mt-2"
//                                 value={newAppointment.time}
//                                 onChange={(e) =>
//                                   setNewAppointment({
//                                     ...newAppointment,
//                                     time: e.target.value,
//                                   })
//                                 }
//                               />
//                               <input
//                                 type="text"
//                                 className="form-control mt-2"
//                                 placeholder="Location"
//                                 value={newAppointment.location}
//                                 onChange={(e) =>
//                                   setNewAppointment({
//                                     ...newAppointment,
//                                     location: e.target.value,
//                                   })
//                                 }
//                               />
//                               <button
//                                 className="btn btn-sm btn-success mt-2"
//                                 onClick={() =>
//                                   handleSaveEditedAppointment(client.id, index)
//                                 }
//                               >
//                                 Save
//                               </button>
//                             </>
//                           ) : (
//                             <>
//                               {appointment}
//                               <button
//                                 className="btn btn-sm btn-warning ml-2"
//                                 onClick={() =>
//                                   handleEditAppointment(client.id, index)
//                                 }
//                               >
//                                 Edit
//                               </button>
//                               <button
//                                 className="btn btn-sm btn-danger ml-2"
//                                 onClick={() =>
//                                   handleDeleteAppointment(client.id, index)
//                                 }
//                               >
//                                 Delete
//                               </button>
//                             </>
//                           )}
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <span>No appointments scheduled</span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button className="btn btn-primary" onClick={toggleCalendar}>
//         {showCalendar ? "Hide Calendar" : "Show Calendar"}
//       </button>

//       {showCalendar && (
//         <div className="calendar-container">
//           <Calendar
//             className="react-calendar"
//             value={new Date()}
//             onChange={handleCalendarDateChange}
//             tileContent={({ date, view }) => {
//               if (view === "month") {
//                 const formattedDate = date.toISOString().split("T")[0];
//                 const matchingAppointments = clients
//                   .filter((client) =>
//                     client.appointments.includes(formattedDate)
//                   )
//                   .map((client) => `${client.firstName} ${client.lastName}`);

//                 return matchingAppointments.map((clientName, index) => (
//                   <div key={index} className="calendar-appointment">
//                     {clientName}
//                   </div>
//                 ));
//               }
//               return null;
//             }}
//           />
//           <div className="appointments-on-selected-date">
//             <h3>Appointments on Selected Date:</h3>
//             {appointmentsOnSelectedDate.length > 0 ? (
//               <ul>
//                 {appointmentsOnSelectedDate.map((appointment, index) => (
//                   <li key={index}>{appointment}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No appointments scheduled on the selected date.</p>
//             )}
//           </div>
//         </div>
//       )}

//       <div className="mt-3">
//         <button
//           className="btn btn-sm btn-primary mr-2"
//           onClick={() => handleAddAppointmentForNewClient()}
//         >
//           Add Appointment
//         </button>
//         <button
//           className="btn btn-primary mt-2"
//           onClick={() => handleAddNewClient()}
//         >
//           Add New Client
//         </button>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };
//#endregion

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
    setEditingIndex(null); // Reset editingIndex when the date changes
  };

  const handleFormSubmit = (newAppointment) => {
    if (editingIndex !== null) {
      // If editingIndex is not null, update the existing appointment
      const updatedAppointments = [...appointments];
      updatedAppointments[editingIndex] = newAppointment;
      setAppointments(updatedAppointments);
      setEditingIndex(null); // Reset editingIndex after editing
      notify("Appointment edited successfully!");
    } else {
      // If editingIndex is null, add a new appointment
      setAppointments([...appointments, newAppointment]);
      notify("New appointment scheduled successfully!");
    }

    // Reset form fields
    setFormFields({
      firstName: "",
      lastName: "",
      location: "",
      dateTime: new Date(),
    });
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    // Set the form fields with the values of the appointment being edited
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
