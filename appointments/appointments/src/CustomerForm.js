import React, { useState } from 'react';

export const CustomerForm = ({
  firstName,
  lastName,
  phoneNumber,
  onSubmit,
  fetch,
}) => {
  const [customer, setCustomer] = useState({
    firstName,
    lastName,
    phoneNumber,
  });

  const handleSubmit = () => {
    window.fetch('/customers', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer)
    });
  };
  const handleChange = ({ target }) =>
    setCustomer((customer) => ({
      ...customer,
      [target.name]: target.value,
    }));
  return (
    <form
      onChange={handleChange}
      id="customer" onSubmit={handleSubmit}>
      <label htmlFor="firstName">First name</label>
      <input
        readOnly
        type="text"
        name={'firstName'}
        id="firstName"
        value={firstName}
      />
      <label htmlFor="lastName">Last name</label>
      <input
        readOnly
        type="text"
        name={'lastName'}
        id="lastName"
        value={lastName}
      />
      <label htmlFor="phoneNumber">Phone number</label>
      <input
        readOnly
        type="text"
        name={'phoneNumber'}
        id="phoneNumber"
        value={phoneNumber}
      />
      <input type="submit" value="Add" />
    </form>
  );
};
