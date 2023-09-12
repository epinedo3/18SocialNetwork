const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomArrItem, getRandomName, getRandomThoughtText, getRandomReaction, } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    
    // Drop existing users
    await User.deleteMany({});

    // Drop existing thoughts
    await Thought.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    const fullName = getRandomName();
    const username = `${fullName.split(" ")[0]}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;
    const email = `${username}@mail.com`;

    users.push({
      username,
      email,
    });
  }

  // Insert users into the database
  await User.collection.insertMany(users);

  // Create empty array to hold the thoughts
  const thoughts = [];

  // Loop 20 times -- add thoughts to the thoughts array
  for (let i = 0; i < 20; i++) {
    thoughts.push({
      thoughtText: getRandomThoughtText(),
      username: getRandomArrItem(createdUsers.ops).username,
      reactions: Array.from({ length: 5 }, () => ({
        reactionBody: getRandomReaction(),
        username: getRandomArrItem(createdUsers.ops).username,
      })),
    });
  }

  // Insert thoughts into the database
  const createdThoughts = await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});