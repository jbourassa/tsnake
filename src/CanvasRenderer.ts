import Board, { SIZE } from './Board';

const FRUIT_COLOR = "#ff0000";
const SNAKE_COLOR = "#000";

export default class CanvasRenderer {
  size: number
  ctx: CanvasRenderingContext2D

  constructor(size: number, ctx: CanvasRenderingContext2D) {
    this.size = size;
    this.ctx = ctx;
  }

  render(board: Board) {
    const { snake, fruit } = board.state;
    const pointSize = Math.floor(this.size / SIZE);

    this.ctx.clearRect(0, 0, this.size, this.size);

    this.ctx.fillStyle = FRUIT_COLOR;
    this.ctx.fillRect(fruit.x * pointSize, fruit.y * pointSize, pointSize, pointSize);

    board.state.snake.points.forEach(point => {
      this.ctx.fillStyle = SNAKE_COLOR;
      this.ctx.fillRect(point.x * pointSize, point.y * pointSize, pointSize, pointSize);
    });
  }
}