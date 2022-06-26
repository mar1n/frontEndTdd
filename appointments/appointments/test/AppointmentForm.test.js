import React from 'react';
import { createContainer } from './domManipulators';
import { AppointmentForm } from '../src/AppointmentsDayView';
import ReactTestUtils from 'react-dom/test-utils';
describe('AppointmentForm', () => {
  let render, container;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  const form = (id) => container.querySelector(`form[id="${id}"]`);
  const field = (name) => form('appointment').elements[name];
  const findOption = (dropdownNode, textContent) => {
    const options = Array.from(dropdownNode.childNodes);
    return options.find((option) => {
      return option.textContent === textContent;
    });
  };
  const labelFor = (formElement) =>
    container.querySelector(`label[for="${formElement}"]`);
  it('renders a form', () => {
    render(<AppointmentForm />);
    expect(form('appointment')).not.toBeNull();
  });

  describe('service field', () => {
    it('renders as a select box', () => {
      render(<AppointmentForm />);
      expect(field('service')).not.toBeNull();
      expect(field('service').tagName).toEqual('SELECT');
    });
    it('initially has a blank value chosen', () => {
      render(<AppointmentForm />);
      const firstNode = field('service').childNodes[0];
      expect(firstNode.value).toEqual('');
      expect(firstNode.selected).toBeTruthy();
    });
    it('list all salon services', () => {
      const selectableServices = ['Cut', 'Blow-dry'];
      render(
        <AppointmentForm selectableServices={selectableServices} />
      );
      const optionNodes = Array.from(field('service').childNodes);
      const renderedServices = optionNodes.map(
        (node) => node.textContent
      );
      expect(renderedServices).toEqual(
        expect.arrayContaining(selectableServices)
      );
    });
    it('pre-selects the existing value', () => {
      const services = ['Cut', 'Blow-dry'];
      render(
        <AppointmentForm
          selectableServices={services}
          service="Blow-dry"
        />
      );
      const option = findOption(field('service'), 'Blow-dry');
      expect(option.selected).toBeTruthy();
    });
    it('renders a label', () => {
      render(<AppointmentForm />);
      expect(labelFor('appointmentLabel')).not.toBeNull();
      expect(labelFor('appointmentLabel').textContent).toEqual(
        'Appointment'
      );
    });
    it('assign an id that matches the label id', () => {
      render(<AppointmentForm />);
      expect(labelFor('appointmentLabel').id).toEqual(
        'appointment'
      );
    });
    it('has a submit button', () => {
      render(<AppointmentForm />);
      const submitButton = container.querySelector(
        'input[type="submit"]'
      );
      expect(submitButton).not.toBeNull();
    });
    it('saves existing value when submitted', async () => {
      expect.hasAssertions();
      render(
        <AppointmentForm
          service="Cut"
          onSubmit={({ service }) =>
            expect(service).toEqual('Cut')
          }
        />
      );
      await ReactTestUtils.Simulate.submit(form('appointment'));
    });
  });

  it('saves new value when submitted', async () => {
    expect.hasAssertions();
    render(
      <AppointmentForm
        service="Blow-dry"
        onSubmit={({ service }) => expect(service).toEqual('Cut')}
      />
    );
    await ReactTestUtils.Simulate.change(field('service'), {
      target: { value: 'Cut', name: 'service' },
    });
    await ReactTestUtils.Simulate.submit(form('appointment'));
  });
});
