import React from 'react';
import ReactDOM from 'react-dom';
import { Appointment } from '../src/Appointment';
import { render, screen } from '@testing-library/react';

describe("Appointment", () => {
  it("renders the customer first name", () => {
    const customer = { firstName: "Ashley" };

    render(<Appointment customer={customer} />);
    expect(document.body.textContent).toMatch("Ashley");
  });
});
