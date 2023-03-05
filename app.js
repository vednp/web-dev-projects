const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const uuid = require("uuid");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
const DefaultRoutes = require('./routes/defaults')
const RestRoutes = require('./routes/restaurants')

app.use('/',DefaultRoutes)
app.use('/',RestRoutes)

app.use(function (req, res) {
  res.status(404).render("404");
});

app.use(function (error, req, res) {
  res.status(500).render("500");
});
app.listen(3000);
