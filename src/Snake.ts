import Point from './Point';
import Direction from './Direction';

export default class Snake {
  points: Point[]

  constructor(points: Point[]) {
    if(points.length === 0) throw new Error("Snake can't be empty!");

    this.points = points;
  }

  head(): Point {
    return this.points[0];
  }

  move(direction: Direction): Snake {
    return new Snake([this.head().move(direction)].concat(this.points.slice(0, -1)));
  }

  grow(direction: Direction): Snake {
    return new Snake([this.head().move(direction)].concat(this.points));
  }
}