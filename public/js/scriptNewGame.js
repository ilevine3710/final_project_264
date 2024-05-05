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
potential_players = ["choose a player...", "Mzs_", "Chef_boyardee", "jkdls", "agressive_beef"];


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
    console.log(potential_players);


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

$(()=>{
    populate();
});