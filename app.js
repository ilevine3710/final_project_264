const express = require("express");
const path = require("path");

const app = express();


app.use(express.static(path.resolve(__dirname, "public")));
app.get('/button1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/button2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/rounds.html'));
});
app.listen(3000, () => console.log("Starting up Word Bounce"));