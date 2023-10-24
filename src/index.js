import "normalize.css";
import "./style.css";
import { placeInitialShips } from "./game";

const dialog = document.querySelector("dialog");
const dialogSquares = Array.from(
  document.querySelectorAll(".dialog-board .square"),
);
const player1Squares = Array.from(document.querySelectorAll(".board1 .square"));
const player2Squares = Array.from(document.querySelectorAll(".board2 .square"));
const rotateButton = document.querySelector(".rotate");
const shipName = document.querySelector(".ship-name");

dialog.showModal();

let direction = [0, 1];
let count = 0;
const shipLengths = [2, 3, 3, 4, 5];
const shipNames = ["Patrol Boat", "Submarine", "Destroyer", "Battleship"];
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

const placeShipAI = () => {
  const shipLength = [2, 3, 3, 4, 5];
  shipLength.forEach((length) => {
    const randomX = Math.random() * 10;
    const randomY = Math.random() * 10;
  });
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
      dialog.close();
      return;
    }
    const name = shipNames.pop();
    shipName.textContent = name;
  }
};

dialogSquares.forEach((square) => {
  const coord = [Math.floor(count / 10), count % 10];

  square.addEventListener("mouseover", () => mouseOverSquare(coord));
  square.addEventListener("click", () => clickDialogSquare(coord));
  count += 1;
});

rotateButton.addEventListener("click", () => {
  if (direction[0] === 0) direction = [1, 0];
  else direction = [0, 1];
});
