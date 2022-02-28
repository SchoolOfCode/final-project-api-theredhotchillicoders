import db from "../db/connection.js";
//changed to activities

export async function getAllActivities() {
  const result = await db.query(`SELECT * FROM activities;`);
  return result.rows;
}

export async function getActivitiesByUser(userID) {
  const result = await db.query(`SELECT * FROM activities WHERE userID= $1;`, [
    userID,
  ]);
  return result.rows;
}

export async function createData({
  date,
  title,
  category,
  description,
  duration,
  userid,
}) {
  const data = await db.query(
    `INSERT INTO activities(date, title, category, description, duration, userid) VALUES($1, $2, $3, $4, $5, $6) 
    RETURNING title;`,
    [date, title, category, description, duration, userid]
  );

  return data.rows;
}

export async function deleteTaskById(id) {
  const data = await db.query(
    `DELETE FROM activities
  WHERE id= $1`,
    [id]
  );
  return `Deleted ${id}`;
}
