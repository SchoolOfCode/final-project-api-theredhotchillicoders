import db from "../../connection.js";


const dummy = [{
  title: "running",
  category: "fitness",
  description: "run to the shops",
  duration: "15 minutes",
},
{
  title: "pasta bake",
  category: "recipies",
  description: "put in the oven",
  duration: "20 minutes",
},
{
  title: "yoga",
  category: "wellness",
  description: "do the courpse",
  duration: "5 minutes",
},
]

const response = await db.query(
  `INSERT INTO activities (title, category, description, duration) VALUES ($1, $2, $3, $4,);`,
  
    }
}
populateTable();
);

console.log(response);

db.end();

// async function populateTable(){
//   for(let i = 0; i < dummy.length; i++){
//   const name = dummy[i].name;
//   const feeling  = dummy[i].feeling;
//   const reflection = dummy[i].reflection;
//   const workshop = dummy[i].workshop;
//   const url = dummy[i].url
//   const res = await query(`INSERT INTO soc (name,
//       feeling, reflection, workshop, url ) VALUES ($1 , $2, $3, $4, $5) 
//       RETURNING name`, [name,feeling, reflection, workshop, url])
//       console.log(res);