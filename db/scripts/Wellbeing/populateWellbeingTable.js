import db from "../../connection.js";

const dummy = [
  {
    title: "Yoga",
  },
  {
    title: "Meditation",
  },
  {
    title: "Call a friend",
  },
  {
    title: "Gardening",
  },
  {
    title: "Go outside",
  },
  {
    title: "Read a book",
  },
];

async function populateTable() {
  for (let i = 0; i < dummy.length; i++) {
    const title = dummy[i].title;

    const response = await db.query(
      `INSERT INTO wellbeing(title) VALUES($1)
  RETURNING title;`,
      [title]
    );
    console.log(response);
  }
}

populateTable();
