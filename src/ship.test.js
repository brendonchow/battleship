import createShip from "./ship";
const ship = createShip(2);

test("Test hit and is not sunk", () => {
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test("Test hit and isSunk", () => {
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
