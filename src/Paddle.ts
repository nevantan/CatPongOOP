import { Container, Sprite } from "pixi.js";

const paddleHeight = 100;

export default class Paddle extends Container {
  private sprite: Sprite;
  private velY = 0;
  private speed = 2;
  private side: "left" | "right";
  
  constructor(x: number, y: number, side: "left" | "right") {
    super();
    this.sprite = Sprite.from("assets/CatPaddle.png");
    this.sprite.scale.set(0.5);
    this.sprite.x = -this.sprite.width / 2;
    this.x = x;
    this.y = y - paddleHeight / 2;
    // @ts-ignore
    this.addChild(this.sprite);

    this.side = side;
  }

  public update(dt: number) {
    // Check keyboard input and update the y velocity accordingly

    // If the paddle hits the top or bottom of the screen, stop it from moving further

    // Update the y position of the paddle based on the current velocity
  }

  public get leftSide() {
    return this.x;
  }
  public get rightSide() {
    return this.x + this.width;
  }
  public set rightSide(x: number) {
    this.x = x - this.sprite.width;
  }
  public get topSide() {
    return this.y;
  }
  public get bottomSide() {
    return this.y + this.height;
  }
}
