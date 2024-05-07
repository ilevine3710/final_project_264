let gameSetting = {};

let scores = [];

let pars = [];
let total = 0;

let hole = 1;
let highest = 1;

let overallScores = [];

function getCourse(){
    return new Promise(function(resolve,reject) {
        $.ajax(
            "/loadCourseInfo",
            {
            type: "GET",
            processData: true,
            dataType: "json",
            data: {
                course: gameSetting.course
            },
            success: function (info) {
                console.log(info);
                resolve(info);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error: " + jqXHR.responseText);
                alert("Error: " + textStatus);
                alert("Error: " + errorThrown);
                reject(errorThrown);
            }
            }
        );
    });
}

function initpage() {
    //see
    //$("#state").html("course: " + gameSetting.course + "\nPlayers: " + gameSetting.people);
    getCourse().then(function(got){
        pars = got;
        for (let i = 0; i < pars.length; i++) {
            total = total+pars[i];
        }
        for (let i = 0; i < gameSetting.people.length; i++) {
            scores.push(pars.slice(0)); //gotta pass by value >_>
            old = $("#holeScores").html();
            $("#holeScores").html(old+`<div><label for="quantity${i}">${gameSetting.people[i]}:</label>
            <input type="number" class="holeScore" id="quantity${i}" name="quantity${i}" value="${pars[hole]}" min="1" max="9"></div>`);
            //console.log(pars[hole]);
        }
    });
}

function updateScorecard() {
    $("#scoreRows").html("");
    let chartHtml = ``;
    for (let i = 0; i < gameSetting.people.length; i++) {
        chartHtml = chartHtml + `<tr><th>${gameSetting.people[i]}</th>`;
        for (let j = 0; j < 9; j++) {
            if (j+1 < highest) {
                chartHtml = chartHtml + `<td>${scores[i][j]}</td>`;
            }
            else{
                chartHtml = chartHtml + `<td>-</td>`;
            }
        }
        chartHtml = chartHtml + `</tr>`;
    }
    $("#scoreRows").html(chartHtml);
    $("#scoreRows2").html("");
    let chart2Html = ``;
    for (let i = 0; i < gameSetting.people.length; i++) {
        chart2Html = chart2Html + `<tr><th>${gameSetting.people[i]}</th>`;
        for (let j = 9; j < 18; j++) {
            if (j+1 < highest) {
                chart2Html = chart2Html + `<td>${scores[i][j]}</td>`;
            }
            else{
                chart2Html = chart2Html + `<td>-</td>`;
            }
        }
        chart2Html = chart2Html + `</tr>`;
    }
    $("#scoreRows2").html(chart2Html);
}

function updateLeaderboard() {
    overallScores = [];
    for (let i = 0; i < gameSetting.people.length; i++) {
        overall = 0;
        e = 0;
        for (let j = 0; j < hole-1; j++) {
            overall = overall + scores[i][j];
            e = e + pars[j];
        }
        overall = overall - e;
        overallScores.push({player: gameSetting.people[i], overall: overall});
    }
    overallScores.sort(function(a, b) {
        return a.overall - b.overall;
    });
    //console.log(overallScores);
    let leaderboardH = ``;
    for (let i = 0; i < overallScores.length; i++) {
        if(i === 0){
            leaderboardH = `<div><div class="rank">👑${overallScores[i].overall}</div><div class="tag">${overallScores[i].player}</div></div>`;
        }
        else{
            leaderboardH = leaderboardH + `<div><div class="rank">${overallScores[i].overall}</div><div class="tag">${overallScores[i].player}</div></div>`;
        }
        //console.log(leaderboardH);
    }
    $("#leaderboard").html(leaderboardH);
}

function endgame() {
    $("#map").html(`<div style="font-size: 25px;">Congratulations ${overallScores[0].player}!</div><br><img src="images/basket.png" style="height: 400px">`);
    $("#leftside").html("");
    $("#Quit").html("Save and Quit");


}

function increment(step) {
    tempHoleScores = [];
    $(".holeScore").each(function() {
        val = parseInt($(this).val());
        tempHoleScores.push(val);
    });
    for (let i = 0; i < gameSetting.people.length; i++) {
        scores[i][hole-1] = tempHoleScores[i];
    }
    if(hole === 1 && step < 0){
        return //Tozshey
    }
    $("#holeScores").html("");
    hole = hole + step;
    if(hole > highest){ highest = hole; }
    updateScorecard();
    updateLeaderboard();
    if(hole === 19 && step > 0){
        endgame();
        return; 
    }
    for (let i = 0; i < gameSetting.people.length; i++) {
        old = $("#holeScores").html();
        $("#holeScores").html(old+`<div><label for="quantity${i}">${gameSetting.people[i]}:</label>
        <input type="number" class="holeScore" id="quantity${i}" name="quantity${i}" value="${scores[i][hole-1]}" min="1" max="9"></div>`);
    }
    $("#holeNumber").html(`Hole ${hole}`);
    
}

$("#nextHole").click(() => {
    increment(1);
});

$("#prevHole").click(() => {
    increment(-1);
});

$("#Quit").click(()=>{
    window.location.href = "http://localhost:3000/Home";
})

$(()=>{
    //loads game setting into gameSettigns variable for use later
    $.ajax(
        "/loadPlayState",
        {
          type: "GET",
          processData: true,
          dataType: "json",
          success: function (state) {
            gameSetting = state;
            initpage();
          },
          error: function (jqXHR, textStatus, errorThrown) {
            alert("Error: " + jqXHR.responseText);
            alert("Error: " + textStatus);
            alert("Error: " + errorThrown);
          }
        }
    );
});