const collections = {
  love: {
    id: 'love',
    name: 'Love',
    intro:
      'Perfect for your loved one, spouse or partner. Send loving and personal messages to someone you absolutely adore',
    messages: [
      name =>
        `Dearest ${name}, I want you to know that I think about you often 💕 I'm your #1 fan and cheering you on. Go get ‘em! 😍 - ThoughtfulSMS`,
      name =>
        `If there were more people like you in the world it would be a better place! It's true ${name} 🌏  I'm glad we are on the same team 😻 - ThoughtfulSMS`,
    ],
  },
  motivation: {
    id: 'motivation',
    name: 'Motivation',
    intro:
      'Perfect for your gym buddy, your co-worker or that go-getter that is high energy and loves a little push to get through the to-dos ',
    messages: [
      name =>
        `Hey ${name}! You can do anything 🚀 You can be anything you want to be. As long as you believe in yourself and work hard 🤘 - ThoughtfulSMS`,
      name =>
        `${name}!! 🤩 Tomorrow is too late, yesterday is over, and now is exactly the right moment to start! 💥 - ThoughtfulSMS`,
    ],
  },
};

export default collections;
