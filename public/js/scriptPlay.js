let gameSetting = {};

let scores = [];

let pars = [];

let hole = 1;

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
        for (let i = 0; i < gameSetting.people.length; i++) {
            scores.push(pars.slice(0)); //gotta pass by value >_>
            old = $("#holeScores").html();
            $("#holeScores").html(old+`<div><label for="quantity${i}">${gameSetting.people[i]}:</label>
            <input type="number" class="holeScore" id="quantity${i}" name="quantity${i}" value="${pars[hole]}" min="1" max="9"></div>`);
            console.log(pars[hole]);
        }
    });
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
    if(hole === 18 && step > 0){
        return; //come bak to this
    }
    if(hole === 1 && step < 0){
        return //Tozshey
    }
    $("#holeScores").html("");
    hole = hole + step;
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