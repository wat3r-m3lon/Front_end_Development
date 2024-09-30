import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db=new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "3201",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  // { id: 1, title: "Buy milk" },
  // { id: 2, title: "Finish homework" },
];
async function getAll(){
  const result = await db.query("SELECT * FROM items");
  console.log(result);
  return result.rows;
};

app.get("/", async(req, res) => {
  const items = await getAll();
  console.log(items);
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  console.log(item);
  // items.push({ title: item });
  try{
    const result = await db.query("INSERT into items(title) VALUES ($1) RETURNING *", [item]);
    result.rows.forEach((item)=>{
      items.push(item);
    });
    console.log(result);
    console.log(items);
  } catch(err){
    console.log(err);
  }
  res.redirect("/");
});

app.post("/edit", async(req, res) => {
  const id = req.body.updatedItemId;
  const title =req.body.updatedItemTitle;
  try{
    const result = await db.query("UPDATE items SET title = ($1) WHERE id= ($2) RETURNING *", [title, id]);
    // result.rows.forEach((row)=>{
    //   const index = items.findIndex((item)=>item.id==row.id);
    //   if(index != -1){
    //     items[index].title=row.title;
    //   }else{
    //     items.push(row);
    //   }
    // });

    console.log(items);
  }catch(err){
    console.log(err);
  }
  res.redirect("/");
});

app.post("/delete", async(req, res) => {
  const id = req.body.deleteItemId;
  try{
    const result= await db.query("DELETE from items WHERE id =($1) RETURNING *", [id]);
    console.log(result);
  }catch(err){
    console.log(err);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
