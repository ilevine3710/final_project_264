table = new Tabulator("#table", {
    layout:"fitData",
    addRowPos:"top",          //when adding a new row, add it to the top of the table
    pagination:"local",       //paginate the data
    paginationSize:1000,         //allow 7 rows per page of data
    paginationCounter:"rows", //display count of paginated rows in footer
    columnDefaults:{
        tooltip:true,         //show tool tips on cells
    },
    columns:[                 //define the table columns
        {title:"Date", field:"DATE", frozen:true},
        {title:"Player", field:"PLAYER", frozen:true},
        {title:"Course", field:"COURSE", frozen:true},
        {title:"Total Score", field:"TOTALSCORE", frozen:true},
        {title:"Hole 1", field:"HOLE1"},
        {title:"Hole 2", field:"HOLE2"},
        {title:"Hole 3", field:"HOLE3"},
        {title:"Hole 4", field:"HOLE4"},
        {title:"Hole 5", field:"HOLE5"},
        {title:"Hole 6", field:"HOLE6"},
        {title:"Hole 7", field:"HOLE7"},
        {title:"Hole 8", field:"HOLE8"},
        {title:"Hole 9", field:"HOLE9"},
        {title:"Hole 10", field:"HOLE10"},
        {title:"Hole 11", field:"HOLE11"},
        {title:"Hole 12", field:"HOLE12"},
        {title:"Hole 13", field:"HOLE13"},
        {title:"Hole 14", field:"HOLE14"},
        {title:"Hole 15", field:"HOLE15"},
        {title:"Hole 16", field:"HOLE16"},
        {title:"Hole 17", field:"HOLE17"},
        {title:"Hole 18", field:"HOLE18"},
        
    ],
});

//TODO: fix lines on chart 1
// table with best performance on each hole

var roundsArray = []
var parArray = [];
var scoreArray = [];
var allPlayers = true;
const ctx1 = document.getElementById('chart1');
const ctx2 = document.getElementById('chart2');
const ctx3 = document.getElementById('chart3');
const ctx4 = document.getElementById('chart4');
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
        plugins: {
            legend: {
                display: false,
            },
        },
        animation: {
            animateRotate: true,
            animateScale: true,
            duration: 2000, 
            easing: 'easeInOutQuart'
        }
    }
}); 
var chart2 = new Chart(ctx2, null); 
var chart3 = new Chart(ctx3, { // Bar chart for TODO:
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
        plugins: {
          annotation: {
            annotations: {
              line1: {
                type: 'linse',
                yMin: 60,
                yMax: 60,
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
              }
            }
          }
        }
    }
});
var chart4 = new Chart(ctx4, {// Pie chart for specific hole and all holes
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
$("#playerSelectorDropdown").change(() => {
  if ($("#playerSelectorDropdown").val() == "all") {
    allPlayers = true;
  } else {
    allPlayers = false;
  }
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
$("#holeSelectorDropdown").change(() => {
    makeChart4();
});
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
function changeRounds (rounds) {
    makeRoundArray(rounds);
    makeChart1();
    makeChart2();
    makeChart3();
    makeChart4();
    let roundsData = [];
    let colorsArr = [];
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
        colorsArr.push(getColors(round));
    }); 
    makeTable(roundsData, colorsArr);
} 
function loadPlayerDropdown(players) {
    $("#playerSelectorDropdown").empty();
    $("#playerSelectorDropdown").append(`<option value="all">All Players</option>`);
    players.forEach((player, index) => {
        let p = player.PLAYER
        $("#playerSelectorDropdown").append(`<option value="${p}">${p}</option>`);
    });
}
function loadCourseDropdown(courses) {
    $("#courseSelectorDropdown").empty();
    courses.forEach((course, index) => {
        c = course.COURSE
        $("#courseSelectorDropdown").append(`<option value="${c}">${c}</option>`);
    });
}
function makeTable(data, colorsArr) {
    table.setData([]);
    table.setData(data);
    table.setPageSize(1000);
    table.setPageSize(10);
    const rows = table.getRows();
    for (let i = 0; i < rows.length; i++) {
        cells = rows[i].getCells();
        for (let j = 4; j < 22; j++) {
            cells[j].getElement().style.color = colorsArr[i][j - 4];
        } 
    } 
}
//TODO: FIX COLORS MORON IDIOT
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
function  makeRoundArray(rounds) {
    roundsArray = [];
    parArray = [];
    scoreArray = [];
    for(let i = 0; i < rounds.length; i++) {
        junk1 = [];
        junk2 = [];
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
        junk2.push(rounds[i].SCORE1);
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
        roundsArray.push(junk1);
        scoreArray.push(junk2);
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
function makeChart1() {
    parColors = [];
    parBorders = [];
    data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    scoreArray.forEach((round,index) => {
        for (let i = 0; i <= 17; i++) {
            data[i] += round[i] / scoreArray.length;
        }
    });
    parArray.forEach((par, index) => { 
        switch (par) {
            case(3):
                parColors.push("rgba(75, 192, 192, 0.2)");
                parBorders.push("green");
                break;
            case(4):
                parColors.push("rgba(54, 162, 235, 0.2)");
                parBorders.push("blue");
                break;
            default:
                parColors.push("rgba(153, 102, 255, 0.2)");
                parBorders.push("purple");
                break;
        }
    });
    addBorders(chart1, parColors, parBorders);
    removeData(chart1);
    addData(chart1, data);
    c
}
function makeChart2() {
    let data = [0,0,0,0,0,0]
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
    chart2.destroy()
    chart2 = new Chart(ctx2, {
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
            data: data,
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
            animation: {
            animateRotate: true,
            animateScale: true,
            duration: 2000, 
            easing: 'easeInOutQuart'
        }}
    });
}
function makeChart3() {
  
}
function makeChart4() {
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
    removeData(chart4);
    addData(chart4, data)
}
function addData(chart, newData) {
    chart.data.datasets.forEach((dataset) => {
        dataset.data = newData;
    });
    chart.update();
}
function removeData(chart) {
    chart.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });
    chart.update();
}
function addBorders(chart, parColors, parBorders) {
    chart.data.datasets.forEach((dataset) => {
        dataset.backgroundColor = [];
        dataset.borderColor = [];
        dataset.backgroundColor = parColors;
        dataset.borderColor = parBorders;
    });
}