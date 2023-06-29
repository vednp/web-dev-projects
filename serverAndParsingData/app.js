const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

app.use(express.urlencoded({extended:false}));

app.get("/", (req, res) => {
  res.send(
    "<h3>Enter name<form action='/getUsers' method='POST' ><input type= 'text' name='username'> <button>Submit</button> </form></h3>"
  );
});

app.post("/getUsers", (req,res) => {
  const name = req.body.username;
  const filepath = path.join(__dirname , "names.json");
  const fileData = fs.readFileSync(filepath);
  const ExistingUser = JSON.parse(fileData);
  ExistingUser.push(name);
  fs.writeFileSync(filepath,JSON.stringify(ExistingUser));
  let resData = "<ul>";
  for (const user of ExistingUser) {
    resData += "<li>" + user + "</li>";
  }

  resData += "</ul>";

  res.send(resData);
});

app.listen("3000", () => {
  console.log("server started at port 3000");
});
