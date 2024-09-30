import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db=new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "3201",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

let countries = [];

async function checkVisisted() {
  const result = await db.query(
    "SELECT country_code FROM visited_countries JOIN users ON users.id = user_id WHERE user_id = $1; ",
    [currentUserId]
  );
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function checkUser() {
  const result =await db.query("SELECT * FROM users");
  users = result.rows;
  console.log(users);
  console.log("Current User ID:", currentUserId);
  return users.find((user)=>user.id==currentUserId);
};

app.get("/", async (req, res) => {
  const currentUser =await checkUser();  
  const countries = await checkVisisted();

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];
  const currentUser =await checkUser(); 

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  if (req.body.add==="new"){
    res.render("new.ejs");
  }else{
     currentUserId =req.body.user;
     res.redirect("/");
  }
});


app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const name =req.body.name;
  const color =req.body.color;
  const result =await db.query(
    "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",
    [name,color]
  );
  const id =result.rows[0].id;
  currentUserId=id;
  res.render("/");

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
