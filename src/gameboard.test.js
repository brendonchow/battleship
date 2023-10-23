import createGameBoard from "./gameboard";

const gameBoard = createGameBoard();
const attacks = new Set();

test("Test placeShip on valid square", () => {
  let isPlaced = gameBoard.placeShip(2, [0, 0], [0, 1]);
  expect(isPlaced).toBe(true);
  isPlaced = gameBoard.placeShip(1, [2, 0]);
  expect(isPlaced).toBe(true);
});

test("placeShip on square with adjacent occupied square", () => {
  let isPlaced = gameBoard.placeShip(1, [1, 2]);
  expect(isPlaced).toBe(false);
});

test("Test placeShip on square occupied by ship", () => {
  let isPlaced = gameBoard.placeShip(1, [0, 0]);
  expect(isPlaced).toBe(false);
});

test("placeShip on square where ship will go out of bounds", () => {
  let isPlaced = gameBoard.placeShip(2, [9, 0], [10, 0]);
  expect(isPlaced).toBe(false);
  isPlaced = gameBoard.placeShip(2, [0, 9], [0, 10]);
  expect(isPlaced).toBe(false);
});

test("Test hit but ship not sunk", () => {
  const isHit = gameBoard.receiveAttack([0, 1]);
  expect(gameBoard.checkAllShipsSunk()).toBe(false);
  expect(isHit).toBe(true);
  attacks.add(JSON.stringify([0, 1]));
  expect(gameBoard.attacks).toEqual(attacks);
});

test("Test missed attack", () => {
  const isHit = gameBoard.receiveAttack([0, 2]);
  expect(gameBoard.checkAllShipsSunk()).toBe(false);
  expect(isHit).toBe(false);
  attacks.add(JSON.stringify([0, 2]));
  expect(gameBoard.attacks).toEqual(attacks);
});

test("Test one ship sunk but not all", () => {
  gameBoard.receiveAttack([0, 0]);
  expect(gameBoard.checkAllShipsSunk()).toBe(false);
});

test("All ship sunk", () => {
  gameBoard.receiveAttack([1, 0]);
  expect(gameBoard.checkAllShipsSunk()).toBe(false);
  gameBoard.receiveAttack([2, 0]);
  expect(gameBoard.checkAllShipsSunk()).toBe(true);
});
