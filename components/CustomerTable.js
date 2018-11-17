import React, { useEffect, useState } from 'react';

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch the data from Stripe
  }, []);

  console.log(customers);

  return (
    <div className="wrapper">
      <h2>Our Customers</h2>
      {customers.map(customer => (
        <div>{customer.name}</div>
      ))}
      {customers.length === 0 && (
        <div style={{ textAlign: 'center' }}>No customers yet :(</div>
      )}
      <style jsx>{`
        .wrapper {
          margin-top: 30px;
        }

        h2 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default CustomerTable;
