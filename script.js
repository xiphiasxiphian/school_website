var player1;
var player2;

var background;
var middleLine;

var ball;
var player1Score;
var player2Score;

var wPressed;
var sPressed;

const playerMovementSpeed = 3;
const ballMovementSpeed = 4;

function startGame()
{

    document.getElementById("start_game_button").parentNode.removeChild(document.getElementById("start_game_button"));
    gameCanvas.start();

    background = new component(gameCanvas.canvas.width, gameCanvas.canvas.height, "black", 0, 0);
    middleLine = new component(2, gameCanvas.canvas.height, "white", gameCanvas.canvas.width / 2, 0)

    player1 = new component(20, 60, "white", 25, 120);
    player2 = new component(20, 60, "white", gameCanvas.canvas.width - 25, 120);

    player1Score = new component("30px", "Consolas", "gray", (gameCanvas.canvas.width / 2) - 60, 40, "text");
    player1Score.text = "0";
    player2Score = new component("30px", "Consolas", "gray", (gameCanvas.canvas.width / 2) + 60, 40, "text");
    player2Score.text = "0"
    
    ball = new component(10, 10, "white", gameCanvas.canvas.width / 2, gameCanvas.canvas.height / 2)
    ball.xVel = -(ballMovementSpeed);
    ball.yVel = (Math.random() * (1 - -1 + 1) + -1);
}

function update()
{
    gameCanvas.clear()
    background.update();
    middleLine.update();
    player1.update();
    player2.update();
    player1Score.update()

    if (intersects(player1, ball))
    {
        ball.xVel *= -1;
    }
    if (intersects(player2, ball))
    {
        ball.xVel *= -1;
    }
    if (ball.y < 0 || ball.y + ball.height > gameCanvas.canvas.height)
    {
        ball.yVel *= -1;
    }
    if (ball.x < 0 || ball.x + ball.width > gameCanvas.canvas.width)
    {
        ball.xVel *= -1;
    }

    ball.update();
}

function intersects(obj1, obj2)
{
    obj1Left = obj1.x;
    obj1Right = obj1.x + obj1.width;
    obj1Top = obj1.y;
    obj1Bottom = obj1.y + obj1.height;

    obj2Left = obj2.x;
    obj2Right = obj2.x + obj2.width;
    obj2Top = obj2.y;
    obj2Bottom = obj2.y + obj2.height;

    if (((obj1Bottom < obj2Top) ||
    (obj1Top > obj2Bottom) ||
    (obj1Right < obj2Left) ||
    (obj1Left > obj2Right)))
    {
        return false;
    }
    return true;
}

var gameCanvas = {
    canvas : document.createElement("canvas"),
    start : function ()
    {
        this.canvas.width = 650;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(update, 20);
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        window.addEventListener("keydown", function (e)
        {
            if (e.key == "w")
            {
                document.getElementById("text").innerHTML = "W Key Pressed";
                player1.yVel = -(playerMovementSpeed);
            }
            else if (e.key == "s")
            {
                document.getElementById("text").innerHTML = "S Key Pressed";
                player1.yVel = playerMovementSpeed;
            }
            if (e.key == "ArrowUp")
            {
                document.getElementById("text").innerHTML = "Up Arrow Key Pressed";
                player2.yVel = -(playerMovementSpeed);
            }
            else if (e.key == "ArrowDown")
            {
                document.getElementById("text").innerHTML = "Down Arrow Key Pressed";
                player2.yVel = playerMovementSpeed;
            }
        }, false);
        window.addEventListener("keyup", function (e)
        {
            if (e.key == "w")
            {
                document.getElementById("text").innerHTML = "No Key Pressed";
                player1.yVel = 0;
            }
            else if (e.key == "s")
            {
                document.getElementById("text").innerHTML = "No Key Pressed";
                player1.yVel = 0
            }
            if (e.key == "ArrowUp")
            {
                document.getElementById("text").innerHTML = "No Key Pressed";
                player2.yVel = 0;
            }
            else if (e.key == "ArrowDown")
            {
                document.getElementById("text").innerHTML = "No Key Pressed";
                player2.yVel = 0;
            }
        }, false);

    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type)
{
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.xVel = 0;
    this.yVel = 0;
    

    this.update = function()
    {
        ctx = gameCanvas.context;

        this.x += this.xVel;
        this.y += this.yVel;

        if (this.type == "text")
        {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
        else
        {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

}