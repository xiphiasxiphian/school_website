var player;
var background;
var ball;

var wPressed = false;
var sPressed = false;

const movementSpeed = 2;



function startGame()
{

    document.getElementById("start_game_button").parentNode.removeChild(document.getElementById("start_game_button"));
    gameCanvas.start();
    background = new component(gameCanvas.canvas.width, gameCanvas.canvas.height, "black", 0, 0)
    player = new component(20, 60, "white", 10, 120)
    ball = new component(10, 10, "white", gameCanvas.width / 2, gameCanvas.height / 2)
}

function update()
{
    gameCanvas.clear()
    background.update();
    player.update();
    ball.update();
}

function intersects(obj1, obj2)
{

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
                player.yVel = -(movementSpeed);
            }
            else if (e.key == "s")
            {
                document.getElementById("text").innerHTML = "S Key Pressed";
                player.yVel = movementSpeed;
            }
            else
            {
                document.getElementById("text").innerHTML = "No key pressed";
                player.yVel = 0
            }
        }, false);
        window.addEventListener("keyup", function (e)
        {
            if (e.key == "w")
            {
                document.getElementById("text").innerHTML = "No Key Pressed";
                player.yVel = 0;
            }
            else if (e.key == "s")
            {
                document.getElementById("text").innerHTML = "No Key Pressed";
                player.yVel = 0
            }
            else
            {
                document.getElementById("text").innerHTML = "No key pressed";
                player.yVel = 0
            }
        }, false);

    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y)
{
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.xVel = 0;
    this.yVel = 0;
    

    this.update = function()
    {
        this.x += this.xVel;
        this.y += this.yVel;

        ctx = gameCanvas.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}