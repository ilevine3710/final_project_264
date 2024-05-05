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
            scores.push(pars);
            old = $("#holeScores").html();
            $("#holeScores").html(old+`<div><label for="quantity${i}">${gameSetting.people[i]}:</label>
            <input type="number" class="holeScore" id="quantity${i}" name="quantity${i}" value="${pars[hole]}" min="1" max="9"></div>`);
            console.log(pars[hole]);
        }
    });
}

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