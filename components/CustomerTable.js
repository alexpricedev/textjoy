import React, { useEffect, useState } from 'react';
import moment from 'moment';

import Button from '../components/Button';
import { collections, optinStatuses, timezones } from '../constants';
import fetchCharges from '../helpers/fetch-charges';
import sendMessage from '../helpers/send-message';

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);

  // Get the customers on mount
  useEffect(() => fetchCharges(setCustomers), []);

  // Function to that takes the data to send and then refreshes
  // the customer list
  const send = sendMessage(() => fetchCharges(setCustomers));

  return (
    <div style={{ padding: '30px 20px' }}>
      <h2>Our Customers {customers.length > 0 && `(${customers.length})`}</h2>
      <div className="table">
        <div className="row header">
          <div className="cell">Last Message</div>
          <div className="cell"># Sent</div>
          <div className="cell">Opt-in Status</div>
          <div className="cell">Recipient Name</div>
          <div className="cell">Current Time</div>
          <div className="cell">Phone Number</div>
          <div className="cell">Collection</div>
          <div className="cell">Customer</div>
          <div className="cell">Actions</div>
        </div>
        {customers.map(customer => {
          const res = timezones.find(
            tz => tz.name === customer.metadata.recipientTimezone,
          );

          const offset = res ? res.offset : 0;

          return (
            <div className="row" key={customer.id}>
              <div className="cell" data-title="Last Message">
                {customer.metadata.lastSentDate
                  ? moment(customer.metadata.lastSentDate).fromNow()
                  : 'Never'}
              </div>
              <div className="cell" data-title="# Messages Sent">
                {customer.metadata.nOfLastMessage || '0'}
              </div>
              <div
                className="cell"
                style={{ textTransform: 'capitalize' }}
                data-title="Opt-in Status"
              >
                {customer.metadata.optinStatus || 'Pending'}
              </div>
              <div className="cell" data-title="Recipient First Name">
                {customer.metadata.recipientFirstName}
              </div>
              <div className="cell" data-title="Recipient Timezone">
                {moment()
                  .add(offset || 0, 'hours')
                  .format('hh:mmA')}
              </div>
              <div className="cell" data-title="Phone Number">
                {customer.metadata.recipientPhoneNumber}
              </div>
              <div className="cell" data-title="Collection">
                {collections[customer.metadata.collectionId]
                  ? collections[customer.metadata.collectionId].name
                  : 'None'}
              </div>
              <div className="cell" data-title="Customer">
                {customer.metadata.customerName || 'No name'} (
                {customer.receipt_email || ''})
              </div>
              <div className="cell" data-title="Actions">
                {customer.metadata.optinStatus === optinStatuses.accepted && (
                  <Button
                    onClick={e => {
                      e.preventDefault();
                      // Get the message by injecting their first name into it
                      const message = collections[
                        customer.metadata.collectionId
                      ].messages[customer.metadata.nOfLastMessage || 0](
                        customer.metadata.recipientFirstName,
                      );
                      send({
                        message,
                        metadata: customer.metadata,
                        chargeId: customer.id,
                      });
                    }}
                    small
                    text="Send"
                  />
                )}
                {!customer.metadata.optinStatus && (
                  <Button
                    onClick={e => {
                      e.preventDefault();
                      const message = `Woohoo! ${customer.metadata
                        .customerName ||
                        'Someone'} has just bought you a TextJoy.co gift! Every week we'll send you an inspirational text message. Reply YES to accept.`;
                      send({
                        message,
                        metadata: customer.metadata,
                        chargeId: customer.id,
                      });
                    }}
                    small
                    text="Re-send Opt-in"
                  />
                )}
              </div>
            </div>
          );
        })}
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
