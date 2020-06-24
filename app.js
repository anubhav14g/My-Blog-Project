const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This is your home page where you can see post that you have made.This is probably the page where you can go from anywhere. But remember to post everyday because posting gets you to hosting. Everyone can see your post so post something which increases public attention and your attention also.Now what you are waiting for...GO & POST.";
const aboutContent = "I am a student not developer but want to be developer rather than always to be student.This is all about me.";
const contactContent ="It's not necessary to contact me rather you always keep you engaging to post something.I will made somthing new for you which is going to be very interesting,then I will add contact details.";

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts=[];
app.get("/",function(req,res)
{
  res.render('home',{homeContent:homeStartingContent,posts:posts});
});

app.get("/about",function(req,res)
{
  res.render('about',{aboutContent:aboutContent});
});

app.get("/contact",function(req,res)
{
  res.render('contact',{contactContent:contactContent});
});

app.get("/compose",function(req,res)
{
  res.render('compose');
});

app.get("/posts/:newPage",function(req,res) {
    posts.forEach(function(x) {
      if(_.lowerCase(x.title)==_.lowerCase(req.params.newPage)){
        res.render('post',{postToPage:x.title,posts:posts});
        }
      });
});

app.post("/compose",function(req,res)
{
  const post={
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});


app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
