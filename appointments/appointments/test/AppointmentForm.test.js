import React from 'react';
import { createContainer } from './domManipulators';
import { AppointmentForm } from '../src/AppointmentForm';
import ReactTestUtils from 'react-dom/test-utils';

describe('AppointmentForm', () => {
  let render, container, form, field, labelFor, element, elements;

  beforeEach(() => {
    ({ render, container, form, field, labelFor, element, elements } = createContainer());
  });

  const findOption = (dropdownNode, textContent) => {
    const options = Array.from(dropdownNode.childNodes);
    return options.find((option) => {
      return option.textContent === textContent;
    });
  };

  

  it('renders a form', () => {
    render(<AppointmentForm />);
    expect(form('appointment')).not.toBeNull();
  });

  describe('service field', () => {
    it('renders as a select box', () => {
      render(<AppointmentForm />);
      expect(field('appointment','service')).not.toBeNull();
      expect(field('appointment', 'service').tagName).toEqual('SELECT');
    });
    it('initially has a blank value chosen', () => {
      render(<AppointmentForm />);
      const firstNode = field('appointment','service').childNodes[0];
      expect(firstNode.value).toEqual('');
      expect(firstNode.selected).toBeTruthy();
    });
    it('list all salon services', () => {
      const selectableServices = ['Cut', 'Blow-dry'];
      render(
        <AppointmentForm selectableServices={selectableServices} />
      );
      const optionNodes = Array.from(field('appointment','service').childNodes);
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
      const option = findOption(field('appointment','service'), 'Blow-dry');
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
      const submitButton = element(
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
    it('saves new value when submitted', async () => {
      expect.hasAssertions();
      render(
        <AppointmentForm
          service="Blow-dry"
          onSubmit={({ service }) =>
            expect(service).toEqual('Cut')
          }
        />
      );
      await ReactTestUtils.Simulate.change(field('appointment','service'), {
        target: { value: 'Cut', name: 'service' },
      });
      await ReactTestUtils.Simulate.submit(form('appointment'));
    });
    const timeSlotTable = () =>
      element('table#time-slots');
    const startsAtField = (index) =>
      elements(`input[name="startsAt"]`)[index];

    describe('time slot table', () => {
      const today = new Date();
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0) },
        { startsAt: today.setHours(9, 30, 0, 0) },
      ];
      it('renders a table for time slots', () => {
        render(<AppointmentForm />);
        expect(timeSlotTable()).not.toBeNull();
      });
      it('renders a time slot for every half an hour between open and close times', () => {
        render(
          <AppointmentForm salonOpensAt={9} salonClosesAt={11} />
        );
        const timesOfDay =
          timeSlotTable().querySelectorAll('tbody >* th');
        expect(timesOfDay).toHaveLength(4);
        expect(timesOfDay[0].textContent).toEqual('09:00');
        expect(timesOfDay[1].textContent).toEqual('09:30');
        expect(timesOfDay[3].textContent).toEqual('10:30');
      });
      it('renders an empty cell at the start of the header row', () => {
        render(<AppointmentForm />);
        const headerRow =
          timeSlotTable().querySelector('thead > tr');
        expect(headerRow.firstChild.textContent).toEqual('');
      });
      it('renders a week of available dates', () => {
        const today = new Date(2018, 11, 1);
        render(<AppointmentForm today={today} />);
        const dates = timeSlotTable().querySelectorAll(
          'thead >* th:not(:first-child)'
        );
        expect(dates).toHaveLength(7);
        expect(dates[0].textContent).toEqual('Sat 01');
        expect(dates[1].textContent).toEqual('Sun 02');
        expect(dates[6].textContent).toEqual('Fri 07');
      });
      it('renders a radio button for each time slot', () => {
        render(
          <AppointmentForm
            availableTimeSlots={availableTimeSlots}
          />
        );
        const cells = timeSlotTable().querySelectorAll('td');
        expect(
          cells[0].querySelector('input[type="radio"]')
        ).not.toBeNull();
        expect(
          cells[7].querySelector('input[type="radio"]')
        ).not.toBeNull();
      });
      it('does not render radio buttons for unavailable time slots', () => {
        render(<AppointmentForm availableTimeSlots={[]} />);
        const timesOfDay =
          timeSlotTable().querySelectorAll('input');
        expect(timesOfDay).toHaveLength(0);
      });
      it('sets radio button values to the index of the corresponding appointment', () => {
        render(
          <AppointmentForm
            availableTimeSlots={availableTimeSlots}
            today={today}
          />
        );
        expect(startsAtField(0).value).toEqual(
          availableTimeSlots[0].startsAt.toString()
        );
        expect(startsAtField(1).value).toEqual(
          availableTimeSlots[1].startsAt.toString()
        );
      });
      it('saves new value when submitted', () => {
        expect.hasAssertions();
        render(
          <AppointmentForm
            availableTimeSlots={availableTimeSlots}
            today={today}
            startsAt={availableTimeSlots[0].startsAt}
            onSubmit={({ startsAt }) =>
              expect(startsAt).toEqual(
                availableTimeSlots[1].startsAt
              )
            }
          />
        );
        ReactTestUtils.Simulate.change(startsAtField(1), {
          target: {
            value: availableTimeSlots[1].startsAt.toString(),
            name: 'startsAt',
          },
        });
        ReactTestUtils.Simulate.submit(form('appointment'));
      });
      it('filters appointments by selected stylist', () => {
        const availableTimeSlots = [
          {
            startsAt: today.setHours(9, 0, 0, 0),
            stylists: ['A', 'B'],
          },
          {
            startsAt: today.setHours(9, 30, 0, 0),
            stylists: ['A'],
          },
        ];

        render(
          <AppointmentForm
            availableTimeSlots={availableTimeSlots}
            today={today}
          />
        );

        ReactTestUtils.Simulate.change(field('appointment','stylist'), {
          target: { value: 'B', name: 'stylist' },
        });

        const cells = timeSlotTable().querySelectorAll('td');
        expect(
          cells[0].querySelector('input[type="radio"]')
        ).not.toBeNull();
        expect(
          cells[7].querySelector('input[type="radio"]')
        ).toBeNull();
      });
    });
  });
});
