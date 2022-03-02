import db from "../../connection.js";

async function deleteTable() {
  const usersTable = await db.query(`DROP TABLE activities;`);
  console.log(usersTable);
}
deleteTable();

db.end();
