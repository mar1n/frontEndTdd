import React, { useState } from 'react';
const toTimeValue = (timestamp) =>
  new Date(timestamp).toTimeString().substring(0, 5);

const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2;
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
  const increment = 30 * 60 * 1000;
  return Array(totalSlots)
    .fill([startTime])
    .reduce((acc, _, i) =>
      acc.concat([startTime + i * increment])
    );
};

const weeklyDateValues = (startDate) => {
  const midnight = new Date(startDate).setHours(0, 0, 0, 0);
  const increment = 24 * 60 * 60 * 1000;
  return Array(7)
    .fill([midnight])
    .reduce((acc, _, i) => acc.concat([midnight + i * increment]));
};

const toShortDate = (timestamp) => {
  const [day, , dayOfMonth] = new Date(timestamp)
    .toDateString()
    .split(' ');
  return `${day} ${dayOfMonth}`;
};

const TimeSlotTable = ({ salonOpensAt, salonClosesAt, today }) => {
  const dates = weeklyDateValues(today);
  const timeSlots = dailyTimeSlots(salonOpensAt, salonClosesAt);
  return (
    <table id="time-slots">
      <thead>
        <tr>
          <th></th>
          {dates.map(d => (
            <th key={d}>{toShortDate(d)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((timeSlot) => (
          <tr key={timeSlot}>
            <th>{toTimeValue(timeSlot)}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const AppointmentForm = ({
  selectableServices,
  service,
  onSubmit,
  salonOpensAt,
  salonClosesAt,
  today,
}) => {
  const [appointment, setAppointment] = useState({ service });
  const handleServiceChange = ({ target: { value } }) =>
    setAppointment({
      ...appointment,
      service: value,
    });
  return (
    <form id="appointment" onSubmit={() => onSubmit(appointment)}>
      <label
        htmlFor="appointmentLabel"
        name="appointmentLabel"
        id="appointment">
        Appointment
      </label>
      <select
        name="service"
        value={service}
        onChange={handleServiceChange}
        readOnly>
        <option />
        {selectableServices.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <input type="submit" value="GO" />
      <TimeSlotTable
        salonClosesAt={salonClosesAt}
        salonOpensAt={salonOpensAt}
        today={today}
      />
    </form>
  );
};

AppointmentForm.defaultProps = {
  salonOpensAt: 9,
  salonClosesAt: 19,
  today: new Date(),
  selectableServices: [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions',
  ],
};
