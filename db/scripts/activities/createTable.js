import db from "../../connection.js";

const response = await db.query(
  `CREATE TABLE IF NOT EXISTS activities (id SERIAL PRIMARY KEY, title TEXT, category TEXT, description TEXT, duration TEXT);`
);

console.log(response);

db.end();
