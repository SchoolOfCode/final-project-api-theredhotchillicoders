import db from "../../connection.js";


const dummy = [{
  title: "running",
  category: "fitness",
  description: "run to the shops",
  duration: "15 minutes",
},
{
  title: "pasta bake",
  category: "recipes",
  description: "put in the oven",
  duration: "20 minutes",
},
{
  title: "yoga",
  category: "wellness",
  description: "do the corpse",
  duration: "5 minutes",
},
]

async function populateTable(){
  for(let i = 0; i < dummy.length; i++){
    const title = dummy[i].title;
    const category = dummy[i].category;
    const description = dummy[i].description;
    const duration = dummy[i].duration ;
  
    const response = await db.query
  (`INSERT INTO activities(title, category, description, duration) VALUES($1, $2, $3, $4) 
  RETURNING title;`, [title, category, description, duration]);
console.log(response);
  }
}

populateTable()



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
//      }
//populateTable();