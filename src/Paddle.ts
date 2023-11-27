import { Container, Sprite } from "pixi.js";

const paddleHeight = 100;

export default class Paddle extends Container {
  private sprite: Sprite;
  constructor(x: number, y: number) {
    super();
    this.sprite = Sprite.from("assets/CatPaddle.png");
    this.sprite.scale.set(0.5);
    this.sprite.x = -this.sprite.width / 2;
    this.x = x;
    this.y = y - paddleHeight / 2;
    // @ts-ignore
    this.addChild(this.sprite);
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
