const { faker } = require("@faker-js/faker");
const User = require("../models/user");
const Exercise = require("../models/exercise");
const {
  createUser,
  getUsers,
  // addExercise,
  getExercisesLogByUser,
} = require("../controllers/users");
const { transformExercisesLog } = require("../utils/index");

const usersMockData = [
  {
    _id: 1,
    username: faker.name.firstName(),
  },
  {
    _id: 2,
    username: faker.name.firstName(),
  },
];

describe.skip("GET /users", () => {
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

  /* Test below is test that makes real db call

     it("should return users", (done) => {
       request(app)
         .get("/api/users")
         .set("Accept", "application/json")
         .expect("Content-Type", /json/)
         .expect(200, done)
    });
*/

  it("should return users", async () => {
    jest.spyOn(User, "findAll").mockResolvedValueOnce(usersMockData);

    await getUsers({}, mRes, mNext);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.status().json).toBeCalledWith(usersMockData);
  });

  it("should responds with empty array if no users", async () => {
    jest.spyOn(User, "findAll").mockResolvedValueOnce([]);

    await getUsers({}, mRes, mNext);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.status().json).toBeCalledWith([]);
  });
});

describe.skip("POST /users", () => {
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
        username: usersMockData[0].username,
      },
    };

    jest.spyOn(User, "create").mockResolvedValueOnce(usersMockData[0]);

    await createUser(req, mRes, mNext);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.status().json).toBeCalledWith(usersMockData[0]);
  });

  //   it("should fail if username is too short", (done) => {
  //     request(app)
  //       .post("/api/users")
  //       .send({
  //         username: "te",
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(400)
  //       .expect(
  //         {
  //           errors: [
  //             {
  //               username: "Username must be at least 3 chars",
  //             },
  //           ],
  //         },
  //         done
  //       );
  //   });
});

describe("GET /users/:userId/logs", () => {
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

  it("should return exercises for user", async () => {
    const req = {
      params: {
        userId: 1,
      },
      query: {},
    };

    const exercises = {
      count: 1,
      rows: [
        {
          description: "Desc",
          duration: 60,
          date: "2022-10-23 00:00:00.000 +00:00",
          ...usersMockData[0],
        },
      ],
    };

    jest.spyOn(Exercise, "findAndCountAll").mockResolvedValueOnce(exercises);

    await getExercisesLogByUser(req, mRes, mNext);
    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.status().json).toBeCalledWith(transformExercisesLog(exercises));
  });
});
