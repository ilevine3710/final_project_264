table = new Tabulator("#table", {
    layout:"fitColumns",      //fit columns to width of table
    addRowPos:"top",          //when adding a new row, add it to the top of the table
    pagination:"local",       //paginate the data
    paginationSize:7,         //allow 7 rows per page of data
    paginationCounter:"rows", //display count of paginated rows in footer
    initialSort:[             //set the initial sort order of the data
        {column:"DATE", dir:"asc"},
    ],
    columnDefaults:{
        tooltip:true,         //show tool tips on cells
    },
    columns:[                 //define the table columns
        {title:"Date", field:"DATE"},
        {title:"Player", field:"PLAYER"},
        {title:"Course", field:"COURSE"},
        {title:"Total Score", field:"TOTALSCORE"}
    ],
});

$(() => {
    init();
});
$("#playerSelectorDropdown").change(() => {
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
});
$("#courseSelectorDropdown").change(() => {
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
});
function changeRounds (rounds) {
    roundsData = [];
    console.log(rounds)
    rounds.forEach((round, index) => {
        date = round.DATE
        player = round.PLAYER
        course = round.COURSE
        x = round.TOTALSCORE - round.TOTALPAR
        strScore = x.toString()
        if (x > 0) {
            strScore = "+" + strScore
        }
        roundsData.push({DATE: date, PLAYER: player, COURSE: course, TOTALSCORE: strScore})
    });
    makeTable(roundsData)
} 
function loadPlayerDropdown(players) {
    $("#playerSelectorDropdown").append("")
    players.forEach((player, index) => {
        p = player.PLAYER
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
}
function makeTable(data) {
    table.setData([]);
    table.setData(data);
}
