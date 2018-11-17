import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { collections } from '../constants';

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.LAMBDA_ENDPOINT}/customers`, {
      method: 'POST',
      body: JSON.stringify({}),
    })
      .then(response => {
        response.json().then(({ customers }) => {
          setCustomers(customers);
        });
      })
      .catch(err => {
        console.log('client side error', err);
        alert('There was an issue fetching the customers');
      });
  }, []);

  console.log(customers);

  return (
    <div style={{ padding: '30px 20px' }}>
      <h2>Our Customers {customers.length > 0 && `(${customers.length})`}</h2>
      <div className="table">
        <div className="row header">
          <div className="cell">Last Message</div>
          <div className="cell">Opt-in Status</div>
          <div className="cell">Recipient First Name</div>
          <div className="cell">Phone Number</div>
          <div className="cell">Collection</div>
          <div className="cell">Recipient Timezone</div>
          <div className="cell">Customer</div>
        </div>
        {customers.map(customer => (
          <div className="row" key={customer.id}>
            <div className="cell" data-title="Last Message">
              {customer.metadata.lastSentDate
                ? moment(customer.metadata.lastSentDate).fromNow()
                : 'Never'}
            </div>
            <div className="cell" data-title="Opt-in Status">
              {customer.metadata.optinStatus || 'Not sent'}
            </div>
            <div className="cell" data-title="Recipient First Name">
              {customer.metadata.recipientFirstName}
            </div>
            <div className="cell" data-title="Phone Number">
              {customer.metadata.recipientPhoneNumber}
            </div>
            <div className="cell" data-title="Collection">
              {collections[customer.metadata.collectionId]
                ? collections[customer.metadata.collectionId].name
                : 'None'}
            </div>
            <div className="cell" data-title="Recipient Timezone">
              {customer.metadata.recipientTimezone || 'No collected'}
            </div>
            <div className="cell" data-title="Customer">
              {customer.metadata.customerName || 'No name'} (
              {customer.metadata.customerEmail || 'No email address'})
            </div>
          </div>
        ))}
      </div>
      {customers.length === 0 && (
        <div style={{ padding: '10px', textAlign: 'center' }}>Loading...</div>
      )}
      <style jsx>{`
        h2 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 20px;
          text-align: center;
        }

        .table {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
          display: table;
          width: 100%;
        }

        .row {
          background: #f6f6f6;
          display: table-row;
        }

        .row:nth-of-type(odd) {
          background: #e9e9e9;
        }

        .row.header {
          background: #ee447d;
          color: #ffffff;
          font-weight: 900;
        }

        .cell {
          display: table-cell;
          padding: 6px 12px;
        }

        @media only screen and (max-width: 600px) {
          .table {
            display: block;
          }

          .row {
            display: block;
            padding: 14px 0 7px;
          }

          .row.header {
            padding: 0;
            height: 6px;
          }

          .row.header.cell {
            display: none;
          }

          .cell {
            display: block
            margin-bottom: 10px;
            padding: 2px 16px
          }

          .cell::before {
            margin-bottom: 3px;
            content: attr(data-title);
            min-width: 98px;
            font-size: 10px;
            line-height: 10px;
            font-weight: bold;
            text-transform: uppercase;
            color: #969696;
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomerTable;
