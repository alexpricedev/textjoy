const collections = {
  'inspirational-women': {
    id: 'inspirational-women',
    name: '👩‍⚕️ Inspirational women',
    intro:
      'Perfect for feminists and historians of all shapes and sizes. This collection is educational & empowering!',
    demoMessages: [
      () =>
        'Billie Jean King, the winner of 20 Wimbledon titles, beat Bobby Rigg in "The Battle of the sexes" after he said that men were superior athletes! 🎾',
      () =>
        `Benazir Bhutto was the first woman to head a Muslim state. She ended military dictatorship in Pakistan, and fought for womens rights! 🙏`,
    ],
    messages: [
      () =>
        'Billie Jean King, the winner of 20 Wimbledon titles, beat Bobby Rigg in "The Battle of the sexes" after he said that men were superior athletes!',
      () =>
        'Benazir Bhutto was the first woman to head a Muslim state. She ended military dictatorship in Pakistan, and fought for womens rights!',
    ],
  },
  'positive-news': {
    id: 'positive-news',
    name: '👍 Positive News',
    intro:
      "Perfect for those that need a reminder that the world isn't all bad. Send a little bit of light with a recent positive new story once a week.",
    demoMessages: [
      name =>
        `${name}, IKEA has recently completed the replanting of three million rainforest trees! 🌴 It's part of their effort to rehabilitate the rainforest! 👍`,
      name =>
        `Hey ${name}! The EU has recently agreed to ban the three most widely used insecticides as they've been proven to hurt bees! 🐝 💪 Nice!`,
    ],
    messages: [
      () =>
        `The European parliament has voted for a sweeping ban on a wide range of single-use plastics in a bid to tackle pollution of oceans and waterways. Yay!`,
      () =>
        `In India, ceremonial flowers form a third of the total solid waste. A student has launched a company which turns it into essential oils. Amazing!`,
    ],
  },
  motivational: {
    id: 'motivational',
    name: '💪 Motivational',
    intro:
      'Perfect for your gym buddy, your co-worker or that go-getter that is high energy and loves a little push to get through the to-dos.',
    demoMessages: [
      name =>
        `Hey ${name}! You can do anything 🚀 You can be anything you want to be. As long as you believe in yourself and work hard 🤘`,
      name =>
        `${name}!! 🤩 Tomorrow is too late, yesterday is over, and now is exactly the right moment to start! 💥`,
    ],
    messages: [
      name =>
        `Hey ${name}! You can do anything 🚀 You can be anything you want to be. As long as you believe in yourself and work hard 🤘`,
      name =>
        `Good things come to people who wait, but better things come to those who go and get them. Keep hustling ${name}!`,
    ],
  },
  // uplifting: {
  //   id: 'uplifting',
  //   name: 'Uplifting',
  //   intro:
  //     "The uplifting collection leaves everyone feeling great about life. It's the perfect secret santa gift for your colleagues.",
  //   demoMessages: [
  //     name =>
  //       `Hello ${name} 👋 You look just excellent today, especially when you smile like that! 😉 Keep up the good work!`,
  //     name =>
  //       `You know what ${name}? You're absolutely perfect, just the way you are 🙌 Don't you forget it! - ThougtfulSMS`,
  //   ],
  //   messages: [
  //     name =>
  //       `Hello ${name} 👋 You look just excellent today, especially when you smile like that! 😉 Keep up the good work!`,
  //     name =>
  //       `You know what ${name}? You're absolutely perfect, just the way you are 🙌 Don't you forget it! - ThougtfulSMS`,
  //   ],
  // },
  // affirmation: {
  //   id: 'affirmation',
  //   name: 'Affirmation',
  //   intro:
  //     'Perfect for those that need a confidence boost. These affirmations will help overcome challenges and negative thinking.',
  //   demoMessages: [
  //     name =>
  //       `Hi ${name} 👋 It's not always easy, but know your positive attitude, confidence and hard work opens doors to new opportunities 🌅`,
  //     name =>
  //       `👋👋👋 ${name}, every single part of you is lovable and worthy of love 💚`,
  //   ],
  //   messages: [
  //     name =>
  //       `Hi ${name} 👋 It's not always easy, but know your positive attitude, confidence and hard work opens doors to new opportunities 🌅`,
  //     name =>
  //       `👋👋👋 ${name}, every single part of you is lovable and worthy of love 💚`,
  //   ],
  // },
};

export default collections;
