const express = require('express')
const router = express.Router()
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");


router.get("/recommend", function (req, res) {
  res.render("recommend");
});
router.post("/recommend", function (req, res) {
  const restData = req.body;
  restData.id = uuid.v4();
  const filePath = path.join(__dirname,"..","data", "data.json");
  const savedRest = fs.readFileSync(filePath);
  const parsedData = JSON.parse(savedRest);
  parsedData.push(restData);

  fs.writeFileSync(filePath, JSON.stringify(parsedData));
  res.redirect("/confirm");
});
router.get("/restaurants/:id", function (req, res) {
  const ids = req.params.id;
  const filePath = path.join(__dirname,"..","data", "data.json");
  const fileData = fs.readFileSync(filePath);
  const parsedData = JSON.parse(fileData);
  for (const restaurant of parsedData) {
    if (restaurant.id === ids) {
      return res.render("individualPage", { restaurant: restaurant });
    }
  }
  res.render("404");
});
router.get("/restaurants", function (req, res) {
  const filePath = path.join(__dirname,"..","data", "data.json");
  const savedRest = fs.readFileSync(filePath);
  const parsedData = JSON.parse(savedRest);
  res.render("restaurants", {
    numberOfRest: parsedData.length,
    restaurants: parsedData,
  });
});

module.exports = router;