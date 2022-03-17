import supertest from "supertest";
import pool from "./db/connection";
import app from "./app.js";
import { login } from "./Firebase.test";

// const token = process.env.FIREBASE_TOKEN;
// const userID = process.env.USER_ID;
const username = process.env.TEST_USER;
const password = process.env.TEST_PASSWORD;
const userInfo = await login(username, password);
const token = userInfo.accessToken;
const userID = userInfo.uid;

const request = supertest(app);

// beforeEach(() => {
//   initializeCityDatabase();
// });

afterAll(async () => {
  await pool.end();
});
// this will allow this to run after every test

describe("GET /activities", function () {
  test("gives us back 200 status code", async function () {
    const actual = await request
      .get("/activities")
      .set("Authorization", "Bearer " + token);

    expect(actual.statusCode).toBe(200);
  });
  test("returns an error if no token is provided (user is not logged in)", async function () {
    const actual = await request.get("/activities");
    expect(actual.statusCode).toBe(200);
    expect(actual.body.message).toBe(
      "Request contains no authorization header"
    );
  });
  test("gives us an array in a JSON object", async function () {
    const actual = await request
      .get("/activities")
      .set("Authorization", "Bearer " + token);
    expect(actual.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );

    expect(actual.body).toStrictEqual({
      success: true,
      payload: expect.any(Array),
    });
  });

  test("check every row has id, user id, title, category, iscomplete", async function () {
    const actual = await request
      .get("/activities")
      .set("Authorization", "Bearer " + token);
    actual.body.payload.forEach((element) => {
      expect(element).toHaveProperty("id", expect.any(Number));
      expect(element).toHaveProperty("userid", expect.any(String));
      expect(element).toHaveProperty("category", expect.any(String));
      expect(element).toHaveProperty("title", expect.any(String));
      expect(element).toHaveProperty("iscomplete", expect.any(Boolean));
    });
  });
});

describe("GET /activities/user", function () {
  test("gives us back 200 status code", async function () {
    const actual = await request
      .get("/activities/user")
      .set("Authorization", "Bearer " + token);

    expect(actual.statusCode).toBe(200);
  });
  test("gives us an array in a JSON object", async function () {
    const actual = await request
      .get("/activities/user")
      .set("Authorization", "Bearer " + token);
    expect(actual.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );

    expect(actual.body).toStrictEqual({
      success: true,
      payload: expect.any(Array),
    });
  });

  test("check every row has id, user id, title, category, iscomplete", async function () {
    const actual = await request
      .get("/activities/user")
      .set("Authorization", "Bearer " + token);
    actual.body.payload.forEach((element) => {
      expect(element).toHaveProperty("id", expect.any(Number));
      expect(element).toHaveProperty("userid", expect.any(String));
      expect(element).toHaveProperty("category", expect.any(String));
      expect(element).toHaveProperty("title", expect.any(String));
      expect(element).toHaveProperty("iscomplete", expect.any(Boolean));
    });
  });

  test("results only contain specific information for specified user", async function () {
    const actual = await request
      .get("/activities/user")
      .set("Authorization", "Bearer " + token);
    actual.body.payload.forEach((element) => {
      expect(element).toHaveProperty("userid", userID);
    });
  });
});

describe("POST /activities", function () {
  test("gives us back 200 status code with a correctly formatted object", async function () {
    const actual = await request
      .post("/activities")
      .set("Authorization", "Bearer " + token)
      .send({
        date: new Date(),
        title: "Test",
        category: "Test",
        description: "Test",
        duration: "Test",
        userid: userID,
      });
    expect(actual.statusCode).toBe(200);
  });
  test("gives us back an error with an incorrectly formatted object", async function () {
    const actual = await request
      .post("/activities")
      .set("Authorization", "Bearer " + token)
      .send({
        date: false,
        title: false,
        category: false,
        description: false,
        duration: false,
        userid: userID,
      });
    expect(actual.body.success).toBe(false);
  });
});

describe("PATCH /activities", function () {
  test("allows the last test item posted to be completed", async function () {
    const activitesForTestAccount = await request
      .get("/activities/user")
      .set("Authorization", "Bearer " + token);
    const idToPatch = activitesForTestAccount.body.payload[0].id;

    const actual = await request
      .patch(`/activities/${idToPatch}`)
      .set("Authorization", "Bearer " + token)
      .send({
        iscomplete: true,
      });
    expect(actual.body.success).toBe(true);
  });
});

describe("DELETE /activities", function () {
  test("allows the last test item posted to be deleted", async function () {
    const activitesForTestAccount = await request
      .get("/activities/user")
      .set("Authorization", "Bearer " + token);
    const idToDelete = activitesForTestAccount.body.payload[0].id;

    const actual = await request
      .delete(`/activities/${idToDelete}`)
      .set("Authorization", "Bearer " + token);
    expect(actual.body.success).toBe(true);
    expect(actual.body.payload).toBe(`Deleted ${idToDelete}`);
  });
});

/* can we check everything matches in the object? */

// expect(element).toStrictEqual({
// 	id: expect.any(Number),
// 	userid: expect.any(String), // come back to this and make them more specifc to the value to follow the format
// 	date: expect.any(String),
// 	title: expect.anything(),
// 	category: expect.anything(),
// 	description: expect.anything(),
// 	duration: expect.anything(),
// 	image: expect.anything(),
// 	iscomplete: expect.anything()
// });

// status code
// response headers - content type / json
// response body - does it have the correct shape for our API

// expect(actual.statusCode).toBe(200);

// describe('Test the root path', () => {
// 	test('It should response the GET method', (done) => {
// 		request(app).get('/').then((response) => {
// 			expect(response.statusCode).toBe(200);
// 			done();
// 		});
// 	});
// });

// const baseUrl = 'https://socfinalproject.herokuapp.com/activities/user';

// describe('Get all user activities endpoint', () => {
// 	it('should return a 200 status code', async () => {
// 		const response = await request(baseUrl).get('activities/user');

// 		expect(response.statusCode).toBe(200);
// 	});
// })
