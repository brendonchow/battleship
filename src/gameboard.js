import createShip from "./ship";

const createGameBoard = () => {
  const shipsCoordinates = {};
  const missedAttacks = new Set();

  // pos will be a string "xy"
  const placeShip = (length, pos1, pos2) => {
    const ship = createShip(length);
    shipsCoordinates[pos1] = ship;
    if (!pos2) return;

    const [x1, y1] = pos1.split("").map((item) => parseInt(item, 10));
    const [x2, y2] = pos2.split("").map((item) => parseInt(item, 10));
    const [dx, dy] = [x2 - x1, y2 - y1];
    for (let i = 1; i < length; i += 1) {
      shipsCoordinates[`${x1 + dx * i}${y1 + dy * i}`] = ship;
    }
  };

  const receiveAttack = (pos) => {
    const ship = shipsCoordinates[pos];
    if (ship) {
      ship.hit();
      delete shipsCoordinates[pos];
    } else {
      missedAttacks.add(pos);
    }
  };

  const checkAllShipsSunk = () => Object.keys(shipsCoordinates).length === 0;

  return { placeShip, receiveAttack, checkAllShipsSunk };
};

export default createGameBoard;
