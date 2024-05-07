var roundsArray = []; // Array to hold the score vs par of each hole of each round
var parArray = []; // Array to hold the par of each hole of each round
var scoreArray = []; // Array to hold the score of each hole of each round
var scoreDateArray = []; // Array to hold the date vs score of each round

// Changes colors of cells based on par
var customFormatter = function(cell){
    var cellValue  = cell.getValue();
    var holeName = cell.getColumn().getField();
    var holeIndex = 0
    if (holeName.length == 5) {
        holeIndex = parseInt(holeName[4]) - 1;
    } else {
        holeIndex = parseInt(holeName[4] + holeName[5]) - 1;
    }
    if (parArray.length != 0) {
        let parScore = cellValue - parArray[holeIndex];
        let color = "rgba(139, 69, 19, 0.5)";
        switch(parScore){
            case (-2):
                color = "rgba(58, 58, 241, 0.5)";
                break;
            case (-1):
                color = "rgba(0, 128, 0, 0.5)";
                break;
            case (0):
                color = "rgba(128, 128, 128, 0.5)";
                break;
            case (1):
                color = "rgba(255, 0, 0, 0.5)";
                break;
            case (2):
                color = "rgb(128, 0, 128, 0.5)";
                break;
        } cell.getElement().style.backgroundColor = color;
    }
    return cellValue;
}
table = new Tabulator("#table", { // Table to store all rounds
    layout:"fitData",
    addRowPos:"top",          //when adding a new row, add it to the top of the table
    pagination:"local",       //paginate the data
    paginationSize:7,         //allow 7 rows per page of data
    paginationCounter:"rows", //display count of paginated rows in footer
    columnDefaults:{
        tooltip:true,         //show tool tips on cells
    },
    columns:[                 //define the table columns
        {title:"Date", field:"DATE", frozen:true},
        {title:"Player", field:"PLAYER", frozen:true},
        {title:"Course", field:"COURSE", frozen:true},
        {title:"Total Score", field:"TOTALSCORE", frozen:true},
        {title:"Hole 1", field:"HOLE1", formatter:customFormatter, hozAlign: "center"},
        {title:"Hole 2", field:"HOLE2", formatter:customFormatter, hozAlign: "center"},
        {title:"Hole 3", field:"HOLE3", formatter:customFormatter, hozAlign: "center"},
        {title:"Hole 4", field:"HOLE4", formatter:customFormatter, hozAlign: "center"},
        {title:"Hole 5", field:"HOLE5", formatter:customFormatter, hozAlign: "center"},
        {title:"Hole 6", field:"HOLE6", formatter:customFormatter, hozAlign: "center"},
        {title:"Hole 7", field:"HOLE7", formatter:customFormatter, hozAlign: "center"},
        {title:"Hole 8", field:"HOLE8", formatter:customFormatter, hozAlign: "center"},
        {title:"Hole 9", field:"HOLE9", formatter:customFormatter, hozAlign: "center"},
        {title:"Hole 10", field:"HOLE10", formatter:customFormatter, hozAlign: "center"},
        {title:"Hole 11", field:"HOLE11", formatter:customFormatter, hozAlign: "center"},
        {title:"Hole 12", field:"HOLE12", formatter:customFormatter, hozAlign: "center"},
        {title:"Hole 13", field:"HOLE13", formatter:customFormatter, hozAlign: "center"},
        {title:"Hole 14", field:"HOLE14", formatter:customFormatter, hozAlign: "center"},
        {title:"Hole 15", field:"HOLE15", formatter:customFormatter, hozAlign: "center"},
        {title:"Hole 16", field:"HOLE16", formatter:customFormatter, hozAlign: "center"},
        {title:"Hole 17", field:"HOLE17", formatter:customFormatter, hozAlign: "center"},
        {title:"Hole 18", field:"HOLE18", formatter:customFormatter, hozAlign: "center"},
    ],
});

