import createGameBoard from "./gameboard";
import { createPlayer, createPlayerAI } from "./player";

const player = createPlayer();
const gameBoard = createGameBoard();
gameBoard.placeShip(1, [0, 0]);

test("Test player sends receiveAttack to gameBoard", () => {
  player.attack(gameBoard, [0, 0]);

  expect(gameBoard.notAttacked.has(`[${0},${0}]`)).toBe(false);
  expect(gameBoard.checkAllShipsSunk()).toBe(true);
});

const playerAI = createPlayerAI();
const gameBoardAI = createGameBoard();

test("Test aiAttack sends message", () => {
  playerAI.aiAttack(gameBoardAI);
  expect(gameBoardAI.notAttacked.size).toBe(99);
});

// const player2 = createPlayerAI();
// const gameBoard2 = createGameBoard();
// gameBoard2.placeShip(5, [1, 0], [2, 0]);

// test("aiAttack", () => {
//   expect(gameBoard2.checkAllShipsSunk()).toBe(false);

//   player2.aiAttack(gameBoard2); // [1, 0]
//   player2.aiAttack(gameBoard2); // [0, 0]
//   player2.aiAttack(gameBoard2); // [2, 0]
//   player2.aiAttack(gameBoard2); // [3, 0]
//   player2.aiAttack(gameBoard2); // [4, 0]
//   player2.aiAttack(gameBoard2); // [5, 0]
//   expect(gameBoard2.checkAllShipsSunk()).toBe(true);
//   player2.aiAttack(gameBoard2);
//   expect(gameBoard2.notAttacked.size).toBe(93);
// });

// const player3 = createPlayerAI();
// const gameBoard3 = createGameBoard();
// gameBoard3.placeShip(4, [0, 0], [1, 0]);

// test("aiAttack both directions", () => {
//   expect(gameBoard3.checkAllShipsSunk()).toBe(false);

//   player3.aiAttack(gameBoard3);
//   player3.aiAttack(gameBoard3);
//   player3.aiAttack(gameBoard3);
//   player3.aiAttack(gameBoard3);
//   expect(gameBoard3.checkAllShipsSunk()).toBe(true);
// });

// const player4 = createPlayerAI();
// const gameBoard4 = createGameBoard();
// gameBoard4.placeShip(2, [1, 0], [1, 1]);

// test("aiAttack checks all directions", () => {
//   expect(gameBoard4.checkAllShipsSunk()).toBe(false);

//   player4.aiAttack(gameBoard4);
//   player4.aiAttack(gameBoard4);
//   player4.aiAttack(gameBoard4);
//   player4.aiAttack(gameBoard4);
//   expect(gameBoard4.checkAllShipsSunk()).toBe(true);
// });
