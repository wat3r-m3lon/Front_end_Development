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
let countries=[];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", async (req, res) => {
  //Write your code here.
  try{
    const result =await db.query("select country_code from visited_countries");
    result.rows.forEach((country)=>{
      countries.push(country.country_code);
    })
    // countries=result.rows; 
    // This is pass a Object, not Element.
    
    console.log(countries);
    res.render("index.ejs",{total: countries.length, countries: countries});
    }catch(err){
      console.log("err",err.stack);
    }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
