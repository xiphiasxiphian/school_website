var player1;
var player2;

var background;
var middleLine;

var ball;
var player1Score;
var player2Score;

var wPressed;
var sPressed;

var PLAYER_MOVEMENT_SPEED = 3;
const BALL_MOVEMENT_SPEED = 4;
const MAX_BOUNCE_ANGLE = 45;

const MOVEMENT_INCREASE = 1.05;

var loops = 0;

function startGame()
{

    document.getElementById("start_game_button").parentNode.removeChild(document.getElementById("start_game_button"));
    gameCanvas.start();

    background = new component(gameCanvas.canvas.width, gameCanvas.canvas.height, "black", 0, 0);
    middleLine = new component(2, gameCanvas.canvas.height, "white", gameCanvas.canvas.width / 2, 0)

    player1 = new component(10, 60, "white", 25, 120);
    player2 = new component(10, 60, "white", gameCanvas.canvas.width - 25, 120);

    player1Score = new component("30px", "Consolas", "gray", (gameCanvas.canvas.width / 2) - 60, 40, "text");
    player1Score.text = "0";
    player2Score = new component("30px", "Consolas", "gray", (gameCanvas.canvas.width / 2) + 45, 40, "text");
    player2Score.text = "0"
    
    ball = new component(10, 10, "white", gameCanvas.canvas.width / 2, gameCanvas.canvas.height / 2)
    ball.xVel = -(BALL_MOVEMENT_SPEED);
    ball.yVel = (Math.random() * (1 - -1 + 1) + -1);
}


var canBounce = true
var loopsAtBounce = 0;

var reset = false;
var loopsAtReset = 0;

function update()
{
    gameCanvas.clear()
    background.update();
    middleLine.update();
    player1.update();
    player2.update();

    if (reset)
    {
        ball.xVel = 0;
        ball.yVel = 0;
    }

    if (canBounce)
    {
        if (intersects(player1, ball))
        {
            BALL_MOVEMENT_SPEED *= MOVEMENT_INCREASE;
            newVels = calculateNewVels(player1);
            ball.xVel = newVels[0];
            ball.yVel = newVels[1];
            canBounce = false;
            loopsAtBounce = loops;
        }
        if (intersects(player2, ball))
        {
            BALL_MOVEMENT_SPEED *= MOVEMENT_INCREASE;
            newVels = calculateNewVels(player2);
            ball.xVel = newVels[0];
            ball.yVel = newVels[1];
            canBounce = false;
            loopsAtBounce = loops;
        }
    
        if (ball.y < 0 || ball.y + ball.height > gameCanvas.canvas.height)
        {
            ball.yVel *= -1;
            canBounce = false;
            loopsAtBounce = loops;
        }
        if (ball.x < 0)
        {
            ball.x = gameCanvas.canvas.width / 2;
            ball.y = gameCanvas.canvas.height / 2;
            ball.xVel = 0;
            ball.yVel = 0;
            reset = true;
            loopsAtReset = loops;

            player2Score.text = (parseInt(player2Score.text) + 1).toString();
        }
        if (ball.x + ball.width > gameCanvas.canvas.width)
        {
            ball.x = gameCanvas.canvas.width / 2;
            ball.y = gameCanvas.canvas.height / 2;
            ball.xVel = 0;
            ball.yVel = 0;
            reset = true;
            loopsAtReset = loops;

            player1Score.text = (parseInt(player1Score.text) + 1).toString();
        }
    }
    else 
    {
        if (loopsAtBounce + 5 < loops)
        {
            canBounce = true;
        }
    }

    if (reset && loopsAtReset + 100 < loops)
    {
        var xDirection = -1;
        if (Math.random() > 0.5)
        {
            xDirection = 1;
        }


        ball.xVel = xDirection * (BALL_MOVEMENT_SPEED);
        ball.yVel = (Math.random() * (1 - -1 + 1) + -1);
        reset = false;
    }

    player1Score.update()
    player2Score.update();
    ball.update();

    loops += 1;
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
                player1.yVel = -(PLAYER_MOVEMENT_SPEED);
            }
            else if (e.key == "s")
            {
                player1.yVel = PLAYER_MOVEMENT_SPEED;
            }
            if (e.key == "ArrowUp")
            {
                player2.yVel = -(PLAYER_MOVEMENT_SPEED);
            }
            else if (e.key == "ArrowDown")
            {
                player2.yVel = PLAYER_MOVEMENT_SPEED;
            }
        }, false);
        window.addEventListener("keyup", function (e)
        {
            if (e.key == "w")
            {
                player1.yVel = 0;
            }
            else if (e.key == "s")
            {
                player1.yVel = 0
            }
            if (e.key == "ArrowUp")
            {
                player2.yVel = 0;
            }
            else if (e.key == "ArrowDown")
            {
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

function calculateNewVels(player)
{
    const currentBallY = ball.y;
    const paddleCentre = player.y + (player.height / 2)
    const currentBallXVel = ball.xVel;

    const hitDifference = Math.abs(currentBallY - paddleCentre)
    const bounceAngle = hitDifference * MAX_BOUNCE_ANGLE

    var newVelX = BALL_MOVEMENT_SPEED * Math.cos(bounceAngle)
    var newVelY = BALL_MOVEMENT_SPEED * -(Math.sin(bounceAngle))

    if (currentBallXVel > 0)
    {
        newVelX = -(Math.abs(newVelX));
    }
    else if (currentBallXVel < 0)
    {
        newVelX = Math.abs(newVelX);
    }

    return [newVelX, newVelY]
}