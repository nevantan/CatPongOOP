import "./styles.css";
import { Application, Graphics, Text } from "pixi.js";
import Keyboard from "./keyboard";
import Paddle from "./Paddle";
import Ball from "./Ball";

let leftScore = 0;
let rightScore = 0;

Keyboard.initialize();
const app = new Application({
  width: 800,
  height: 600,
  backgroundColor: 0xfaf9f6,
});

document.body.appendChild(app.view as HTMLCanvasElement);

const leftScoreText = new Text(`Left Score: ${leftScore}`, {
  fill: 0x000000,
  fontFamily: "Comic Sans MS",
  fontSize: 24,
});

leftScoreText.x = 20;
leftScoreText.y = 20;

const rightScoreText = new Text(`Right Score: ${rightScore}`, {
  fill: 0x000000,
  fontFamily: "Comic Sans MS",
  fontSize: 24,
});

rightScoreText.x = app.screen.width - rightScoreText.width - 20;
rightScoreText.y = 20;
// @ts-ignore
app.stage.addChild(leftScoreText, rightScoreText);

// Paddles
const paddleWidth = 20;
const paddleHeight = 100;

const leftPaddle = new Paddle(10, app.screen.height / 2);
// @ts-ignore
app.stage.addChild(leftPaddle);

const rightPaddle = new Paddle(app.screen.width - 125, app.screen.height / 2);
// @ts-ignore
app.stage.addChild(rightPaddle);

// Ball
const ballSize = 10;

const ball = new Ball(app.screen.width / 2, app.screen.height / 2);

// @ts-ignore
app.stage.addChild(ball);

// Game loop
const paddleSpeed = 10;
const ballSpeed = 2;
let ballDirectionX = 1;
let ballDirectionY = 1;

function resetBall() {
  // Reset the ball position to the center
  ball.x = app.screen.width / 2;
  ball.y = app.screen.height / 2;

  // Reset ball direction (you may want to randomize this for variety)
  ballDirectionX = Math.random() < 0.5 ? 1 : -1; // Randomly set to 1 or -1
  ballDirectionY = Math.random() < 0.5 ? 1 : -1; // Randomly set to 1 or -1
}

function updateScores() {
  leftScoreText.text = `Left Score: ${leftScore}`;
  rightScoreText.text = `Right Score: ${rightScore}`;
}

app.ticker.add((_delta) => {
  Keyboard.update();
  // Ball Movement
  ball.x += ballSpeed * ballDirectionX;
  ball.y += ballSpeed * ballDirectionY;

  // Ball collision with walls
  if (ball.y <= 0 || ball.bottomSide >= app.screen.height) {
    ballDirectionY *= -1;
  }

  if (
    ball.leftSide <= leftPaddle.rightSide &&
    ball.bottomSide >= leftPaddle.topSide &&
    ball.topSide <= leftPaddle.bottomSide
  )
    ballDirectionX = 1;

  if (
    ball.rightSide >= rightPaddle.leftSide &&
    ball.bottomSide >= rightPaddle.topSide &&
    ball.topSide <= rightPaddle.bottomSide
  )
    ballDirectionX = -1;

  // Check if the ball goes off the screen left or right
  if (ball.x < 0) {
    // Ball went off the left side
    // Increment the right player's score
    rightScore++;
    // Reset the ball position
    resetBall();
  } else if (ball.rightSide > app.screen.width) {
    // Ball went off the right side
    // Increment the left player's score
    leftScore++;
    // Reset the ball position
    resetBall();
  }

  // Update the scores on the screen
  updateScores();

  // Left Paddle Movement
  if (Keyboard.pressed("w") && leftPaddle.y > 0) {
    leftPaddle.y -= paddleSpeed;
  }
  if (
    Keyboard.pressed("s") &&
    leftPaddle.y < app.screen.height - paddleHeight
  ) {
    leftPaddle.y += paddleSpeed;
  }

  // Right Paddle Movement
  if (Keyboard.pressed("ArrowUp") && rightPaddle.y > 0) {
    rightPaddle.y -= paddleSpeed;
  }
  if (
    Keyboard.pressed("ArrowDown") &&
    rightPaddle.y < app.screen.height - paddleHeight
  ) {
    rightPaddle.y += paddleSpeed;
  }
});
