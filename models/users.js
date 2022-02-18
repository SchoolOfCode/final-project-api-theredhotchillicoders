import db from "../db/connection.js";

export async function getAllUsers() {
  const result = await db.query(`SELECT * FROM activities;`);
  return result.rows;
}

export async function createData({ title, category, description, duration }) {
  const data = await db.query(
    `INSERT INTO activities(title, category, description, duration) VALUES($1, $2, $3, $4) 
  RETURNING title;`,
    [title, category, description, duration]
  );

  return data.rows;
}
