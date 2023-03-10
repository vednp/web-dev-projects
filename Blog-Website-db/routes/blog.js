const express = require("express");
const db = require("../database");
const router = express.Router();
const mongodb = require('mongodb')

const ObjectId = mongodb.ObjectId;
router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const data = await db.getDb().collection("posts").find({},{title:1 , summary:1}).toArray();
  res.render("posts-list", { data: data });
});

router.get("/new-post", async function (req, res) {
  const authors = await db.getDb().collection("author").find().toArray();
  res.render("create-post", { authors: authors });
});

router.post("/posts", async function (req, res) {
  postData = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
  };
  const data = await db.getDb().collection("posts").insertOne(postData);
  res.redirect("/posts");
});

router.get('/posts/:id', async function (req,res) {
  const postID = req.params.id;
  const post = await db.getDb().collection('posts').findOne({_id: new ObjectId(postID)},{summary:0})
  res.render('post-detail', {post:post})
})

router.post('/posts/:id/delete', async function (req,res) {
  const postID = req.params.id;
  const post = await db.getDb().collection('posts').deleteOne({_id: new ObjectId(postID)})
  res.redirect('/posts')
})

 
module.exports = router;
