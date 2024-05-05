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
//Frisbee Golf App === Frolf app === Frapp
welcome = `

              _                            _          _   _                
__      _____| | ___ ___  _ __ ___   ___  | |_ ___   | |_| |__   ___       
\\ \\ /\\ / / _ \\ |/ __/ _ \\| '_ ' _ \\ / _ \\ | __/ _ \\  | __| '_ \\ / _ \\      
 \\ V  V /  __/ | (_| (_) | | | | | |  __/ | || (_) | | |_| | | |  __/_ _ _ 
  \\_/\\_/ \\___|_|\\___\\___/|_| |_| |_|\\___|  \\__\\___/   \\__|_| |_|\\___(_|_|_)

                 _____                      
                |  ___| __ __ _ _ __  _ __  
                | |_ | '__/ _' | '_ \\| '_ \\ 
                |  _|| | | (_| | |_) | |_) |
                |_|  |_|  \\__,_| .__/| .__/ 
                               |_|   |_|    TM
`
app.listen(3000, () => console.log(welcome));

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
    if (player == "all") {
        arr = db.prepare("SELECT * FROM mytable WHERE COURSE LIKE ('%" + course + "%')");
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


//        __  __            _    _        ____            _   _             _ 
//       |  \/  | __ _ _ __| | _( )___   / ___|  ___  ___| |_(_) ___  _ __ | |
//       | |\/| |/ _` | '__| |/ /// __|  \___ \ / _ \/ __| __| |/ _ \| '_ \| |
//       | |  | | (_| | |  |   <  \__ \   ___) |  __/ (__| |_| | (_) | | | |_|
//       |_|  |_|\__,_|_|  |_|\_\ |___/  |____/ \___|\___|\__|_|\___/|_| |_(_)


//will store state of the game for now this is in format
// { course: 'Moore', people: [ 'Mark Latvakoski', 'Isaac Levine' ] }
let PlayState = ``;

//sets the play state with incoming data from users selections in /New_Game page
app.get('/setPlayState', (req, res) => {
    PlayState = req.query;
    res.end(JSON.stringify(PlayState));
})

//send play page
app.get('/Play', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/play.html'));
});

// sends the state to the /play page to load user selection in /New_game
app.get('/loadPlayState', (req, res) => {
    res.end(JSON.stringify(PlayState));
});



