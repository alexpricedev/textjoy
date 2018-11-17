import React, { useState } from 'react';

import { collections, timezones } from '../constants';

const Checkout = ({ currentCollection, setCollection }) => {
  const [recipientTimezone, setRecipientTimezone] = useState('Etc/GMT');
  const [customerEmail, setCustomerEmail] = useState('');

  return (
    <div className="wrapper">
      <h2>Make Someone Happy Gift a Collection</h2>
      <form className="wrapper wrapper--small">
        <div className="select-wrapper">
          <select
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
        <input
          name="recipientFirstName"
          placeholder="Recipient's First Name"
          type="text"
        />
        <input
          name="recipientPhoneNumber"
          placeholder="Recipient's Phone Number"
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
        <input type="text" name="customerName" placeholder="Your Name" />
        <input
          name="customerEmail"
          onChange={e => {
            e.preventDefault();
            setCustomerEmail(e.target.value);
          }}
          placeholder="Your Email address"
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

        input,
        select {
          display: block;
          margin-bottom: 20px;
          width: 100%;
        }

        select,
        input[type='text'] {
          appearance: none;
          background: #e8ebed;
          border-radius: 5px;
          border: none;
          color: #576366;
          font-size: 14px;
          height: 35px;
          padding: 5px 15px;
          width: 100%;
        }

        .select-wrapper {
          position: relative;
        }

        .select-wrapper::after {
          border-color: #576366 transparent transparent transparent;
          border-style: solid;
          border-width: 9px 9px 0;
          content: '';
          display: block;
          position: absolute;
          right: 13px;
          top: 50%;
          transform: translateY(-50%);
          height: 0;
          width: 0;
        }

        label {
          display: inline-block;
          font-size: 14px;
          margin: 0 0 4px;
        }
      `}</style>
    </div>
  );
};

export default Checkout;
