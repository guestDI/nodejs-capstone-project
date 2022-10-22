const { faker } = require("@faker-js/faker");
const request = require("supertest");
const app = require("../app");
const User = require("../models/user");
const Exercise = require("../models/exercise");
const {
  createUser,
  getUsers,
  addExercise,
  getExercisesLogByUser,
} = require("../controllers/users");
const { transformExercisesLog, transformExercise } = require("../utils/index");
const users = require("../__mocks__/users");
const { exercises, exercisesLog } = require("../__mocks__/exercises");

describe("GET /users", () => {
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

  it("should return users", async () => {
    jest.spyOn(User, "findAll").mockResolvedValueOnce(users);

    await getUsers({}, mRes, mNext);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.status().json).toBeCalledWith(users);
  });

  it("should responds with empty array if no users", async () => {
    jest.spyOn(User, "findAll").mockResolvedValueOnce([]);

    await getUsers({}, mRes, mNext);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.status().json).toBeCalledWith([]);
  });
});

describe("POST /users", () => {
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

  it("should create user", async () => {
    const req = {
      body: {
        username: users[0].username,
      },
    };

    jest.spyOn(User, "create").mockResolvedValueOnce(users[0]);

    await createUser(req, mRes, mNext);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.status().json).toBeCalledWith(users[0]);
  });

  it("should return an error if user already exists - [validator]", (done) => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce(users[0]);

    request(app)
      .post("/api/users")
      .send({
        username: faker.name.firstName(),
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .expect(
        {
          errors: [
            {
              username: "User already exist",
            },
          ],
        },
        done
      );
  });

  it("should fail if username is too short - [validator]", (done) => {
    request(app)
      .post("/api/users")
      .send({
        username: "te",
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .expect(
        {
          errors: [
            {
              username: "Username must be at least 3 chars",
            },
          ],
        },
        done
      );
  });
});

describe("GET /users/:userId/logs", () => {
  const req = {
    params: {
      userId: 1,
    },
    query: {},
  };

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

  it("should return exercises for a user", async () => {
    jest.spyOn(Exercise, "findAndCountAll").mockResolvedValueOnce(exercisesLog);

    await getExercisesLogByUser(req, mRes, mNext);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.status().json).toBeCalledWith(
      transformExercisesLog(exercisesLog)
    );
  });

  it("should return empty array if user doesn't exist", async () => {
    const emptyResponse = {
      count: 0,
      rows: [],
    };
    jest
      .spyOn(Exercise, "findAndCountAll")
      .mockResolvedValueOnce(emptyResponse);

    await getExercisesLogByUser(req, mRes, mNext);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.status().json).toBeCalledWith(
      transformExercisesLog(emptyResponse)
    );
  });

  it("should fail if 'from' is not a date - [validator]", (done) => {
    request(app)
      .get("/api/users/8d7569ef-1313-40dd-b0b3-c79a4028b3a9/logs?from=date")
      .expect(400)
      .expect(
        {
          errors: [
            { from: "'From' must be in a correct format, e.g. 2022-10-13" },
          ],
        },
        done
      );
  });

  it("should fail if 'to' is not a date - [validator]", (done) => {
    request(app)
      .get("/api/users/8d7569ef-1313-40dd-b0b3-c79a4028b3a9/logs?to=date")
      .expect(400)
      .expect(
        {
          errors: [{ to: "'To' must be in a correct format, e.g. 2022-10-13" }],
        },
        done
      );
  });

  it("should fail if limit is not a number - [validator]", (done) => {
    request(app)
      .get(`/api/users/8d7569ef-1313-40dd-b0b3-c79a4028b3a9/logs?limit=a`)
      .expect(400)
      .expect(
        {
          errors: [{ limit: "Limit must be a valid number" }],
        },
        done
      );
  });
});

describe("POST /users/:_id/exercises", () => {
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

  it("should return created exercise", async () => {
    const req = {
      body: {
        ...exercises[0].dataValues,
      },
      params: {
        _id: exercises[0].dataValues._id,
      },
    };
    jest.spyOn(Exercise, "create").mockResolvedValueOnce(exercises[0]);

    await addExercise(req, mRes, mNext);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.status().json).toBeCalledWith(transformExercise(exercises[0]));
  });

  it("should fail if duration is missed - [validator]", (done) => {
    jest.spyOn(User, "findByPk").mockResolvedValueOnce(users[0]);

    request(app)
      .post(`/api/users/8d7569ef-1313-40dd-b0b3-c79a4028b3a9/exercises`)
      .send({
        description: faker.lorem.sentences(2),
      })
      .expect(400)
      .expect(
        {
          errors: [
            { duration: "Duration field cannot be empty" },
            { duration: "Duration must be an integer" },
          ],
        },
        done
      );
  });

  it("should fail if description is missed - [validator]", (done) => {
    jest.spyOn(User, "findByPk").mockResolvedValueOnce(users[0]);

    request(app)
      .post(`/api/users/8d7569ef-1313-40dd-b0b3-c79a4028b3a9/exercises`)
      .send({
        duration: faker.random.numeric(2),
      })
      .expect(400)
      .expect(
        {
          errors: [
            { description: "Description field cannot be empty" },
            { description: "Description must be a string" },
          ],
        },
        done
      );
  });
});
