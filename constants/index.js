import timezones from './timezones';

const collections = {
  love: {
    id: 'love',
    name: 'Love',
    messages: [
      name =>
        `Dearest ${name}, I want you to know that I think about you often 💕 I'm your #1 fan and cheering you on. Go get ‘em! 😍`,
      name =>
        `If there were more people like you in the world 🌏 it would be a better place! Its true ${name}! I'm glad we are on the same team 😻`,
    ],
  },
  motivation: {
    id: 'motivation',
    name: 'Motivation',
    messages: [
      name =>
        `Hey ${name}! You can do anything 🚀 You can be anything you want to be. As long as you believe in yourself and work hard 🤘`,
      name =>
        `${name}!! 🤩 Tomorrow is too late, yesterday is over, and now is exactly the right moment to start! 💥`,
    ],
  },
};

const statusCode = 200;

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export { collections, timezones, statusCode, headers };
