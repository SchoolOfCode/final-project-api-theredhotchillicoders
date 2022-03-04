import supertest from 'supertest';
import pool from './db/connection';
import app from './app.js';

const token = process.env.FIREBASE_TOKEN;

const request = supertest(app);

// beforeEach(() => {
//   initializeCityDatabase();
// });

afterAll(async () => {
	await pool.end();
});
// this will allow this to run after every test

describe('GET /activities', function() {
	test('gives us back 200 status code', async function() {
		// const expectedBody = {
		// 	message: 'I wish we had some information to give you ☹️'
		// };
		const actual = await request.get('/activities').set('Authorization', 'Bearer ' + token);
		console.log(actual.body, 'actual');
		expect(actual.statusCode).toBe(200);
		// expect(actual.statusCode).not.toBe(500); // can also write the test like this as a negative assertion
		expect(actual.headers['content-type']).toBe('application/json; charset=utf-8');
		console.log(actual.headers, 'headers');
		expect(actual.body).toStrictEqual({ success: true, payload: expect.any(Array) });
		actual.body.payload.forEach((element) => {
			expect(element).toHaveProperty('id', expect.any(Number));
		});
	});
});

/* can we check everything matches in the object? */

// expect(element).toStrictEqual({
// 	id: expect.anything(),
// 	userid: expect.anything(), // come back to this and make them more specifc to the value to follow the format
// 	date: expect.anything(),
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
// });
