const express = require("express");
const path = require("path");

const app = express();


app.use(express.static(path.resolve(__dirname, "public")));
app.get('/Home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/New_Game', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/newGame.html'));
});
app.get('/Stats', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/playerStats.html'));
});
app.listen(3000, () => console.log("Starting up Word Bounce"));