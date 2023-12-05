import { Container, Sprite } from "pixi.js";

type EventHandler = (score: number) => void;

export default class Ball extends Container {
  private sprite: Sprite;
  private velX = 0;
  private velY = 0;
  private speed = 2;

  private handlers = {
    left: [] as EventHandler[],
    right: [] as EventHandler[],
  }

  constructor(x: number, y: number) {
    super();
    this.sprite = Sprite.from("assets/BallYarn.png");
    this.sprite.scale.set(0.2);
    this.x = x;
    this.y = y;
    // @ts-ignore
    this.addChild(this.sprite);
  }

  public update(dt: number) {
    // Update the x/y position of the ball based on its currect velocity

    // If the ball hits the top or bottom of the screen, reverse the y velocity

    // If the ball hits the left or right side of the screen, notify score, reset ball
  }

  public onScore(event: keyof typeof this.handlers, fn: EventHandler) {
    this.handlers[event].push(fn);
  }

  // Reset the ball's position to center and velocity to a random direction
  private reset() {
    // TODO: Reset logic
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
