import db from "../db/connection.js";

export async function getWellbeing() {
  const result = await db.query(`SELECT * FROM wellbeing;`);
  console.log(result.rows);
  return result.rows;
}
