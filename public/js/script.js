rectangles = []
colors = ["blue","Crimson","indigo","maroon", "DarkSlateGray", "red", "purple","SteelBlue","DarkBlue", "DimGrey", "SaddleBrown","SeaGreen","LightPink","SpringGreen","Violet","OrangeRed", "yellow","green","cyan","Chartreuse", "Coral", "Gold","HotPink"]

class Rectangle {
    constructor(color, name, text, directionX, directionY, rect) {
        this.color = color;
        this.name = name;
        this.text = text;
        this.directionX = directionX;
        this.directionY = directionY;
        this.posX = rect[0];
        this.posY = rect[1];
        this.width = rect[2];
        this.height = rect[3];
    }
}
$("#canvas").click(function(evt) {
    const click = evt.target;
    x = evt.pageX;
    y = evt.pageY;
    if (!click) {
        return;
    } 
    if (x >= 61 && x <= 140  && y >= 140 && y <= 185) {
        $.ajax(
            "/makeWord",
            {
                type: "GET",
                dataType: "json",
                success: function (word) {
                    if (word) {
                        makeWord(word);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error: " + jqXHR.responseText);
                    alert("Error: " + textStatus);
                    alert("Error: " + errorThrown);
                }
            }
        );
    }
});
$(() => {
    init();
    const canvas = $("#canvas")[0];
    canvas.width=1000;
    canvas.height=500;
    canvas.style.width=800;
    canvas.style.height=500;
    drawButton(canvas)
});
function drawButton(canvas) {
    const ctx = canvas.getContext("2d");
    window.devicePixelRatio=2;   
    x = 10;
    y = 20;
    width = 100;
    height = 50;
    ctx.fillStyle = "#F0941F";
    ctx.lineWidth = 2;
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height); 

    ctx.font = "20px Silkscreen";
    ctx.textAlign = "center";
    ctx.strokeStyle = "#363432"
    ctx.fillStyle = "#363432"
    ctx.fillText("Launch", 60, 50);
    ctx.save()
}
function init() {
    $.ajax(
        "/load",
        {
            type: "GET",
            dataType: "json",
            success: function (words) {
                for (i = 0; i < words.length; i++) {
                    makeWord(words[i])
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            alert("Error: " + jqXHR.responseText);
            alert("Error: " + textStatus);
            alert("Error: " + errorThrown);
            }
        }
    );
}
function makeWord(word) {
    index = Math.floor(Math.random() * colors.length); // Random color
    color = colors[index];
    text = "#363432"
    if (index <= 10) { // Dark Color -> Light text
        text = "#efdbc2"
    }
    rect = []
    index = Math.floor(Math.random() * 4);
    directionX = 0;
    directionY = 0;
    switch (index) { // Random Wall and direction
        case (0): // Top Wall
            rect = [475, 0, 100, 50];
            do {
                directionX = Math.random() * 4 - 2;
                directionY = -2 * Math.random();
            } while (Math.abs(directionX) < 0.5 || Math.abs(directionY) < 0.5)
            break;
        case (1): // Bottom Wall
            rect = [475, 450, 100, 50] 
            do {
                directionX = Math.random() * 4 - 2;
                directionY = 2 * Math.random();
            } while (Math.abs(directionX) < 0.5 || Math.abs(directionY) < 0.5)
            break;
        case (2): // Left Wall
            rect = [0, 250, 100, 50]
            do {
                directionX = -2 * Math.random();
                directionY = Math.random() * 4 - 2;
            } while (Math.abs(directionX) < 0.5 || Math.abs(directionY) < 0.5)
            break;
        default: // Right Wall
            rect = [900, 250, 100, 50]
            do {
                directionX = 2 * Math.random();
                directionY = Math.random() * 4 - 2;
            } while (Math.abs(directionX) < 0.5 || Math.abs(directionY) < 0.5)
            break;
    } rectangles.push(new Rectangle(color, word, text, directionX, directionY, rect))  
}
function moveRect(time) {
    const canvas = $("#canvas")[0];
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears everything on canvas
    for (i = 0; i < rectangles.length; i++) {
        r = rectangles[i];
        if (r.posX <= 0 && r.directionX < 0) { // Right Wall, make sure direction goes left
           r.directionX = r.directionX * -1
        } else if (r.posX >= 900 && r.directionX > 0) { // Left Wall, make sure direction goes right
            r.directionX = r.directionX * -1
        } if (r.posY <= 0 && r.directionY < 0) { // Bottom Wall, make sure direction goes up
            r.directionY = r.directionY * -1;
        } else if (r.posY >= 450 && r.directionY > 0) { // Top Wall, make sure direction goes downn
            r.directionY = r.directionY * -1;
        }
        r.posX += r.directionX;
        r.posY += r.directionY;
        ctx.fillStyle = r.color;
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#363432";
        ctx.fillRect(r.posX, r.posY, r.width, r.height);
        ctx.strokeRect(r.posX, r.posY, r.width, r.height); 
        ctx.font = "15px Silkscreen";
        ctx.textAlign = "center";
        ctx.fillStyle = r.text;
        ctx.fillText(r.name, r.posX + 50, r.posY + 35);
        ctx.save();
    } drawButton(canvas); // Redraws Button
    window.requestAnimationFrame(moveRect);
};
window.requestAnimationFrame(moveRect);