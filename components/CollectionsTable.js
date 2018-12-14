import React, { useEffect, useState } from 'react';
import moment from 'moment';

import Button from '../components/Button';
import { collections, optinStatuses, timezones } from '../constants';
import fetchCharges from '../helpers/fetch-charges';
import sendMessage from '../helpers/send-message';

const CollectionsTable = () => (
  <div style={{ padding: '30px 20px' }}>
    <h2>Our Collections</h2>
    {Object.entries(collections).map(([key, collection]) => (
      <div className="row" key={key}>
        <div className="name">{collection.name}</div>
        {collection.messages.map((message, i) => (
          <div>
            {i + 1} | {message('Jeff')}
          </div>
        ))}
      </div>
    ))}
    <style jsx>{`
      h2 {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 20px;
      }

      .row {
        margin-bottom: 10px;
      }

      .name {
        font-weight: 700;
      }
    `}</style>
  </div>
);

export default CollectionsTable;
