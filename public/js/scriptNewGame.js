$("#courses").change(function() {
    course = $("#courses").val();
    if(course === "Moore"){
        $("#map").html(`<iframe src="https://www.google.com/maps/d/u/0/embed?mid=1JmStA0uMW9vcS6OWsihFF4o6BdM4CiE&ehbc=2E312F&noprof=1" width="640" height="480"></iframe>`)
    }
    if(course === "South Mountain"){
        $("#map").html(`<iframe src="https://www.google.com/maps/d/u/0/embed?mid=14Egs3xzIrjR-rfE7y-bx5oc50x_xfpc&ehbc=2E312F&noprof=1" width="640" height="480"></iframe>`)
    }
});

readyPlayers = [];
potential_players = ["choose a player..."];


function populate() {
    let readyHtml = "";
    for (let i = 0; i < readyPlayers.length; i++) {
        readyHtml = readyHtml + `<div class="playertag">
        <div class="username">${readyPlayers[i]}</div>
      </div>\n`
    }
    $("#playersList").html(readyHtml);

    let potentialHtml = "";
    for (let i = 0; i < potential_players.length; i++) {
        potentialHtml = potentialHtml + `<option value="${potential_players[i]}">${potential_players[i]}</option>\n`
    }
    $("#players").html(potentialHtml);
    console.log(readyPlayers);
}

$("#players").change(function() {
    player = $("#players").val();
    for (let i = 0; i < potential_players.length; i++) {
        if(player === potential_players[i]){
            readyPlayers.push(player);
            potential_players.splice(i,1);
        }
    }
    populate();
});

addToDatabase = [];

$("#newButton").click(function(){
    newPlayerName = $("#pname").val();
    $("#pname").val("");
    needAddToDatabase = true;
    if(newPlayerName === ""){
        return;
    }
    for (let i = 0; i < readyPlayers.length; i++) {
        if(newPlayerName === readyPlayers[i]){
            return;
        }
    }
    for (let i = 0; i < potential_players.length; i++) {
        if(newPlayerName === potential_players[i]){
            needAddToDatabase = false;
        }
    }
    if(needAddToDatabase){
        addToDatabase.push(newPlayerName);
    }
    readyPlayers.push(newPlayerName);
    populate();
});

function initPlayers() {
    $.ajax(
        "/loadPlayers",
        {
          type: "GET",
          processData: true,
          dataType: "json",
          success: function (players) {
            for (let i = 0; i < players.length; i++) {
                potential_players.push(players[i].PLAYER);
            }
            populate();
          },
          error: function (jqXHR, textStatus, errorThrown) {
            alert("Error: " + jqXHR.responseText);
            alert("Error: " + textStatus);
            alert("Error: " + errorThrown);
          }
        }
    );
}


$(()=>{
    initPlayers();
});