import { Container, Sprite } from "pixi.js";

export default class Ball extends Container {
  private sprite: Sprite;
  constructor(x: number, y: number) {
    super();
    this.sprite = Sprite.from("assets/BallYarn.png");
    this.sprite.scale.set(0.2);
    this.x = x;
    this.y = y;
    // @ts-ignore
    this.addChild(this.sprite);
  }

  public get leftSide() {
    return this.x;
  }
  public get rightSide() {
    return this.x + this.width;
  }
  public get topSide() {
    return this.y;
  }
  public get bottomSide() {
    return this.y + this.height;
  }
}
