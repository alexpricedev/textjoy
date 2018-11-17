import React, { useState } from 'react';

import { collections, timezones } from '../constants';

const Checkout = ({ currentCollection, setCollection }) => {
  const [recipientTimezone, setRecipientTimezone] = useState('Etc/GMT');
  const [customerEmail, setCustomerEmail] = useState('');

  return (
    <div className="wrapper">
      <h2>Make Someone Happy, Gift a Collection</h2>
      <form className="wrapper wrapper--small">
        <label htmlFor="collectionId">Collection</label>
        <div className="select-wrapper">
          <select
            id="collectionId"
            name="collectionId"
            onChange={e => {
              setCollection(collections[e.target.value]);
            }}
            value={currentCollection.id}
          >
            {Object.entries(collections).map(([key, value]) => (
              <option key={value.id} value={key}>
                {value.name} Collection
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="recipientFirstName">Recipient's First Name</label>
        <input id="recipientFirstName" name="recipientFirstName" type="text" />
        <label htmlFor="recipientPhoneNumber">Recipient's Phone Number</label>
        <input
          id="recipientPhoneNumber"
          name="recipientPhoneNumber"
          type="text"
        />
        <label htmlFor="recipientTimezone">Recipient's Timezone</label>
        <div className="select-wrapper">
          <select
            id="recipientTimezone"
            name="recipientTimezone"
            onChange={e => {
              setRecipientTimezone(e.target.value);
            }}
            value={recipientTimezone}
          >
            {timezones.map(tz => (
              <option key={tz.name} value={tz.name}>
                {tz.label} - {tz.name}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="customerName">Your Name</label>
        <input type="text" id="customerName" name="customerName" />
        <label htmlFor="customerEmail">Your Email Address</label>
        <input
          id="customerEmail"
          name="customerEmail"
          onChange={e => {
            e.preventDefault();
            setCustomerEmail(e.target.value);
          }}
          type="text"
          value={customerEmail}
        />
      </form>
      <style jsx>{`
        h2 {
          font-size: 30px;
          margin: 0 0 30px;
          text-align: center;
        }

        form {
          background: rgba(232, 235, 237, 0.8);
          box-shadow: 0px 1px 1px 0px rgba(80, 80, 80, 0.8);
          margin-bottom: 40px;
          padding: 20px;
          position: relative;
        }

        form::before {
          background: #505050;
          content: '';
          display: block;
          height: 3px;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
        }

        label {
          display: inline-block;
          font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
          font-size: 14px;
          margin: 0 0 4px;
        }

        input,
        select {
          appearance: none;
          background: #ffffff;
          border-radius: 5px;
          border: none;
          color: #576366;
          display: block;
          font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
          font-size: 14px;
          height: 35px;
          margin-bottom: 20px;
          padding: 5px 15px;
          width: 100%;
        }

        .select-wrapper {
          position: relative;
        }

        .select-wrapper::after {
          border-color: #576366 transparent transparent transparent;
          border-style: solid;
          border-width: 7px 7px 0;
          content: '';
          display: block;
          position: absolute;
          right: 13px;
          top: 50%;
          transform: translateY(-50%);
          height: 0;
          width: 0;
        }
      `}</style>
    </div>
  );
};

export default Checkout;
