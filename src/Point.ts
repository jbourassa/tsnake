import Direction from './Direction';

const directionToTranslation = new  Map<Direction, [number, number]>([
  [Direction.Up, [0, -1]],
  [Direction.Right, [1, 0]],
  [Direction.Down, [0, 1]],
  [Direction.Left, [-1, 0]]
]);

export default class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(direction: Direction): Point {
    const [transX, transY] = directionToTranslation.get(direction);
    return new Point(this.x + transX, this.y + transY);
  }

  eql(other: Point | any): boolean {
    if(other instanceof Point) {
      return this.x === other.x && this.y === other.y;
    }

    return false;
  }
}