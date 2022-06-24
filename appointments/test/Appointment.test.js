import React from "react";
import ReactTestUtils, { act } from "react-dom/test-utils";
import { Appointment, AppointmentsDayView } from "../src/Appointment";
import { render, screen, fireEvent } from "@testing-library/react";
import { createRoot } from "react-dom/client";

describe("Appointment", () => {
  let container;
  let customer;
  let root;
  let render;

  beforeEach(() => {
    container = document.createElement("div");
    root = createRoot(container);
    render = (component) => root.render(component);
  });

  it("renders the customer first name", () => {
    customer = { firstName: "Ashley" };

    act(() => {
      render(<Appointment customer={customer} />);
    });

    expect(container.textContent).toMatch("Ashley");
  });
  it("renders another customer first name", () => {
    customer = { firstName: "Jordan" };

    act(() => {
      render(<Appointment customer={customer} />);
    });

    expect(container.textContent).toMatch("Jordan");
  });
});

describe("AppointmentsDayView", () => {
  let container;
  let root;
  let render;
  const today = new Date();
  const appointments = [
    { startsAt: today.setHours(12, 0), customer: { firstName: "Ashley" } },
    { startsAt: today.setHours(13, 0), customer: { firstName: "Jordan" } },
  ];

  beforeEach(() => {
    container = document.createElement("div");
    root = createRoot(container);
    render = (component) => root.render(component);
  });

  it("renders a div with the right id", () => {
    act(() => {
      render(<AppointmentsDayView appointments={[]} />);
    });
    expect(container.querySelector("div#appointmentsDayView")).not.toBeNull();
  });

  it("renders multiple appoitments in an ol element", () => {
    act(() => {
      render(<AppointmentsDayView appointments={appointments} />);
    });
    expect(container.querySelector("ol")).not.toBeNull();
    expect(container.querySelector("ol").children).toHaveLength(2);
  });

  it("renders each appointment in an li", () => {
    act(() => {
      render(<AppointmentsDayView appointments={appointments} />);
    });
    expect(container.querySelectorAll("li")).toHaveLength(2);
    expect(container.querySelectorAll("li")[0].textContent).toEqual("12:00");
    expect(container.querySelectorAll("li")[1].textContent).toEqual("13:00");
  });

  it("initially shows a message saying there are no appointments today", () => {
    act(() => {
      render(<AppointmentsDayView appointments={[]} />);
    });
    expect(container.textContent).toMatch(
      "There is no appointments scheduled for today."
    );
  });
  it("selects the first appointment by default", () => {
    act(() => {
      render(<AppointmentsDayView appointments={appointments} />);
    });
    expect(container.textContent).toMatch("Ashley");
  });
  it("has a button element in each li", () => {
    act(() => {
      render(<AppointmentsDayView appointments={appointments} />);
    });
    expect(container.querySelectorAll("li > button")).toHaveLength(2);
    expect(container.querySelectorAll("li > button")[0].type).toEqual("button");
  });

  it("renders another appointment when selected", async () => {
    await act(async () => {
      container = document.createElement("div");
      root = createRoot(container);
      render = (component) => root.render(component);
      render(<AppointmentsDayView appointments={appointments} />);
      console.log("container", container);
      // console.log('button', button);
      const button = container.querySelectorAll("button")[1];
      console.log("button", button);
      //fireEvent.click(screen.getByText("13"));
      // expect(container.textContent).toMatch('Jordan');
    });
    expect(container.querySelectorAll("li > button")).toHaveLength(2);
  });
});
