// Put your name and ID here 

const express = require("express");
const path = require("path");

const app = express();

const fs = require('fs');
const fsPromises = require('fs').promises;
rectangles = []
arr = []
index = 0;

app.use(express.static(
  path.resolve(__dirname, "public")
));
app.get("/makeWord", (req, res) => {
  if (index == arr.length) { // If no more words left
    const ret = JSON.stringify(null);
    res.end(ret);
  } 
  else {
    word = arr[index++];
    const ret = JSON.stringify(word);
    rectangles.push(word);
    res.end(ret);
  }
});
app.get("/load", (req, res) => {
  fsPromises.readFile("./words.txt")
  .then(function (result) {
    words = "" + result
    arr = words.split("\n"); // Creates array of all the words
    const ret = JSON.stringify(rectangles);
    res.end(ret);
  })
  .catch(function (error) {
    console.log(error);
    const ret = JSON.stringify(rectangles);
    res.end(ret);
  })
});
app.listen(3000, () => console.log("Starting up Word Bounce"));