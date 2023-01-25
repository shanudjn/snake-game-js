import "../css/index.scss";
import Game from "./game";
document.addEventListener("DOMContentLoaded", function (event) {
  let newGame = new Game(10, "game-container");
  newGame.initGame();

  document.getElementById("reset").onclick = () => {
    newGame.initGame();
  };

  document.getElementById("play").onclick = (event) => {
    const text = event.target.innerText;
    if (text === "Play") {
      event.target.innerHTML = "Pause";
      newGame.startGame();
    } else {
      event.target.innerHTML = "Play";
      newGame.pauseGame();
    }
  };
});
