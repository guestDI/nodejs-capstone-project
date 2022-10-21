const Exercise = require("../models/exercise");
const { getExercises, getExerciseById } = require("../controllers/exercises");
const { transformExercise } = require("../utils/index");
const { exercises } = require("../__mocks__/exercises");

/*
  Tests for exercises controllers with mocked responses from DB
*/

describe("GET /exercises", () => {
  let mRes, mNext;

  const req = {
    params: {
      _id: exercises[0].dataValues._id,
    },
  };

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
    jest.spyOn(Exercise, "findAll").mockResolvedValueOnce(exercises);

    await getExercises({}, mRes, mNext);
    const transformedResponse = exercises.map((item) =>
      transformExercise(item)
    );
    expect(mRes.status().json).toBeCalledWith(transformedResponse);
  });

  it("should return exercise by id", async () => {
    const index = exercises.findIndex(
      (ex) => ex.dataValues._id === req.params._id
    );

    jest
      .spyOn(Exercise, "findByPk")
      .mockResolvedValueOnce(exercises[index].dataValues);

    await getExerciseById(req, mRes, mNext);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.status().json).toBeCalledWith(exercises[index].dataValues);
  });

  it("should return 'Not found' if exercise doesn't exist", async () => {
    jest.spyOn(Exercise, "findByPk").mockResolvedValueOnce(null);

    await getExerciseById(req, mRes, mNext);
    expect(mRes.status).toBeCalledWith(404);
  });
});
