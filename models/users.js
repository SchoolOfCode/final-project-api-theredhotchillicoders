import db from "../db/connection.js";

export async function getAllUsers() {
  const result = await db.query(`SELECT * FROM users;`);
  console.log(result.rows);
  return result.rows;
}

// export async function getUserByUid(uid) {
//   const result = await db.query(`SELECT * FROM users WHERE userID = $1`, [uid]);
//   console.log(result.rows);
//   return result.rows;
// }

export async function createUser({ userID, email }) {
  const result = await db.query(`SELECT * FROM users WHERE userID = $1`, [
    userID,
  ]);
  if (result.rows.length === 0) {
    const data = await db.query(
      `INSERT INTO users(userID, email) VALUES($1, $2) 
      RETURNING email;`,
      [userID, email]
    );

    return data.rows;
  }
  return "user already exists";
}

export async function deleteUserById(id) {
  const data = await db.query(
    `DELETE FROM users
    WHERE id= $1`,
    [id]
  );
  return `Deleted ${id}`;
}
