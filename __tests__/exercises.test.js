const { faker } = require("@faker-js/faker");
const Exercise = require("../models/exercise");
const { getExercises, getExerciseById } = require("../controllers/exercises");
const { transformExercise } = require("../utils/index");

const exercisesMockData = [
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

describe("GET /exercises", () => {
  let mRes, mNext;

  beforeEach(() => {
    mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mNext = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return exercises", async () => {
    jest.spyOn(Exercise, "findAll").mockResolvedValueOnce(exercisesMockData);

    await getExercises({}, mRes, mNext);
    const transformedResponse = exercisesMockData.map((item) =>
      transformExercise(item)
    );
    expect(mRes.status().json).toBeCalledWith(transformedResponse);
  });

  it("should return exercises by id", async () => {
    const req = {
      params: {
        _id: 1,
      },
    };

    const index = exercisesMockData.findIndex(
      (ex) => ex.dataValues._id === req.params._id
    );

    jest
      .spyOn(Exercise, "findByPk")
      .mockResolvedValueOnce(exercisesMockData[index].dataValues);

    await getExerciseById(req, mRes, mNext);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.status().json).toBeCalledWith(
      exercisesMockData[index].dataValues
    );
  });

  it("should return 'not found' if exercise doesn't exist", async () => {
    const req = {
      params: {
        _id: 3,
      },
    };

    jest.spyOn(Exercise, "findByPk").mockResolvedValueOnce(null);

    await getExerciseById(req, mRes, mNext);
    expect(mRes.status).toBeCalledWith(404);
  });
});
