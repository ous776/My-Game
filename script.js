
var canvas = document.getElementById("myCanvas");

var ctx = canvas.getContext("2d");

ctx.strokeStyle = "#000000";
ctx.lineWidth = 10;
ctx.strokeRect(250, 150, 740, 300);

ctx.beginPath();
ctx.moveTo(500, 150);
ctx.lineTo(500, 450);
ctx.stroke();

canvas.addEventListener("click", function () {
    var x = 500;
    var y = 150;
    var animate = setInterval(function () {
        if (y < 200) {
            y += 5;
        } else if (y >= 200 && y < 325) {
            y += 10;
        } else {
            y += 5;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 10;
        ctx.strokeRect(250, 150, 740, 300);
        ctx.beginPath();
        ctx.moveTo(x, 150);
        ctx.lineTo(x, y);
        ctx.moveTo(x, 450);
        ctx.lineTo(x, 400 - y);
        ctx.stroke();

        if (y >= 400) {
            clearInterval(animate);
        }
    }, 10);
});