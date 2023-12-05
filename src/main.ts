import "./styles.css";
import { Application, Text } from "pixi.js";
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
const leftPaddle = new Paddle(10, app.screen.height / 2, 'left');
// @ts-ignore
app.stage.addChild(leftPaddle);

const rightPaddle = new Paddle(app.screen.width - 125, app.screen.height / 2, 'right');
// @ts-ignore
app.stage.addChild(rightPaddle);

// Ball
const ball = new Ball(app.screen.width / 2, app.screen.height / 2);
ball.onScore('left', (score) => leftScore += score);
ball.onScore('right', (score) => rightScore += score);

// @ts-ignore
app.stage.addChild(ball);

// Game loop
function updateScores() {
  leftScoreText.text = `Left Score: ${leftScore}`;
  rightScoreText.text = `Right Score: ${rightScore}`;
}

app.ticker.add((dt: number) => {
  Keyboard.update();

  // Ball Movement
  ball.update(dt);

  if (
    ball.leftSide <= leftPaddle.rightSide &&
    ball.bottomSide >= leftPaddle.topSide &&
    ball.topSide <= leftPaddle.bottomSide
  ) {
    // TODO: Ball collision with left paddle
  }

  if (
    ball.rightSide >= rightPaddle.leftSide &&
    ball.bottomSide >= rightPaddle.topSide &&
    ball.topSide <= rightPaddle.bottomSide
  ) {
    // TODO: Ball collision with right paddle
  }

  // Update the scores on the screen
  updateScores();

  // Left Paddle Movement
  leftPaddle.update(dt);
  rightPaddle.update(dt);
});
