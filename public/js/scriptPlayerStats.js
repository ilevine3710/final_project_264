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

var roundsArray = []
var allPlayers = true;
const ctx1 = document.getElementById('chart1');
const ctx2 = document.getElementById('chart2');
const ctx3 = document.getElementById('chart3');
const ctx4 = document.getElementById('chart4');
var chart1 = new Chart(ctx1, null); // Bar chart for round scores relative to par
var chart2 = new Chart(ctx2, null); // Pie chart for average round
var chart3 = new Chart(ctx3, null); // Bar chart for TODO:
var chart4 = new Chart(ctx4, null); // Pie chart for specific hole

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
      }
  );
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
      }
  );
});
$("#holeSelectorDropdown").change(() => {
  makeChart4();
});
function init() {
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
        data: {
        },
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
    console.error(error); // This will be executed if the promise is rejected
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
  roundsArray = []
  for(let i = 0; i < rounds.length; i++) {
    junk = [];
    junk.push(rounds[i].SCORE1 - rounds[i].PAR1);
    junk.push(rounds[i].SCORE2 - rounds[i].PAR2);
    junk.push(rounds[i].SCORE3 - rounds[i].PAR3);
    junk.push(rounds[i].SCORE4 - rounds[i].PAR4);
    junk.push(rounds[i].SCORE5 - rounds[i].PAR5);
    junk.push(rounds[i].SCORE6 - rounds[i].PAR6);
    junk.push(rounds[i].SCORE7 - rounds[i].PAR7);
    junk.push(rounds[i].SCORE8 - rounds[i].PAR8);
    junk.push(rounds[i].SCORE9 - rounds[i].PAR9);
    junk.push(rounds[i].SCORE10 - rounds[i].PAR10);
    junk.push(rounds[i].SCORE11 - rounds[i].PAR11);
    junk.push(rounds[i].SCORE12 - rounds[i].PAR12);
    junk.push(rounds[i].SCORE13 - rounds[i].PAR13);
    junk.push(rounds[i].SCORE14 - rounds[i].PAR14);
    junk.push(rounds[i].SCORE15 - rounds[i].PAR15);
    junk.push(rounds[i].SCORE16 - rounds[i].PAR16);
    junk.push(rounds[i].SCORE17 - rounds[i].PAR17);
    junk.push(rounds[i].SCORE18- rounds[i].PAR18);
    junk.push(rounds[i].TOTALSCORE - rounds[i].TOTALPAR);
    console.log(junk);
    roundsArray.push(junk)
  };
}
function makeChart1() {
  chart1.destroy();
  chart1 = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
  });
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
  chart3.destroy();
  chart3 = new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
function makeChart4() {
  let data = [0,0,0,0,0,0]
  const hole = $("#holeSelectorDropdown").val()
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
  chart4.destroy();
  chart4 = new Chart(ctx4, {
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