const express = require("express");

const app = express(); 

const path = require("path"); 

const {v4 : uuidv4} = require('uuid');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

let methodOveride = require("method-override");

app.use(methodOveride('_method'));

const port = process.env.PORT || 5500;

app.set('view engine', 'ejs');

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(port , (req , res) =>{
  console.log(`your port is http://localhost:${port}`);
});

let posts = [{
  id: "madhusudan",
  username: "Madhusudan Badgujar",
  content : "Software Engineer with 7+ years of experience facilitating cutting-edge engineering solutions with a wide range ofe-commerce application and technology skills. Proven ability to leverage full-stack knowledge and experience to build interactive and user-centered website designs to scale. Extensive expertise in large system architecture development and administration, as well as network design and configuration."
}, 
{
  id: "kalpesh",
  username: "Kalpesh Badgujar",
  content : "I am 12th persuing and preparing for MHT_CET, inspired by Kunal Badgujar's journey"
}, 
{
  id:"Kunal",
  username: "Kunal Badgujar",
  content : "Hi ! Kunal is here, to tell you excited journey for MHT CET got 95%tile. Want a Future in computer Science in top collage"
}

]

app.get("/", (req, res) => {
  res.render("index.ejs" , {posts});
});

app.get("/new", (req, res)=>{
  res.render("new_post.ejs");

});

app.post("/", (req, res) =>{
  let {username , content} = req.body;
  const id = uuidv4();
  console.log(id);
 posts.push({ id ,username , content});
  res.redirect("/")
});

app.patch("/:id/edit",(req, res)=>{
let {id} = req.params; 
  let newContent = req.body.content; 
  let post = posts.find((p)=>id === p.id);
  post.content = newContent; 
  console.log({post});
  res.redirect("/");
} );


app.get("/:id", (req, res) => {
  let { id } = req.params;
  console.log("Requested ID:", id);

  let post = posts.find((p)=>id ===p.id);
  console.log("Found Post:", post);

  res.render("searchUser.ejs", { post });
});

app.get("/:id/edit", (req , res)=>{ 
  let {id} = req.params; 
    let post = posts.find((p)=>id === p.id);
  res.render("edit.ejs", {post});
});

app.delete("/:id",(req , res)=>{ 
  let {id} = req.params; 
    posts = posts.filter((p)=>id !== p.id);
  res.redirect("/");
  });

app.get("/favicon.ico", (req, res) => res.status(204).end());
