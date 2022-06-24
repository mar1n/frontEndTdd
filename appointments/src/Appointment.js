import React from "react";
const appointmentTimeOfDay = (startsAt) => {
  const [h, m] = new Date(startsAt).toTimeString().split(":");
  return `${h}:${m}`;
};

export const Appointment = ({ customer: { firstName } }) => (
  <div>{firstName}</div>
);

export const AppointmentsDayView = ({ appointments }) => (
  <div id='appointmentsDayView'>
    <ol>
      {appointments.map((appointment, index) => (
        <li key={appointment.startsAt}>
          {appointmentTimeOfDay(appointment.startsAt)}
        </li>
      ))}
    </ol>
    {appointments.length === 0 ? (
      <p>There is no appointments scheduled for today.</p>
    ) : (
      <Appointment {...appointments[0]} />
    )}
  </div>
);
