import React from 'react';
import {
  Appointment,
  AppointmentsDayView
} from '../src/AppointmentsDayView';
import { createContainer } from "./domManipulators";

let container, render, element, elements, click;
let customer;

beforeEach(() => {
  ({render, container, element, elements, click } = createContainer())
});
describe('Appointment', () => {


  const appointmentTable = () => element('#appointmentView > table');

  it('renders a table', () => {
    customer = { firstName: 'Ashley' };
    render(<Appointment customer={customer} />);
    expect(appointmentTable().textContent).not.toBeNull();
  });

  it('renders the customer first name', () => {
    customer = { firstName: 'Ashley' };
    render(<Appointment customer={customer} />);
    expect(appointmentTable().textContent).toMatch('Ashley');
  });

  it('renders another customer first name', () => {
    customer = { firstName: 'Jordan' };
    render(<Appointment customer={customer} />);
    expect(appointmentTable().textContent).toMatch('Jordan');
  });
  it('renders the customer last name', () => {
    customer = { lastName: 'Novak'};
    render(<Appointment customer={customer} />);
    expect(appointmentTable().textContent).toMatch('Novak');
  });
  it('renders the customer phone number', () => {
    customer = { phoneNumber: '7784701540'};
    render(<Appointment customer={customer} />);
    expect(appointmentTable().textContent).toMatch('7784701540');
  });
  it('renders stylist name', () => {
    render(<Appointment customer={customer} stylist="Rocky" />);
    expect(appointmentTable().textContent).toMatch("Rocky")
  });
  it('renders service name', () => {
    render(<Appointment customer={customer} service="Cut" />);
    expect(appointmentTable().textContent).toMatch("Cut");
  });
  it('renders note description', () => {
    render(<Appointment customer={customer} notes="abc" />);
    expect(appointmentTable().textContent).toMatch("abc");
  });
  it('renders a heading with the time', () => {
    const today = new Date();
    const timestamp = today.setHours(9, 0, 0);
    render(<Appointment customer={customer} startsAt={timestamp} />);
    expect(element('h3')).not.toBeNull();
    expect(element('h3').textContent).toEqual("Today’s appointment at 09:00")
  })
});

describe('AppointmentsDayView', () => {
  const today = new Date();
  const appointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: { firstName: 'Ashley' }
    },
    {
      startsAt: today.setHours(13, 0),
      customer: { firstName: 'Jordan' }
    }
  ];

  it('renders a div with the right id', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(
      element('div#appointmentsDayView')
    ).not.toBeNull();
  });

  it('renders multiple appointments in an ol element', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(element('ol')).not.toBeNull();
    expect(element('ol').children).toHaveLength(2);
  });

  it('renders each appointment in an li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(elements('li')).toHaveLength(2);
    expect(
      elements('li')[0].textContent
    ).toEqual('12:00');
    expect(
      elements('li')[1].textContent
    ).toEqual('13:00');
  });

  it('initially shows a message saying there are no appointments today', () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.textContent).toMatch(
      'There are no appointments scheduled for today.'
    );
  });

  it('selects the first appointment by default', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.textContent).toMatch('Ashley');
  });

  it('has a button element in each li', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(elements('li > button')).toHaveLength(
      2
    );
    expect(
      elements('li > button')[0].type
    ).toEqual('button');
  });

  it('renders another appointment when selected', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const button = elements('button')[1];
    click(button);
    expect(container.textContent).toMatch('Jordan');
  });

  it('does not show toogle class when button is not cliced', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const button = elements('button')[1];
    expect(button.className).not.toMatch('toggle');
  });
  it('button has toogle class after click', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const button = elements('button')[1];
    click(button);
    expect(button.className).not.toMatch('toggled');
  });
});
