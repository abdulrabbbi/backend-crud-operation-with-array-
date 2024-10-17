const express = require("express");
const app = express();
const path = require("path");
const port = 7262;
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

let posts = [
  {
    id: uuidv4(),
    username: "abdulrabi",
    post: "love you coding",
  },
  {
    id: uuidv4(),
    username: "fakhar",
    post: "love money from coding",
  },
  {
    id: uuidv4(),
    username: "komal",
    post: "student coordinater salary : 30000 still like a queen",
  },
];

// to show all the posts
app.get("/post", (req, res) => {
  res.render("posts.ejs", { posts });
});

// to render the form
app.get("/post/new", (req, res) => {
  res.render("new.ejs");
});
// to render the form data
app.post("/post", (req, res) => {
  let { username, post } = req.body;
  let id = uuidv4();
  posts.push({ id, username, post });
  res.redirect("/post");
});
//to see the induidual  post
app.get("/post/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => post.id == id);
  res.render("show.ejs", { post });
});

// TO  render the edits change
app.patch("/post/:id", (req, res) => {
  let { id } = req.params;
  let poster = posts.find((post) => post.id == id);
  let newpost = req.body.post;
  poster.post = newpost;
  res.redirect("/post");
});
// to edit the post
app.get("/post/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => post.id == id);
  // console.log(post);
  res.render("edit.ejs", { post });
});
// to delete from post
app.delete("/post/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((post) => post.id !== id);
  res.redirect("/post");
});
app.listen(port, () => {
  console.log("your port is listning for 7262");
});
