import React, { useState } from 'react';

export const CustomerForm = ({
  firstName,
  lastName,
  phoneNumber,
  onSubmit,
}) => {
  const [customer, setCustomer] = useState({
    firstName,
    lastName,
    phoneNumber,
  });

  const handleChange = ({ target }) =>
    setCustomer((customer) => ({
      ...customer,
      [target.name]: target.value,
    }));
  return (
    <form id="customer" onSubmit={() => onSubmit(customer)}>
      <label htmlFor="firstName">First name</label>
      <input
        onChange={handleChange}
        readOnly
        type="text"
        name={'firstName'}
        id="firstName"
        value={firstName}
      />
      <label htmlFor="lastName">Last name</label>
      <input
        onChange={handleChange}
        readOnly
        type="text"
        name={'lastName'}
        id="lastName"
        value={lastName}
      />
      <label htmlFor="phoneNumber">Phone number</label>
      <input
        onChange={handleChange}
        readOnly
        type="text"
        name={'phoneNumber'}
        id="phoneNumber"
        value={phoneNumber}
      />
    </form>
  );
};
