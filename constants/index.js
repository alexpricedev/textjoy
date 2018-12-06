import collections from './collections';
import timezones from './timezones';

const statusCode = 200;

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const optinStatuses = {
  accepted: 'accepted',
  declined: 'declined',
};

const suffix = ' -TextJoy';

export { optinStatuses, collections, timezones, statusCode, headers, suffix };
