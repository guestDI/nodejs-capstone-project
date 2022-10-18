const request = require("supertest");
const app = require("../app");

describe("GET /users", () => {
  it("should return users", (done) => {
    request(app)
      .get("/api/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("should responds with json", (done) => {
    request(app)
      .get("/api/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

//   it("should responds with empty array if no users", (done) => {
//     request(app)
//       .get("/api/users")
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(200)
//       .expect(
//         [],
//         done
//       );
//   });
});

describe("POST /users", () => {
  it("should fail if username is empty", (done) => {
    request(app)
      .post("/api/users")
      .send({
        username: "",
      })
      .expect("Content-Type", /json/)
      .expect(422)
      .expect(
        {
          errors: [
            {
              username: "username must be at least 3 chars",
            },
          ],
        },
        done
      );
  });

  it("should fail if username is too short", (done) => {
    request(app)
      .post("/api/users")
      .send({
        username: "te",
      })
      .expect("Content-Type", /json/)
      .expect(422)
      .expect(
        {
          errors: [
            {
              username: "username must be at least 3 chars",
            },
          ],
        },
        done
      );
  });
});
