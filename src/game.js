import { createPlayer, createPlayerAI } from "./player";
import createGameBoard from "./gameboard";

let player1 = createPlayer();
let player1Board = createGameBoard();
let player2 = createPlayerAI();
let player2Board = createGameBoard();

const placeInitialShips = (length, pos1, pos2) =>
  player1Board.placeShip(length, pos1, pos2);

const placeShipAI = (length, pos1, pos2) =>
  player2Board.placeShip(length, pos1, pos2);

const placeShipsAI = () => {
  const shipLength = [2, 3, 3, 4, 5];
  shipLength.forEach((length) => {
    let flag = false;
    do {
      const coord = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];
      if (Math.floor(Math.random() * 2)) {
        flag = placeShipAI(length, coord, [coord[0] + 0, coord[1] + 1]);
      } else {
        flag = placeShipAI(length, coord, [coord[0] + 1, coord[1] + 0]);
      }
    } while (!flag);
  });
};

const attackPlayer2 = (pos) => player1.attack(player2Board, pos);

const attackPlayer1 = () => player2.aiAttack(player1Board);

const getPlayer1NotAttacked = () => player2Board.notAttacked;

const getPlayer2NotAttacked = () => player1Board.notAttacked;

const isPlayer1Winner = () => player2Board.checkAllShipsSunk();

const isPlayer2Winner = () => player1Board.checkAllShipsSunk();

const restartGame = () => {
  player1 = createPlayer();
  player1Board = createGameBoard();
  player2 = createPlayerAI();
  player2Board = createGameBoard();
};

export {
  placeInitialShips,
  placeShipsAI,
  attackPlayer2,
  attackPlayer1,
  getPlayer1NotAttacked,
  getPlayer2NotAttacked,
  isPlayer1Winner,
  isPlayer2Winner,
  restartGame
};
