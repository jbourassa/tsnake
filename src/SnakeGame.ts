import Board from './Board';
import Direction from './Direction';
import CanvasRenderer from './CanvasRenderer';

const MIN_SIZE = 500;
const SPEED = 120;

const keyCodeToDirection = new  Map<number, Direction>([
  [38, Direction.Up],
  [39, Direction.Right],
  [40, Direction.Down],
  [37, Direction.Left]
]);


export default class SnakeGame extends HTMLElement {
  private board: Board
  private ctx: CanvasRenderingContext2D
  private canvas: HTMLCanvasElement
  private interval: number

  private boundHandleResize: EventListener
  private boundHandleKeyDown: EventListener

  constructor() {
    super();
    this.board = new Board();

    this.canvas = document.createElement('canvas');
    this.canvas.style.border = '1px solid #ccc';

    this.ctx = this.canvas.getContext('2d');

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(this.canvas);

    this.boundHandleResize = this.handleResize.bind(this);
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
  }

  connectedCallback() {
    document.addEventListener("resize", this.boundHandleResize);
    document.addEventListener("keydown", this.boundHandleKeyDown);
    this.resize();
  }

  disconnectedCallback() {
    document.removeEventListener("resize", this.boundHandleResize);
    document.removeEventListener("keydown", this.boundHandleKeyDown);
  }

  private resize() {
    window.requestAnimationFrame(() => {
      this.canvas.width = Math.max(this.offsetWidth, MIN_SIZE);
      this.canvas.height = this.canvas.width;
      this.render();
    });
  }

  private start() {
    this.interval = setInterval(() => this.tick(), SPEED);
  }

  private tick() {
    try {
      this.board.tick();
    }
    catch(e) {
      // @TODO Let's do something better than this
      console.error(e);
      return;
    }

    this.render();
  }

  private render() {
    new CanvasRenderer(this.canvas.width, this.ctx).render(this.board);
  }

  private handleResize() {
    window.requestAnimationFrame(() => this.resize());
  }

  private handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();

    if(!this.interval) {
      this.start();
    }

    const direction = keyCodeToDirection.get(event.keyCode);
    if(direction) {
      this.board.setDirection(direction);
    }
  }
}