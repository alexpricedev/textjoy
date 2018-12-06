require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const twilio = require('twilio');

// const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.AUTH_TOKEN);
const MessagingResponse = twilio.twiml.MessagingResponse;

import { statusCode, headers, optinStatuses } from '../constants';

// Adapted from https://stackoverflow.com/a/13419367
const parseQuery = queryString => {
  const query = {};
  const pairs = (queryString[0] === '?'
    ? queryString.substr(1)
    : queryString
  ).split('&');
  pairs.forEach(pair => {
    const _pair = pair.split('=');
    query[decodeURIComponent(_pair[0])] = decodeURIComponent(_pair[1] || '');
  });
  return query;
};

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

  const { Body, From } = parseQuery(event.body);

  const twiml = new MessagingResponse();
  const theMessage = Body.toLowerCase().trim();

  // Should we update the db?
  let optinStatus = null;

  if (theMessage === 'yes') {
    twiml.message("Amazing! 🎉 You're awsome and we love you ❤ - TextJoy");
    optinStatus = optinStatuses.accepted;
  } else if (theMessage === 'no') {
    twiml.message(
      "Awwh 😥 We're sad to see you go. It's okay though, we still love you ❤ - TextJoy",
    );
    optinStatus = optinStatuses.declined;
  } else {
    twiml.message(
      "Ooops 🤯 We don't know what that means! Please reply YES to opt-in or NO to opt-out - TextJoy",
    );
  }

  if (optinStatus) {
    stripe.charges.list().autoPagingEach(charge => {
      // If the charge has the same phone number set all the optinStatuses
      if (charge.metadata.recipientPhoneNumber === From) {
        stripe.charges.update(charge.id, {
          metadata: {
            ...charge.metadata,
            optinStatus,
          },
        });
      }
    });
  }

  callback(null, {
    statusCode,
    headers: {
      ...headers,
      'Content-Type': 'text/xml',
    },
    body: twiml.toString(),
  });
};