const ctx1 = document.getElementById('chart1');
const ctx2 = document.getElementById('chart3');
const ctx3 = document.getElementById('chart4');
const clearLine = { // Clear line
    type: 'line',
    yMin: 4,
    yMax: 4,
    borderColor: 'rgba(54, 162, 255, 0.0)',
    borderWidth: 1,
}
const line2 = { // Par 4 line
    type: 'line',
    yMin: 4,
    yMax: 4,
    borderColor: 'rgba(54, 162, 255, 0.9)',
    borderWidth: 1,
}
const line3 = { // Par 5 line
    type: 'line',
    yMin: 5,
    yMax: 5,
    borderColor: 'rgba(153, 102, 255, 0.9)',
    borderWidth: 1,
}
var chart1 = new Chart(ctx1, { // Bar chart for average score on each hole
    type: 'bar',
    data: {
        labels: ['Hole 1', 'Hole 2', 'Hole 3', 'Hole 4', 'Hole 5', 'Hole 6', 
                'Hole 7', 'Hole 8', 'Hole 9', 'Hole 10', 'Hole 11', 'Hole 12',
                'Hole 13', 'Hole 14', 'Hole 15', 'Hole 16', 'Hole 17', 'Hole 18'],
        datasets: [{
            data: [0],
            borderWidth: 1, 
        },
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            annotation: {
                annotations: {
                    line1: {
                        type: 'line',
                        yMin: 3,
                        yMax: 3,
                        borderColor: 'rgba(75, 200, 100, 0.9)',
                        borderWidth: 1,
                    },
                    line2: clearLine,
                    line3: clearLine,
                }
            },
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                min: 0,
                max: 6,
                ticks: {
                    stepSize: 0.5 
                }
            }
        },
        animation: {
            animateRotate: true,
            animateScale: true,
            duration: 2000, 
            easing: 'easeInOutQuart'
        }
    }
}); 
var chart2 = new Chart(ctx2, { // Scatter chart for scores through time
    type: 'scatter',
    data: {
        
        datasets: [{
            labels: [],
            data: [],
            borderColor: "#102820",
            backgroundColor: "#4C6444",
            trendlineLinear: {
                style: "#4C6444",
                lineStyle: "dotted",
                width: 1.5,
            }
        },],
    },
    options: {
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            x: {
                min: convertDate("06/01/2022"),
                max: convertDate("06/01/2024"),
                type: 'time',
                time: {
                    unit: "month",
                    displayFormats: {
                        quarter: 'MM YYYY DD'
                    }
                }
            },
            y: {
                min: -5,
                max: 30,
            }
        },
        animation: {
            animateRotate: true,
            animateScale: true,
            duration: 500, 
            easing: 'easeInOutQuart'
        }
    }
});
var chart3 = new Chart(ctx3, {// Pie chart for specific hole and all holes
    type: 'pie',
    data: {
        labels: [
            'Eagle',
            'Birdie',
            'Par',
            'Bogie',
            'Double Bogie',
            'Triple Bogie+'
        ],
    datasets: [{
        data: [0,0,0,0,0,0],
        backgroundColor: [
            'DodgerBlue',
            'MediumSeaGreen',
            'Gray',
            'Red',
            'MediumPurple',
            'Sienna',
        ],
    borderColor: '#102820',
    hoverOffset: 4
    }],
},
options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        animateRotate: true,
        animateScale: true,
        duration: 2000, 
        easing: 'easeInOutQuart'
    }}
}); 

