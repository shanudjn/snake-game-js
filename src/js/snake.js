export default class Snake {
  constructor(boxLength = 10, gameContainer = "game-container") {
    this.snakeSize = 0;
    this.snake = [];
    this.direction = 0;
    this.head = [];
    this.gameContainer = gameContainer;
    this.boxLength = boxLength;
    document.addEventListener("keyup", (event) => this.handleKeys(event));
    [...document.getElementsByClassName("arrow-button")].forEach((element) => {
      element.addEventListener("click", (event) =>
        this.handleArrowClick(event)
      );
    });
  }

  initSnake([headX, headY]) {
    this.snakeSize = 1;
    this.snake = [[headX, headY]];
    this.head = [...this.snake[0]];
  }

  moveSnake() {
    const [x, y] = this.head;
    switch (this.direction) {
      case 0:
        this.head = [x - 1, y];
        break;
      case 1:
        this.head = [x, y + 1];
        break;
      case 2:
        this.head = [x + 1, y];
        break;
      case 3:
        this.head = [x, y - 1];
        break;
    }
    this.snake = [[...this.head], ...this.snake];
    return !this.checkSnakeHead();
  }

  checkSnakeHead() {
    const [x, y] = this.head;
    if (x < 0 || y < 0 || x >= this.boxLength || y >= this.boxLength) {
      return true;
    }
    const arr = this.snake.filter((block) => block[0] === x && block[1] === y);
    return arr.length > 1;
  }

  renderSnake() {
    const boxes = [...document.querySelectorAll(`#${this.gameContainer} .box`)];
    boxes.map((box) => box.classList.remove("snake", "snake-head"));
    for (let item of this.snake) {
      boxes[item[0] * this.boxLength + item[1]].classList.add("snake");
    }
    boxes[this.snake[0][0] * this.boxLength + this.snake[0][1]].classList.add(
      "snake-head"
    );
  }

  removeTail() {
    this.snake.pop();
  }

  handleKeys(event) {
    let newDirection = -1;
    switch (event.key) {
      case "ArrowUp":
        newDirection = 0;
        break;
      case "ArrowDown":
        newDirection = 2;
        break;
      case "ArrowLeft":
        newDirection = 3;
        break;
      case "ArrowRight":
        newDirection = 1;
        break;
      default:
        break;
    }
    if (newDirection > -1) {
      this.changeDirection(newDirection);
    }
  }

  changeDirection(direction) {
    const oldDirection = this.direction;
    if (this.snakeSize > 1 && Math.abs(direction - oldDirection) == 2) {
      return;
    }
    this.direction = direction;
  }

  handleArrowClick(event) {
    const direction = event.currentTarget.classList.contains("up")
      ? 0
      : event.currentTarget.classList.contains("right")
      ? 1
      : event.currentTarget.classList.contains("down")
      ? 2
      : 3;
    this.changeDirection(direction);
  }
}
