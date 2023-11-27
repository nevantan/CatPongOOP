export default class Keyboard {
  private static keys: Map<string, boolean> = new Map();
  private static currentKeys: Map<string, boolean> = new Map();
  private static previousKeys: Map<string, boolean> = new Map();

  private constructor() {}

  public static initialize() {
    window.addEventListener("keydown", Keyboard.onKeyDown.bind(this));
    window.addEventListener("keyup", Keyboard.onKeyUp.bind(this));
  }

  public static update() {
    Keyboard.previousKeys = new Map(Keyboard.currentKeys);
    Keyboard.currentKeys = new Map(Keyboard.keys);
  }

  public static pressed(key: string): boolean {
    return Keyboard.currentKeys.get(key) ?? false;
  }

  public static justPressed(key: string): boolean {
    return Keyboard.pressed(key) && !Keyboard.previousKeys.get(key);
  }

  private static onKeyDown(event: KeyboardEvent) {
    Keyboard.keys.set(event.key, true);
  }

  private static onKeyUp(event: KeyboardEvent) {
    Keyboard.keys.set(event.key, false);
  }
}
