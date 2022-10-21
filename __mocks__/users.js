const { faker } = require("@faker-js/faker");

const users = [
  {
    _id: 1,
    username: faker.name.firstName(),
  },
  {
    _id: 2,
    username: faker.name.firstName(),
  },
  {
    _id: 3,
    username: faker.name.firstName(),
  },
];

module.exports = users;
