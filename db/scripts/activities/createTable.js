import db from "../../connection.js";

const response = await db.query(
  `CREATE TABLE IF NOT EXISTS activities (id SERIAL PRIMARY KEY, userID TEXT, date DATE, title TEXT, category TEXT, description TEXT, duration TEXT, image TEXT, isComplete BOOLEAN);`
);

db.end();
