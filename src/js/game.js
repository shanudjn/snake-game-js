import Snake from "./snake";
export default class game {
  constructor(boxLength = 10, gameContainer = "game-container") {
    this.dataPoints = [...Array(boxLength)].map((x) =>
      Array(boxLength).fill(0)
    );
    this.gameContainer = gameContainer;
    this.boxLength = boxLength;
    this.block = [];
    this.interval = null;
    this.snake = new Snake(boxLength, gameContainer);
    this.speed = 1;
    this.score = 0;
    this.setHighScore();
  }

  generateNextPoint() {
    let [x, y] = [
      Math.floor(Math.random() * this.boxLength),
      Math.floor(Math.random() * this.boxLength),
    ];
    while (
      this.snake.snake.filter((block) => block[0] === x && block[1] === y)
        .length > 0
    ) {
      [x, y] = [
        Math.floor(Math.random() * this.boxLength),
        Math.floor(Math.random() * this.boxLength),
      ];
    }
    return [x, y];
  }

  initGame() {
    const boardSize = this.boxLength * this.boxLength;
    const gameContainer = document.getElementById(this.gameContainer);
    let boxes = "";
    for (let i = 0; i < this.boxLength; i++) {
      for (let j = 0; j < this.boxLength; j++) {
        if (i % 2 == 0) {
          boxes += `<div class='box ${j % 2 == 0 ? "even" : "odd"}'></div>`;
        } else {
          boxes += `<div class='box ${j % 2 !== 0 ? "even" : "odd"}'></div>`;
        }
      }
    }
    gameContainer.innerHTML = boxes;
    const head = this.generateNextPoint();
    this.snake.initSnake([...head]);
    this.block = this.generateNextPoint();
    this.renderBlock();
    this.snake.renderSnake();
    this.direction = 1;
    this.score = 0;
    this.speed = 0.25;
    this.updateScore();
  }

  startGame() {
    this.interval = setInterval(
      () => {
        if (!this.snake.moveSnake()) {
          return this.resetGame();
        }
        if (!this.eatBlock()) {
          this.snake.removeTail();
        }
        this.snake.renderSnake();
      },
      this.speed * 1000,
      this
    );
  }

  renderBlock() {
    const boxes = [...document.querySelectorAll(`#${this.gameContainer} .box`)];
    boxes.map((box) => box.classList.remove("block"));
    boxes[this.block[0] * this.boxLength + this.block[1]].classList.add(
      "block"
    );
  }

  eatBlock() {
    const [headX, headY] = this.snake.head;
    const [blockX, blockY] = this.block;
    if (headX === blockX && headY === blockY) {
      this.block = this.generateNextPoint();
      this.snake.snakeSize += 1;
      if (this.snake.snakeSize % 5 == 0) {
        this.increaseSpeed();
      }
      this.renderBlock();
      this.score++;
      this.updateScore();
      return true;
    }
    return false;
  }

  resetGame() {
    clearInterval(this.interval);
    alert("Game Over");
    document.getElementById("play").innerText = "Play";
  }

  pauseGame() {
    clearInterval(this.interval);
  }

  increaseSpeed() {
    if (this.speed === 0.3) return;
    clearInterval(this.interval);
    this.speed -= 0.1;
    this.startGame();
  }

  updateScore() {
    document.getElementById("score").innerHTML = this.score;
    const currentHighScore = parseInt(localStorage.getItem("high-score")) || 0;
    if (this.score > currentHighScore) {
      document.getElementById("high-score").innerHTML = this.score;
      localStorage.setItem("high-score", this.score);
    }
  }

  setHighScore() {
    const currentHighScore = parseInt(localStorage.getItem("high-score")) || 0;
    document.getElementById("high-score").innerHTML = currentHighScore;
  }
}
