import db from "../db/connection.js";
//changed to activities

export async function getAllActivities() {
  const result = await db.query(`SELECT * FROM activities;`);
  return result.rows;
}

export async function createData({
  date,
  title,
  category,
  description,
  duration,
}) {
  const data = await db.query(
    `INSERT INTO activities(date, title, category, description, duration) VALUES($1, $2, $3, $4, $5) 
    RETURNING title;`,
    [date, title, category, description, duration]
  );

  return data.rows;
}
