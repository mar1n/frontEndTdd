import React, { useCallback, useEffect, useState } from 'react';
const CustomerRow = ({ customer }) => (
    <tr>
      <td>{customer.firstName}</td>
      <td>{customer.lastName}</td>
      <td>{customer.phoneNumber}</td>
      <td />
    </tr>
  );

const SearchButtons = ({ handleNext, handlePrevious }) => (
    <div className="button-bar">
        <button role="button" id="next-page" onClick={handleNext}>Next</button>
        <button role="button" id="previous-page" onClick={handlePrevious}>Previous</button>
    </div>
)

export const CustomerSearch = () => {
  const [customers, setCustomers] = useState([]);
  const [queryString, setQueryString] = useState('');

  useEffect(() => {
    const featchData = async () => {
      const result = await window.fetch(`/customers${queryString}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
      });
      setCustomers(await result.json());
    };
    featchData();
  }, [queryString]);
  const handleNext = useCallback(async () => {
    const after = customers[customers.length - 1].id;
    const newQueryString = `?after=${after}`;
    setQueryString(newQueryString)
    const url = `/customers?after=${after}`;
    const result = await window.fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' }
    });
    setCustomers(await result.json());
    }, [customers]);
    const handlePrevious = useCallback(() => setQueryString(''), []);
  return (
    <React.Fragment>
        <SearchButtons handleNext={handleNext} handlePrevious={handlePrevious} />
    <table>
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Phone number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(customer => (
          <CustomerRow customer={customer} key={customer.id} />
        ))}
      </tbody>
    </table>
    </React.Fragment>
  );
};
