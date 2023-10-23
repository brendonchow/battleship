import createGameBoard from "./gameboard";

const gameBoard = createGameBoard();
gameBoard.placeShip(2, "00", "01");
gameBoard.placeShip(1, "10");

test("Test hit but ship not sunk", () => {
  gameBoard.receiveAttack("01");
  expect(gameBoard.checkAllShipsSunk()).toBe(false);
});

test("Test missed attack", () => {
  gameBoard.receiveAttack("02");
  expect(gameBoard.checkAllShipsSunk()).toBe(false);
});

test("Test one ship sunk but not all", () => {
  gameBoard.receiveAttack("00");
  expect(gameBoard.checkAllShipsSunk()).toBe(false);
});

test("All ship sunk", () => {
  gameBoard.receiveAttack("10");
  expect(gameBoard.checkAllShipsSunk()).toBe(true);
});
