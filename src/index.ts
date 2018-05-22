import SnakeGame from './SnakeGame';

customElements.define('snake-game', SnakeGame);

const d = document;
d.body.appendChild(d.createElement('snake-game'));
