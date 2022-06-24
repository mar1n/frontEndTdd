import React from 'react';
import { act } from 'react-dom/test-utils';
import { Appointment } from '../src/Appointment';
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
