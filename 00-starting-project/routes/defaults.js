const express = require('express')
const router = express.Router()
router.get("/", function (req, res) {
    res.render("index");
  });
  router.get("/about", function (req, res) {
    res.render("about");
  });
  router.get("/confirm", function (req, res) {
    res.render("confirm");
  });
  
  module.exports = router;