import "normalize.css";
import "./style.css";
import {
  placeInitialShips,
  placeShipsAI,
  attackPlayer2,
  attackPlayer1,
  getPlayer1NotAttacked,
  isPlayer1Winner,
  isPlayer2Winner,
  restartGame,
} from "./game";

const initialize = document.querySelector(".initialize");
const dialogSquares = Array.from(
  document.querySelectorAll(".dialog-board .square"),
);
const player1Squares = Array.from(document.querySelectorAll(".board1 .square"));
const player2Squares = Array.from(document.querySelectorAll(".board2 .square"));
const rotateButton = document.querySelector(".rotate");
const shipName = document.querySelector(".ship-name");

const gameOverModal = document.querySelector(".game-over");
const winner = document.querySelector(".winner");
const playAgainButton = document.querySelector(".play-again");

let direction = [0, 1];
let shipLengths = [2, 3, 3, 4, 5];
let shipNames = ["Patrol Boat", "Submarine", "Destroyer", "Battleship"];
let highlighted = [];

const mouseOverSquare = (coord) => {
  highlighted.forEach((index) =>
    dialogSquares[index].classList.remove("temp-highlight"),
  );
  highlighted = [];

  const shipLength = shipLengths[shipLengths.length - 1];
  for (let i = 0; i < shipLength; i += 1) {
    const next = [coord[0] + direction[0] * i, coord[1] + direction[1] * i];
    if (next[0] > 9 || next[1] > 9) break;
    const index = next[0] * 10 + next[1];
    dialogSquares[index].classList.add("temp-highlight");
    highlighted.push(index);
  }
};

const clickDialogSquare = (coord) => {
  if (
    placeInitialShips(shipLengths[shipLengths.length - 1], coord, [
      coord[0] + direction[0],
      coord[1] + direction[1],
    ])
  ) {
    highlighted.forEach((index) => {
      dialogSquares[index].classList.add("highlight");
      player1Squares[index].classList.add("highlight");
    });
    shipLengths.pop();
    if (shipLengths.length === 0) {
      initialize.close();
      placeShipsAI();
      return;
    }
    const name = shipNames.pop();
    shipName.textContent = name;
  }
};

dialogSquares.forEach((square, index) => {
  const coord = [Math.floor(index / 10), index % 10];

  square.addEventListener("mouseover", () => mouseOverSquare(coord));
  square.addEventListener("click", () => clickDialogSquare(coord));
});

rotateButton.addEventListener("click", () => {
  if (direction[0] === 0) direction = [1, 0];
  else direction = [0, 1];
});

const displayWinner = (message) => {
  winner.textContent = message;
  gameOverModal.showModal();
};

const aiAttack = () => {
  const coordHit = attackPlayer1();
  const squareHit = player1Squares[coordHit[0] * 10 + coordHit[1]];
  if (squareHit.classList.contains("highlight")) {
    squareHit.classList.remove("highlight");
    squareHit.classList.add("hit");
  } else {
    squareHit.classList.add("miss");
  }
  if (isPlayer2Winner()) {
    displayWinner("You lost!");
  }
};

const playerAttack = (square, coord) => {
  if (attackPlayer2(coord)) {
    square.classList.add("hit");
  } else if (!square.classList.contains("hit")) square.classList.add("miss");

  if (isPlayer1Winner()) {
    displayWinner("You won!");
  }
};

player2Squares.forEach((square, index) =>
  square.addEventListener("click", () => {
    const coord = [Math.floor(index / 10), index % 10];
    if (!getPlayer1NotAttacked().has(JSON.stringify(coord))) return;
    playerAttack(square, coord);
    
    aiAttack();
  }),
);

const clearSquare = (square) => {
  square.classList.remove("temp-highlight");
  square.classList.remove("highlight");
  square.classList.remove("hit");
  square.classList.remove("miss");
};

playAgainButton.addEventListener("click", () => {
  gameOverModal.close();
  dialogSquares.forEach((square, index) => {
    clearSquare(square);
    clearSquare(player1Squares[index]);
    clearSquare(player2Squares[index]);
  });

  restartGame();
  direction = [0, 1];
  shipLengths = [2, 3, 3, 4, 5];
  shipNames = ["Patrol Boat", "Submarine", "Destroyer", "Battleship"];
  highlighted = [];

  initialize.showModal();
});

initialize.showModal();
