import React from 'react';
import { act } from 'react-dom/test-utils';
import { Appointment } from '../src/Appointment';
import { render, screen } from '@testing-library/react';
import {createRoot} from 'react-dom/client';

describe("Appointment", () => {
  it("renders the customer first name", () => {
    const customer = { firstName: "Ashley" };
    const component = <Appointment customer={customer} />;
    const rootContainer = document.createElement("div");

    const root = createRoot(rootContainer);

    act(() => {
      root.render(component);
    })

    expect(rootContainer.textContent).toMatch("Ashley");
  });
  it('renders another customer first name', () => {
    const customer = { firstName: "Jordan" };
    const component = <Appointment customer={customer} />;
    const rootContainer = document.createElement("div");

    const root = createRoot(rootContainer);
    
    act(() => {
      root.render(component);
    })
    
    expect(rootContainer.textContent).toMatch("Jordan");
  });
});
