$("#courses").change(function(datavalue) {
    course = $("#courses").val();
    if(course === "Moore"){
        $("#map").html(`<iframe src="https://www.google.com/maps/d/u/0/embed?mid=1JmStA0uMW9vcS6OWsihFF4o6BdM4CiE&ehbc=2E312F&noprof=1" width="640" height="480"></iframe>`)
    }
    if(course === "South Mountain"){
        $("#map").html(`<iframe src="https://www.google.com/maps/d/u/0/embed?mid=14Egs3xzIrjR-rfE7y-bx5oc50x_xfpc&ehbc=2E312F&noprof=1" width="640" height="480"></iframe>`)
    }
});