import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
  // let name1=req.body.fName;
  // let name2=req.body.lName;
  const total=req.body.fName.length +req.body.lName.length;
  res.render("index.ejs",{
    count:total,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
