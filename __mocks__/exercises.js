const { faker } = require("@faker-js/faker");

const exercises = [
  {
    dataValues: {
      _id: 1,
      description: faker.lorem.sentences(2),
      duration: faker.random.numeric(2),
      date: faker.date.between(),
      userId: 2,
    },
  },
  {
    dataValues: {
      _id: 2,
      description: faker.lorem.sentences(1),
      duration: faker.random.numeric(2),
      date: faker.date.between(),
      userId: 2,
    },
  },
];

const exercisesLog = {
  count: 2,
  rows: [
    {
      username: faker.name.firstName(),
      description: faker.lorem.sentence(2),
      duration: faker.random.numeric(2),
      date: faker.date.between(),
      _id: faker.random.alphaNumeric(),
    },
    {
      username: faker.name.firstName(),
      description: faker.lorem.sentence(1),
      duration: faker.random.numeric(2),
      date: faker.date.between(),
      _id: faker.random.alphaNumeric(),
    },
  ],
};

module.exports = {
  exercises,
  exercisesLog,
};
