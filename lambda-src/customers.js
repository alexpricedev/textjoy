require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

  // Fetch the customer data from Stripe (TODO: pagination)
  stripe.charges
    .list({ limit: 100 })
    .then(({ data }) => {
      // We might also have some chargebee customer payments (from RemoteOne)
      // so lets filter all of the others out
      const ourCustomers = data.filter(
        c =>
          c.description.toLowerCase().includes('thoughtfulsms') && !c.refunded,
      );
      callback(null, {
        statusCode,
        headers,
        body: JSON.stringify({ status: 'succeeded', customers: ourCustomers }),
      });
    })
    .catch(err => {
      console.log('server error', err);
      callback(err, {
        statusCode,
        headers,
        body: JSON.stringify({ status: 'failed' }),
      });
    });
};
