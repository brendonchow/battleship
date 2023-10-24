import { createPlayer, createPlayerAI } from "./player";
import createGameBoard from "./gameboard";

const player1 = createPlayer();
const player1Board = createGameBoard();
const player2 = createPlayerAI();
const player2Board = createGameBoard();

const placeInitialShips = (length, pos1, pos2) =>
  player1Board.placeShip(length, pos1, pos2);

const placeShipsAI = (length, pos1, pos2) =>
  player2Board.placeShip(length, pos1, pos2);

export { placeInitialShips, placeShipsAI };
