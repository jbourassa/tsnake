import Direction from './Direction';
import Point from './Point';
import Snake from './Snake';

const SIZE = 32;

function randomPosition(): number {
  return Math.round(Math.random() * SIZE);
}

function randomPoint(): Point {
  return new Point(randomPosition(), randomPosition());
}

function isOutOfBounds(point: Point): boolean {
  const { x, y } = point;
  return Math.min(x, y) < 0 || Math.max(x, y) > SIZE;
}

function isCrashed(snake: Snake): boolean {
  const [head, ...rest] = snake.points;
  return rest.some(p => p.eql(head));
}

function generateFruitPosition(snake: Snake) {
  let point: Point;

  while(true) {
    point = randomPoint();
    if(snake.points.every(p => !p.eql(point))) {
      return point;
    }
  }
}

class BoardState {
  snake: Snake
  fruit: Point

  constructor(snake?: Snake, fruit?: Point) {
    this.snake = snake || new Snake([randomPoint()]);
    this.fruit = fruit || generateFruitPosition(this.snake);
  }
}

export { SIZE as SIZE };

export default class Board {
  direction: Direction
  state: BoardState

  constructor() {
    this.state = new BoardState();
  }

  setDirection(direction: Direction) {
    this.direction = direction;
  }

  tick(): BoardState {
    const newHead = this.state.snake.head().move(this.direction);

    if(newHead.eql(this.state.fruit)) {
      this.grow();
    }
    else {
      this.move();

      if(isOutOfBounds(newHead)) {
        throw new Error("Hold on cowboy! You went out of bounds!");
      }
      else if(isCrashed(this.state.snake)) {
        throw new Error("Hold on cowboy! You ate yourself!")       
      }
    }
    return this.state;
  }

  private grow() {
    const newSnake = this.state.snake.grow(this.direction);
    this.state = new BoardState(
      newSnake,
      generateFruitPosition(newSnake)
    );
  }

  private move() {
    this.state = new BoardState(
      this.state.snake.move(this.direction),
      this.state.fruit
    );
  }
}