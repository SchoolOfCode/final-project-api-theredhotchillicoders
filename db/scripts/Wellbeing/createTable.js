import db from "../../connection.js";
async function createWellbeingTable() {
  const wellBeingTable = await db.query(
    `CREATE TABLE IF NOT EXISTS wellbeing (id SERIAL PRIMARY KEY, title TEXT);`
  );
  console.log(wellBeingTable);
}
createWellbeingTable();

db.end();
