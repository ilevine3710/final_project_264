table = new Tabulator("#table", {
    layout:"fitData",
    addRowPos:"top",          //when adding a new row, add it to the top of the table
    pagination:"local",       //paginate the data
    paginationSize:7,         //allow 7 rows per page of data
    paginationCounter:"rows", //display count of paginated rows in footer
    columnDefaults:{
        tooltip:true,         //show tool tips on cells
    },
    columns:[                 //define the table columns
        {title:"Date", field:"DATE"},
        {title:"Player", field:"PLAYER"},
        {title:"Course", field:"COURSE"},
        {title:"Total Score", field:"TOTALSCORE"},
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
rounds = []
roundColors = []


$(() => {
    init();
});
function init() {
  $.ajax("/loadPlayers",
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
  $.ajax(
      "/changeRounds",
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
  makeChart1();
  makeChart2();
  makeChart3();
  makeChart4();
}
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
function changeRounds (rounds) {
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
    }); makeTable(roundsData, colorsArr)
} 
function loadPlayerDropdown(players) {
    $("#playerSelectorDropdown").append("")
    players.forEach((player, index) => {
        let p = player.PLAYER
        $("#playerSelectorDropdown").append(`<option value="${p}">${p}</option>`);
    });
}
function loadCourseDropdown(courses) {
    $("#courseSelectorDropdown").append("");
    courses.forEach((course, index) => {
        c = course.COURSE
        $("#courseSelectorDropdown").append(`<option value="${c}">${c}</option>`);
    });
}
function makeTable(data, colorsArr) {
    rounds = data;
    roundColors = colorsArr;
    table.setData(data);
    table.setPageSize(1000);
    table.setPageSize(7);
    const rows = table.getRows();
    for (let i = 0; i < rows.length; i++) {
        cells = rows[i].getCells();
        for (let j = 4; j < 22; j++) {
            cells[j].getElement().style.color = colorsArr[i][j - 4];
        } 
    }
}
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
function makeChart1(data) {
  const ctx1 = document.getElementById('chart1');
  new Chart(ctx1, {
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
function makeChart2(data) {
  const ctx2 = document.getElementById('chart2');
  new Chart(ctx2, {
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
function makeChart3(data) {
  const ctx3 = document.getElementById('chart3');
  new Chart(ctx3, {
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
function makeChart4(data) {
  const ctx4 = document.getElementById('chart4');
  new Chart(ctx4, {
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