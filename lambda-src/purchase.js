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
    console.log('GET request made...');
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
  if (!data.token || !data.amount || !data.idempotency_key || !data.currency) {
    console.error('Required information is missing.');

    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({ status: 'missing-information' }),
    });

    return;
  }

  stripe.charges
    .create(
      {
        currency: data.currency,
        amount: data.amount,
        source: data.token.id,
        receipt_email: data.token.email,
        description: 'One year TextJoy subscription',
        metadata: data.metadata,
      },
      {
        idempotency_key: data.idempotency_key,
      },
    )
    .then(charge => {
      if (charge === null) {
        throw 500;
      }

      console.log('Created charge:', charge);

      callback(null, {
        statusCode,
        headers,
        body: JSON.stringify({ status: charge.status }),
      });

      return charge;
    })
    .then(({ metadata }) => {
      return twilio.messages.create({
        body: `Woohoo! ${metadata.customerName ||
          'Someone'} has just bought you a TextJoy.co gift! Every week we'll send you a inspirational text message. Reply YES to accept.`,
        to: metadata.recipientPhoneNumber, // send to this number
        from: process.env.TWILIO_PHONE_NUMBER, // from our Twilio number
      });
    })
    .then(message => console.log('Message sent: ', message))
    .catch(err => {
      console.log('Catch || Error sending welcome SMS:', err);
      callback(err, {
        statusCode,
        headers,
        body: JSON.stringify({ status: 'failed' }),
      });
    });
};
