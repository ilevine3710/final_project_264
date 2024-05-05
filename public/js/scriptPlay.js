let gameSetting = {};

function initpage() {
    //see
    $("#state").html("course: " + gameSetting.course + "\nPlayers: " + gameSetting.people);
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