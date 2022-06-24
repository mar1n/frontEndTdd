import React from 'react';
import { act } from 'react-dom/test-utils';
import { Appointment, AppointmentsDayView } from '../src/Appointment';
import { render, screen } from '@testing-library/react';
import {createRoot} from 'react-dom/client';



describe("Appointment", () => {
  let container;
  let customer;
  let root;
  let render;

  beforeEach(() => {
    container = document.createElement('div');
    root = createRoot(container);
    render = component => root.render(component);
  })

  
  it("renders the customer first name", () => {
    customer = { firstName: "Ashley" };
    
    act(() => {
      render(<Appointment customer={customer} />);
    })

    expect(container.textContent).toMatch("Ashley");
  });
  it('renders another customer first name', () => {
    customer = { firstName: "Jordan" };

    act(() => {
      render(<Appointment customer={customer} />);
    })
    
    expect(container.textContent).toMatch("Jordan");
  });
});

describe('AppointmentsDayView', () => {
  let container;
  let root;
  let render;

  beforeEach(() => {
    container = document.createElement('div');
    root = createRoot(container);
    render = component => root.render(component);
  })

  it('renders a div with the right id', () => {
    act(() => {
      render(<AppointmentsDayView appointments={[]} />);
    })
    expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
  });

  it('renders multiple appoitments in an ol element', () => {
    const today = new Date();
    const appointments = [
      { startsAt: today.setHours(12, 0) },
      { startsAt: today.setHours(13, 0)}
    ];

    act(() => {
      render(<AppointmentsDayView appointments={appointments} />);
    });
    expect(container.querySelector('ol')).not.toBeNull();
    expect(container.querySelector('ol').children).toHaveLength(2);
  });
});
