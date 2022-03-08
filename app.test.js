import supertest from 'supertest';
import pool from './db/connection';
import app from './app.js';

const token = process.env.FIREBASE_TOKEN;
const userID = process.env.USER_ID;

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
		const actual = await request.get('/activities').set('Authorization', 'Bearer ' + token);

		expect(actual.statusCode).toBe(200);
	});
	test('gives us an array in a JSON object', async function() {
		const actual = await request.get('/activities').set('Authorization', 'Bearer ' + token);
		expect(actual.headers['content-type']).toBe('application/json; charset=utf-8');

		expect(actual.body).toStrictEqual({ success: true, payload: expect.any(Array) });
	});

	test('check every row has id, user id, title, category, iscomplete', async function() {
		const actual = await request.get('/activities').set('Authorization', 'Bearer ' + token);
		actual.body.payload.forEach((element) => {
			expect(element).toHaveProperty('id', expect.any(Number));
			expect(element).toHaveProperty('userid', expect.any(String));
			expect(element).toHaveProperty('category', expect.any(String));
			expect(element).toHaveProperty('title', expect.any(String));
			expect(element).toHaveProperty('iscomplete', expect.any(Boolean));
		});
	});
});

describe('GET /activities/user', function() {
	test('gives us back 200 status code', async function() {
		const actual = await request.get('/activities/user').set('Authorization', 'Bearer ' + token);

		expect(actual.statusCode).toBe(200);
	});
	test('gives us an array in a JSON object', async function() {
		const actual = await request.get('/activities/user').set('Authorization', 'Bearer ' + token);
		expect(actual.headers['content-type']).toBe('application/json; charset=utf-8');

		expect(actual.body).toStrictEqual({ success: true, payload: expect.any(Array) });
	});

	test('check every row has id, user id, title, category, iscomplete', async function() {
		const actual = await request.get('/activities/user').set('Authorization', 'Bearer ' + token);
		console.log('element', actual.body.payload);
		actual.body.payload.forEach((element) => {
			expect(element).toHaveProperty('id', expect.any(Number));
			expect(element).toHaveProperty('userid', expect.any(String));
			expect(element).toHaveProperty('category', expect.any(String));
			expect(element).toHaveProperty('title', expect.any(String));
			expect(element).toHaveProperty('iscomplete', expect.any(Boolean));
		});
	});

	test('results only contain specific information for specified user', async function() {
		const actual = await request.get('/activities/user').set('Authorization', 'Bearer ' + token);
		actual.body.payload.forEach((element) => {
			console.log('element', element);
			expect(element).toHaveProperty('userid', userID);
		});
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
