// Universal Stuff
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

// Database stuff
const db = require('better-sqlite3')('rounds.db');
db.pragma('journal_mode = WAL');

rounds = [];
players = [];
courses = [];

app.get('/loadPlayers', (req, res) => {
    loadPlayers(res);
});
app.get('/loadCourses', (req, res) => {
    loadCourses(res);
});
app.get('/changeRounds', (req, res) => {
    const player = req.query.player;
    const course = req.query.course;
    returnRounds(res, player, course, db);
});
function returnRounds(res, player, course, db) {
    rounds = [];
    let arr = db.prepare("SELECT * FROM mytable WHERE PLAYER LIKE ('%" + player + "%') AND COURSE LIKE ('%" + course + "%')");
    if (player == "all" && course == "all") {
        arr = db.prepare("SELECT * FROM mytable");
    } else if (player == "all") {
        arr = db.prepare("SELECT * FROM mytable WHERE COURSE LIKE ('%" + course + "%')");
    } else if (course == "all") {
        arr = db.prepare("SELECT * FROM mytable WHERE PLAYER LIKE ('%" + player + "%')");
    }
    for (let i of arr.iterate()) {
        rounds.push(i);
    }
    const ret = JSON.stringify(rounds);
    res.end(ret)
}
function loadPlayers(res) {
    players = [];
    let arr = db.prepare("SELECT DISTINCT PLAYER FROM mytable");
    for (let i of arr.iterate()) {
        players.push(i);
    }
    const ret = JSON.stringify(players);
    res.end(ret)
}
function loadCourses(res) {
    courses = [];
    let arr = db.prepare("SELECT DISTINCT COURSE FROM mytable");
    for (let i of arr.iterate()) {
        courses.push(i);
    }
    const ret = JSON.stringify(courses);
    res.end(ret)
}
