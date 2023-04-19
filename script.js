var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var colors = ["#FF0000", "#0000FF"]; // red and blue colors
var ballsPerSide = 6;

// Draw the rectangle
var rectWidth = 740;
var rectHeight = 300;
var rectX = (canvas.width - rectWidth) / 2;
var rectY = (canvas.height - rectHeight) / 2;
ctx.strokeStyle = "#000000";
ctx.lineWidth = 10;
ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

// Draw the line
var lineX = canvas.width / 2;
ctx.beginPath();
ctx.moveTo(lineX, rectY);
ctx.lineTo(lineX, rectY + rectHeight);
ctx.stroke();

// Initialize the balls on the left side of the line
var leftBalls = [];
for (var i = 0; i < ballsPerSide; i++) {
    var x = Math.floor(Math.random() * (lineX - rectX)) + rectX;
    var y = Math.floor(Math.random() * rectHeight) + rectY;
    var color = colors[Math.floor(Math.random() * colors.length)];
    var dx = Math.random() * 5 + 1; // random speed on x-axis
    var dy = Math.random() * 5 - 2.5; // random speed on y-axis
    leftBalls.push({ x: x, y: y, color: color, dx: dx, dy: dy });
}

// Initialize the balls on the right side of the line
var rightBalls = [];
for (var i = 0; i < ballsPerSide; i++) {
    var x = Math.floor(Math.random() * (rectX + rectWidth - lineX)) + lineX;
    var y = Math.floor(Math.random() * rectHeight) + rectY;
    var color = colors[Math.floor(Math.random() * colors.length)];
    var dx = Math.random() * 5 - 5; // random speed on x-axis
    var dy = Math.random() * 5 - 2.5; // random speed on y-axis
    rightBalls.push({ x: x, y: y, color: color, dx: dx, dy: dy });
}

// Update the position of the balls at regular intervals
setInterval(function () {
    ctx.clearRect(rectX, rectY, rectWidth, rectHeight); // clear the rectangle
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 10;
    ctx.strokeRect(rectX, rectY, rectWidth, rectHeight); // redraw the rectangle
    ctx.beginPath();
    ctx.moveTo(lineX, rectY);
    ctx.lineTo(lineX, rectY + rectHeight);
    ctx.stroke(); // redraw the line

    // Update the position of the balls on the left side of the line
    for (var i = 0; i < leftBalls.length; i++) {
        var ball = leftBalls[i];
        ball.x += ball.dx;
        ball.y += ball.dy;
        if (ball.x < rectX || ball.x > lineX || ball.y < rectY || ball.y > rectY + rectHeight) {
            // The ball has crossed the line or the boundary of the rectangle, reverse its x direction and reset its position
            ball.dx = -ball.dx;
            ball.x = Math.floor(Math.random() * (lineX - rectX)) + rectX;
            ball.y = Math.floor(Math.random() * rectHeight) + rectY;
        }
        drawBall(ctx, ball.x, ball.y, ball.color);
    }

    // Update the position of the balls on the right side of the line
    for (var i = 0; i < rightBalls.length; i++) {
        var ball = rightBalls[i];
        ball.x += ball.dx;
        ball.y += ball.dy;
        if (ball.x < lineX || ball.x > rectX + rectWidth || ball.y < rectY || ball.y > rectY + rectHeight) {
            // The ball has crossed the line or the boundary of the rectangle, reverse its x direction and reset its position
            ball.dx = -ball.dx;
            ball.x = Math.floor(Math.random() * (rectX + rectWidth - lineX)) + lineX;
            ball.y = Math.floor(Math.random() * rectHeight) + rectY;
        }
        drawBall(ctx, ball.x, ball.y, ball.color);
    }

}, 50);

// Draw a ball at the given position with the given color
function drawBall(ctx, x, y, color) {
    var radius = 20;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}
