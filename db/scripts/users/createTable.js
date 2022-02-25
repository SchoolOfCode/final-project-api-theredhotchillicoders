import db from "../../connection.js";
async function createUsersTable() {
  const usersTable = await db.query(
    `CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, userID TEXT, email TEXT);`
  );
  console.log(usersTable);
}
createUsersTable();

db.end();
