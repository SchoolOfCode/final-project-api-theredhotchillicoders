import db from "../../connection.js";


const dummy = [{
  date:'2021-02-26',
  title: "running",
  category: "fitness",
  description: "run to the shops",
  duration: "15 minutes",
  isComplete: true,
},
{
  date: '2021-2-25',
  title: "pasta bake",
  category: "recipes",
  description: "put in the oven",
  duration: "20 minutes",
  isComplete: false,
},
{
  date: '2021-02-24',
  title: "yoga",
  category: "wellness",
  description: "do the corpse",
  duration: "5 minutes",
  isComplete: true,
},
]

async function populateTable(){
  for(let i = 0; i < dummy.length; i++){
    const date = dummy[i].date;
    const title = dummy[i].title;
    const category = dummy[i].category;
    const description = dummy[i].description;
    const duration = dummy[i].duration;
    const isComplete = dummy[i].isComplete;
  
    const response = await db.query
  (`INSERT INTO activities(date, title, category, description, duration, isComplete) VALUES($1, $2, $3, $4, $5, $6) 
  RETURNING title;`, [date, title, category, description, duration, isComplete]);
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