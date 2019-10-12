var playerPaddle, computerPaddle, ball;
var gameState, playerScore, computerScore;
var hitsound, scoresound, wallsound;
var zorquefont, dpad;
var bg;

function preload(){
  hitsound = loadSound('assets/sounds/hit.mp3');
  scoresound = loadSound('assets/sounds/score.mp3');
  wallsound = loadSound('assets/sounds/wall_hit.mp3');

  zorquefont = loadFont('assets/fonts/zorque.ttf');
  dpad = loadFont('assets/fonts/Truly Madly Dpad.otf');

  bg = loadImage('assets/images/bg.jpg');
}

function setup(){
  createCanvas(400, 400);

  playerPaddle = createSprite(380, 190, 10, 70);
  computerPaddle = createSprite(20, 190, 10, 70);
  ball = createSprite(200, 200, 10, 10);

  playerPaddle.shapeColor = "white";
  computerPaddle.shapeColor = "white";
  ball.shapeColor = "white";

  gameState = "serve";
  playerScore = 0;
  computerScore = 0;
}

function draw(){
  background(bg);

  playerPaddle.y = World.mouseY;
  computerPaddle.y = ball.y;

  if(ball.isTouching(playerPaddle) || ball.isTouching(computerPaddle)){
    hitsound.play();
  }

  fill(255);
  textSize(12);
  textFont(dpad);

  if(gameState === "serve"){
    text("PRESS SPACE TO SERVE", 150, 180);
    if(keyDown("space")){
      serve();
      gameState = "play";
    }
  }

  /*if(keyDown("space") && gameState === "serve"){
    serve();
    gameState = "play";
  }*/

  edges = createEdgeSprites();
  
  if(ball.isTouching(edges[2]) || ball.isTouching(edges[3])){
    wallsound.play();
  }

  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[3]);
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);

  
  
  //drawnet();

  text(playerScore, 215, 20);
  text(computerScore, 180, 20);

  if(ball.x < 0 || ball.x > 400){
    
    if(ball.x < 0){
      playerScore++;
    }
    else{
      computerScore++;
    }
    
    scoresound.play();

    reset();
    gameState = "serve";
  }

  if(playerScore === 5 || computerScore === 5){
    gameState = "end";
    text("Game Over", 170, 160);
    text("Press 'R' to restart", 150, 180);
  }

  if(keyDown("r") && gameState === "end"){
    gameState = "serve";
    playerScore = 0;
    computerScore = 0;
  }

  drawSprites();
}

function reset(){
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}

function serve(){
  ball.velocityX = 5;
  ball.velocityY = 5;
}
function drawnet(){
  for(var i = 0; i < 400; i+=20){
    line(200, i, 200, i+10);
  }
}