$(() => {
    init();
});
// When player selector changes, function gets rounds from app with new parameters
$("#playerSelectorDropdown").change(() => { 
  $.ajax("/changeRounds",
    {
        type: "GET",
        processData: true,
        data: {
            player: $("#playerSelectorDropdown").val(),
            course: $("#courseSelectorDropdown").val(),
        },
        dataType: "json",
        success: function (rounds) {
            changeRounds(rounds);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error: " + jqXHR.responseText);
            alert("Error: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
});
// When course selector changes, function gets rounds from app with new parameters
$("#courseSelectorDropdown").change(() => {
    $.ajax("/changeRounds",
    {
        type: "GET",
        processData: true,
        data: {
            player: $("#playerSelectorDropdown").val(),
            course: $("#courseSelectorDropdown").val(),
        },
        dataType: "json",
        success: function (rounds) {
            changeRounds(rounds);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error: " + jqXHR.responseText);
            alert("Error: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
});
// When course selector changes, function remakes chart 3
$("#holeSelectorDropdown").change(() => {
    makeChart3();
});
/* init() function:
    * Initializes hole dropdown
    * Loads players from app into dropdown
    * Loads courses from app into dropdown
    * Loads rounds from app
 */
function init() {
    $("#holeSelectorDropdown").empty();
    $("#holeSelectorDropdown").append(`<option value="all">All Holes</option>`);
    for (let i = 1; i <= 18; i++) {
        $("#holeSelectorDropdown").append(`<option value="${i}">Hole ${i}</option>`);
    }
    $.ajax(
        "/loadPlayers",
        {
            type: "GET",
            processData: true,
            data: {
            },
            dataType: "json",
            success: function (players) {
                loadPlayerDropdown(players);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error: " + jqXHR.responseText);
                alert("Error: " + textStatus);
                alert("Error: " + errorThrown);
            }
        }
    );
    $.ajax("/loadCourses",
        {
        type: "GET",
        processData: true,
        data: {},
        dataType: "json",
        success: function (courses) {
            loadCourseDropdown(courses);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error: " + jqXHR.responseText);
            alert("Error: " + textStatus);
            alert("Error: " + errorThrown);
        }
    }
  );
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Success!');
    }, 1000);
  });
  myPromise.then((result) => {
    $.ajax(
      "/changeRounds",
      {
        type: "GET",
        processData: true,
        data: {
          player: 'all',
          course: 'Covered Bridge Park',
        },
        dataType: "json",
        success: function (rounds) {
          changeRounds(rounds);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          alert("Error: " + jqXHR.responseText);
          alert("Error: " + textStatus);
          alert("Error: " + errorThrown);
        }
      }
    );
  }).catch((error) => {
  });
}
/* changeRounds(rounds) function:
    * Makes arrays from "rounds" json data
    * Makes the three charts from this data
    * Assigns colors to each hole to indicate score related to par
    * Displays these colors on table
 */
function changeRounds (rounds) {
    makeRoundArray(rounds);
    makeChart1();
    makeChart2();
    makeChart3();
    let roundsData = [];
    rounds.forEach((round, index) => {
        date = round.DATE
        player = round.PLAYER
        course = round.COURSE
        x = round.TOTALSCORE - round.TOTALPAR
        strScore = x.toString()
        if (x > 0) {
            strScore = "+" + strScore
        }
        roundsData.push({DATE: date, PLAYER: player, COURSE: course, TOTALSCORE: strScore,
        HOLE1: round.SCORE1, HOLE2: round.SCORE2, HOLE3: round.SCORE3, HOLE4: round.SCORE4, HOLE5: round.SCORE5, HOLE6: round.SCORE6,
        HOLE7: round.SCORE7, HOLE8: round.SCORE8, HOLE9: round.SCORE9, HOLE10: round.SCORE10, HOLE11: round.SCORE11, HOLE12: round.SCORE12,
        HOLE13: round.SCORE13, HOLE14: round.SCORE14, HOLE15: round.SCORE15, HOLE16: round.SCORE16, HOLE17: round.SCORE17, HOLE18: round.SCORE18})
    }); 
    table.setData(roundsData);
} 
/* loadPlayerDropdown(players) function:
    * Add "All players" option into players dropdown
    * Loads the array "players" into players dropdown
 */
function loadPlayerDropdown(players) {
    $("#playerSelectorDropdown").empty();
    $("#playerSelectorDropdown").append(`<option value="all">All Players</option>`);
    players.forEach((player, index) => {
        let p = player.PLAYER
        $("#playerSelectorDropdown").append(`<option value="${p}">${p}</option>`);
    });
}
/* loadCourseDropdown(courses) function:
    * Loads the array "courses" into course dropdown
 */
function loadCourseDropdown(courses) {
    $("#courseSelectorDropdown").empty();
    courses.forEach((course, index) => {
        c = course.COURSE
        $("#courseSelectorDropdown").append(`<option value="${c}">${c}</option>`);
    });
}
/* getColors(round) function:
    * Computes the correct color for each hole of each rounds based on its score vs par
 */
function getColors(round) {
    let colorNums = []
    let colors = []
    colorNums.push(round.SCORE1 - round.PAR1);
    colorNums.push(round.SCORE2 - round.PAR2);
    colorNums.push(round.SCORE3 - round.PAR3);
    colorNums.push(round.SCORE4 - round.PAR4);
    colorNums.push(round.SCORE5 - round.PAR5);
    colorNums.push(round.SCORE6 - round.PAR6);
    colorNums.push(round.SCORE7 - round.PAR7);
    colorNums.push(round.SCORE8 - round.PAR8);
    colorNums.push(round.SCORE9 - round.PAR9);
    colorNums.push(round.SCORE10 - round.PAR10);
    colorNums.push(round.SCORE11 - round.PAR11);
    colorNums.push(round.SCORE12 - round.PAR12);
    colorNums.push(round.SCORE13 - round.PAR13);
    colorNums.push(round.SCORE14 - round.PAR14);
    colorNums.push(round.SCORE15 - round.PAR15);
    colorNums.push(round.SCORE16 - round.PAR16);
    colorNums.push(round.SCORE17 - round.PAR17);
    colorNums.push(round.SCORE18 - round.PAR18);
    for (let i = 0; i < colorNums.length; i++) {
        color = "SaddleBrown"
        switch(colorNums[i]) {
            case (-2):
                color = "rgb(58, 58, 241)";
                break;
            case (-1):
                color = "green";
                break;
            case (0):
                color = "black";
                break;
            case (1):
                color = "red";
                break;
            case (2):
                color = "purple";
                break;
        } colors[i] = color
    } return colors;
}
/* makeRoundArray(rounds) function:
    * Remakes roundsArray, parArray, scoreArray, and scoreDateArray from "rounds"
 */
function makeRoundArray(rounds) {
    roundsArray = [];
    parArray = [];
    scoreArray = [];
    scoreDateArray = [];
    for(let i = 0; i < rounds.length; i++) {
        junk1 = [];
        junk2 = [];
        junk3 = [];
        junk1.push(rounds[i].SCORE1 - rounds[i].PAR1);
        junk2.push(rounds[i].SCORE1);
        junk1.push(rounds[i].SCORE2 - rounds[i].PAR2);
        junk2.push(rounds[i].SCORE2);
        junk1.push(rounds[i].SCORE3 - rounds[i].PAR3);
        junk2.push(rounds[i].SCORE3);
        junk1.push(rounds[i].SCORE4 - rounds[i].PAR4);
        junk2.push(rounds[i].SCORE4);
        junk1.push(rounds[i].SCORE5 - rounds[i].PAR5);
        junk2.push(rounds[i].SCORE5);
        junk1.push(rounds[i].SCORE6 - rounds[i].PAR6);
        junk2.push(rounds[i].SCORE6);
        junk1.push(rounds[i].SCORE7 - rounds[i].PAR7);
        junk2.push(rounds[i].SCORE7);
        junk1.push(rounds[i].SCORE8 - rounds[i].PAR8);
        junk2.push(rounds[i].SCORE8);
        junk1.push(rounds[i].SCORE9 - rounds[i].PAR9);
        junk2.push(rounds[i].SCORE9);
        junk1.push(rounds[i].SCORE10 - rounds[i].PAR10);
        junk2.push(rounds[i].SCORE10);
        junk1.push(rounds[i].SCORE11 - rounds[i].PAR11);
        junk2.push(rounds[i].SCORE11);
        junk1.push(rounds[i].SCORE12 - rounds[i].PAR12);
        junk2.push(rounds[i].SCORE12);
        junk1.push(rounds[i].SCORE13 - rounds[i].PAR13);
        junk2.push(rounds[i].SCORE13);
        junk1.push(rounds[i].SCORE14 - rounds[i].PAR14);
        junk2.push(rounds[i].SCORE14);
        junk1.push(rounds[i].SCORE15 - rounds[i].PAR15);
        junk2.push(rounds[i].SCORE15);
        junk1.push(rounds[i].SCORE16 - rounds[i].PAR16);
        junk2.push(rounds[i].SCORE16);
        junk1.push(rounds[i].SCORE17 - rounds[i].PAR17);
        junk2.push(rounds[i].SCORE17);
        junk1.push(rounds[i].SCORE18 - rounds[i].PAR18);
        junk2.push(rounds[i].SCORE18);
        junk1.push(rounds[i].TOTALSCORE - rounds[i].TOTALPAR);
        junk2.push(rounds[i].TOTALSCORE);
        junk3.push(rounds[i].DATE);
        junk3.push(rounds[i].TOTALSCORE - rounds[i].TOTALPAR);
        roundsArray.push(junk1);
        scoreArray.push(junk2);
        scoreDateArray.push(junk3);
    }; 
    parArray.push(rounds[0].PAR1);
    parArray.push(rounds[0].PAR2);
    parArray.push(rounds[0].PAR3);
    parArray.push(rounds[0].PAR4);
    parArray.push(rounds[0].PAR5);
    parArray.push(rounds[0].PAR6);
    parArray.push(rounds[0].PAR7);
    parArray.push(rounds[0].PAR8);
    parArray.push(rounds[0].PAR9);
    parArray.push(rounds[0].PAR10);
    parArray.push(rounds[0].PAR11);
    parArray.push(rounds[0].PAR12);
    parArray.push(rounds[0].PAR13);
    parArray.push(rounds[0].PAR14);
    parArray.push(rounds[0].PAR15);
    parArray.push(rounds[0].PAR16);
    parArray.push(rounds[0].PAR17);
    parArray.push(rounds[0].PAR18);
    parArray.push(rounds[0].PARTOTAL);
}
/* makeChart1() function:
    * Remakes chart1 with new scoreArray and parArray
 */
function makeChart1() {
    parColors = [];
    parBorders = [];
    data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    console.log("abba");
    scoreArray.forEach((round,index) => {
        for (let i = 0; i <= 17; i++) {
            data[i] += round[i] / scoreArray.length;
        }
        console.log(round);
    });
    parArray.forEach((par, index) => { 
        if (index < 18) {
            switch (par) {
                case(3):
                    parColors.push("rgba(75, 192, 192, 0.2)");
                    parBorders.push("green");
                    break;
                case(4):
                    parColors.push("rgba(54, 162, 235, 0.2)");
                    parBorders.push("blue");
                    break;
                default :
                    parColors.push("rgba(153, 102, 255, 0.2)");
                    parBorders.push("purple");
                    break;
            }
        }
    });
    if (parBorders.includes("blue")) {
        chart1.options.plugins.annotation.annotations.line2 = line2;
    } else {
        chart1.options.plugins.annotation.annotations.line2 = clearLine;
    }
    if (parBorders.includes("purple")) {
        console.log(parBorders)
        chart1.options.plugins.annotation.annotations.line3 = line3;
    } else {
        chart1.options.plugins.annotation.annotations.line3 = clearLine;
    }
    addBorders(chart1, parColors, parBorders);
    addData(chart1, data);
}
/* makeChart2() function:
    * Remakes chart2 with new scoreDateArray
 */
function makeChart2() {
    let data = [];
    let minTime = convertDate(scoreDateArray[0][0]);
    let maxTime = convertDate(scoreDateArray[0][0]);
    scoreDateArray.forEach((round,index) => {
        data.push({x: convertDate(round[0]), y: round[1]});
        if (minTime > convertDate(round[0])) {
            minTime = convertDate(round[0]);
        } if (maxTime < convertDate(round[0])) {
            maxTime = convertDate(round[0]);
        }
    }); 
    addData(chart2, data);
    fixAxes(chart2, subMonth(minTime), addMonth(maxTime));
}
/* makeChart3() function:
    * Remakes chart3 with new roundsArray
 */
function makeChart3() {
    let data = [0,0,0,0,0,0]
    const hole = $("#holeSelectorDropdown").val()
    if (hole == "all") {
        roundsArray.forEach((round,index) => {
            for (let i = 0; i < 18; i++) {
                switch(round[i]) {
                    case -2:
                        data[0]++;
                        break;
                    case -1:
                        data[1]++;
                        break;
                    case 0:
                        data[2]++;
                        break;
                    case 1:
                        data[3]++;
                        break;
                    case 2:
                        data[4]++;
                        break;
                    default:
                        data[5]++;
                        break;
                }
            }
        });
    } else {
        roundsArray.forEach((round,index) => {
            switch(round[hole - 1]) {
                case -2:
                    data[0]++;
                    break;
                case -1:
                    data[1]++;
                    break;
                case 0:
                    data[2]++;
                    break;
                case 1:
                    data[3]++;
                    break;
                case 2:
                    data[4]++;
                    break;
                default:
                    data[5]++;
                    break;
            }
        });
    }
    addData(chart3, data);
}
/* addData(chart, newData) function:
    * Changes data of "chart" to "newData"
 */
function addData(chart, newData) {
    chart.data.datasets.forEach((dataset) => {
        dataset.data = newData;
    });
    chart.update();
}
/* addBorders(chart, parColors, parBorders) function:
    * Changes backgroundColor of "chart" to "parColors"
    * Changes borderColor of "chart" to "parBorders"
 */
function addBorders(chart, parColors, parBorders) {
    chart.data.datasets.forEach((dataset) => {
        dataset.backgroundColor = parColors;
        dataset.borderColor = parBorders;
    });
}
/* convertDate (date) function:
    * Converts mm/dd/yyyy to yyyy-mm-dd
 */
function convertDate (date) {
    var parts = date.split('/');
    return parts[2] + '-' + parts[0] + '-' + parts[1];
}
/* addMonth (date) function:
    * Returns string of date that is one month after "date"
 */
function addMonth (date) {
    var parts = date.split('-');
    let month = parseInt(parts[1]);
    let day = parts[2];
    let year = parseInt(parts[0]);
    if (month == 12) {
        month = 1;
        year++;
    } else {
        month++;
    }
    if (month <= 9) {
        return year + "-0" + month + "-" + day;
    }
    return year + "-" + month + "-" + day;
} 
/* subMonth (date) function:
    * Returns string of date that is one month before "date"
 */
function subMonth (date) {
    var parts = date.split('-');
    let month = parseInt(parts[1]);
    let day = parts[2];
    let year = parseInt(parts[0]);
    if (month == 1) {
        month = 12;
        year--;
    }
    else {
        month--;
    }
    if (month <= 9) {
        return year + "-0" + month + "-" + day;
    }
    return year + "-" + month + "-" + day;
}
/* fixAxes(chart, minTime, maxTime) function:
    * Sets min and max of x axis of "chart" to "minTime" and "maxTime"
 */
function fixAxes(chart, minTime, maxTime) {
    chart.options.scales.x.min = minTime;
    chart.options.scales.x.max = maxTime; 
    chart.update();   
}