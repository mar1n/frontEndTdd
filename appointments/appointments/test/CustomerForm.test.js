import React from 'react';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { fetchResponseOk, fetchResponseError, fetchRequestBody } from './spyHelpers';

describe('CustomerForm', () => {
  let render, container, form, field, labelFor, element;

  const originalFetch = window.fetch;
  let fetchSpy;

  beforeEach(() => {
    ({ render, container, form, field, labelFor, element } = createContainer());
    fetchSpy = jest.fn(() => fetchResponseOk({}))
    window.fetch = fetchSpy
  });

  afterEach(() => {
    window.fetch = originalFetch;
  })

  

  const expectToBeInputFieldOfTypeText = (formElement) => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  };

  const itRendersAsATextBox = (fieldName) =>
    it('renders as a text box', () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field('customer', fieldName));
    });

  const itIncludesTheExistingValue = (fieldName) =>
    it('includes the existing value', () => {
      render(<CustomerForm {...{ [fieldName]: 'value' }} />);
      expect(field('customer', fieldName).value).toEqual('value');
    });

  const itRendersALabel = (fieldName, lableText) =>
    it('renders a label', () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(lableText);
    });

  const itAssignAnIdThatMatchesLabelId = (fieldName) =>
    it('assign an id that matches the label id', () => {
      render(<CustomerForm />);
      expect(field('customer', fieldName).id).toEqual(fieldName);
    });
  const itSubmitsExistingValue = (fieldName, value) =>
    it('saves existing value when submitted', async () => {
      render(
        <CustomerForm
          {...{ [fieldName]: value }}
        />
      );
      await ReactTestUtils.Simulate.submit(form('customer'));
      
      expect(fetchRequestBody(fetchSpy)).toMatchObject({ [fieldName]: value });
    });
  const itSubmitsNewValue = (fieldName, value) =>
    it('saves new value when submitted', async () => {
      render(
        <CustomerForm
          {...{ [fieldName]: 'existingValue' }}
        />
      );
      await ReactTestUtils.Simulate.change(field('customer', fieldName), {
        target: { value: value, name: fieldName },
      });
      await ReactTestUtils.Simulate.submit(form('customer'));
      expect(fetchRequestBody(fetchSpy)).toMatchObject({
        [fieldName]: value
      })
    });
  it('renders a form', () => {
    render(<CustomerForm />);
    expect(form('customer')).not.toBeNull();
  });

  it('has a submit button', () => {
    render(<CustomerForm />);
    const submitButton = element(
      'input[type="submit"]'
    );
    expect(submitButton).not.toBeNull();
  });
  it('calls fetch with the right properties when submitting data', async () => {
    render(<CustomerForm />);
    ReactTestUtils.Simulate.submit(form('customer'));
    
    expect(fetchSpy).toHaveBeenCalledWith(
      '/customers',
      expect.objectContaining({
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json'}
      })
    )
  });
  it('notifies onSave when form is submitted', async () => {
    const customer = { id: 123 };
    fetchSpy.mockReturnValue(fetchResponseOk(customer));
    const saveSpy = jest.fn();
    
    render(<CustomerForm onSave={saveSpy} />);
    await act(async () => {
      ReactTestUtils.Simulate.submit(form('customer'));
    })

    expect(saveSpy).toHaveBeenCalledWith(customer);
  });
  it('does not notify onSave if the POST request return an error', async () => {
    fetchSpy.mockReturnValue(fetchResponseError());
    const saveSpy = jest.fn();

    render(<CustomerForm onSave={saveSpy} />);
    await act(async () => {
      ReactTestUtils.Simulate.submit(form('customer'));
    })

    expect(saveSpy).not.toHaveBeenCalled();
  });
  it('prevents the default action when submitting the form', async () => {
    const preventDefaultSpy = jest.fn();

    render(<CustomerForm />);
    await act (async () => {
      ReactTestUtils.Simulate.submit(form('customer'), {
        preventDefault: preventDefaultSpy
      })
    })
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
  it('renders error message when fetch call fails', async () => {
    fetchSpy.mockReturnValue(Promise.resolve({ ok: false }));

    render(<CustomerForm />);
    await act(async () => {
      ReactTestUtils.Simulate.submit(form('customer'));
    });

    const errorElement = element('.error');
    expect(errorElement).not.toBeNull();
    expect(errorElement.textContent).toMatch('An error occurred during save.');
  });
  describe('first name field', () => {
    itRendersAsATextBox('firstName');
    itIncludesTheExistingValue('firstName');
    itRendersALabel('firstName', 'First name');
    itAssignAnIdThatMatchesLabelId('firstName');
    itSubmitsExistingValue('firstName', 'Ashley');
    itSubmitsNewValue('firstName', 'Jacke');
  });
  describe('Last name field', () => {
    itRendersAsATextBox('lastName');
    itIncludesTheExistingValue('lastName');
    itRendersALabel('lastName', 'Last name');
    itAssignAnIdThatMatchesLabelId('lastName');
    itSubmitsExistingValue('lastName', 'Ashley');
    itSubmitsNewValue('lastName', 'Jacke');
  });
  describe('Phone Number field', () => {
    itRendersAsATextBox('phoneNumber');
    itIncludesTheExistingValue('phoneNumber');
    itRendersALabel('phoneNumber', 'Phone number');
    itAssignAnIdThatMatchesLabelId('phoneNumber');
    itSubmitsExistingValue('phoneNumber', '123456789');
    itSubmitsNewValue('phoneNumber', '987654321');
  });
});
