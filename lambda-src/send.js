require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.AUTH_TOKEN,
);

import { statusCode, headers } from '../constants';

exports.handler = function(event, context, callback) {
  // We only care to do anything if this is our POST request
  if (event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode,
      headers,
      body: 'No GET request handler',
    });
    return;
  }

  // Parse the body contents into an object
  const data = JSON.parse(event.body);

  // Make sure we have all required data. Otherwise, escape
  if (!data.metadata || !data.message || !data.chargeId) {
    console.error('Required information is missing.');

    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({ status: 'missing-information' }),
    });

    return;
  }

  twilio.messages
    .create({
      body: data.message,
      to: data.metadata.recipientPhoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    })
    .then(() => {
      stripe.charges
        .update(data.chargeId, {
          metadata: {
            ...data.metadata,
            lastSentDate: new Date().toISOString(),
            nOfLastMessage: parseInt(data.metadata.nOfLastMessage || 0) + 1,
          },
        })
        .then(() => {
          callback(null, {
            statusCode,
            headers,
            body: JSON.stringify({ status: 'succeeded' }),
          });
        })
        .catch(err => {
          callback(err, {
            statusCode,
            headers,
            body: JSON.stringify({ status: 'failed' }),
          });
        });
    })
    .catch(err => {
      callback(err, {
        statusCode,
        headers,
        body: JSON.stringify({ status: 'failed' }),
      });
    });
};
