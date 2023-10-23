import createShip from "./ship";

const createGameBoard = () => {
  const shipsCoordinates = {};
  const attacks = new Set();

  const initializeNotAttacked = (size = 10) => {
    const notAttacked = new Set();
    for (let i = 0; i < size; i += 1) {
      for (let j = 0; j < size; j += 1) {
        notAttacked.add(`[${i},${j}]`);
      }
    }
    return notAttacked;
  };

  const notAttacked = initializeNotAttacked();

  const checkValidShipPlacement = (coords) =>
    coords.every((pos) => {
      const [x, y] = JSON.parse(pos);
      if (x > 9 || x < 0 || y > 9 || y < 0) return false;
      for (let i = x - 1; i <= x + 1; i += 1) {
        for (let j = y - 1; j <= y + 1; j += 1) {
          if (shipsCoordinates[JSON.stringify([i, j])]) return false;
        }
      }
      return true;
    });

  // pos will be a JSON.stringified [x, y]
  const placeShip = (length, pos1, pos2) => {
    const coords = [JSON.stringify(pos1)];

    if (pos2) {
      const [x1, y1] = pos1;
      const [x2, y2] = pos2;
      const [dx, dy] = [x2 - x1, y2 - y1];
      for (let i = 1; i < length; i += 1) {
        coords.push(JSON.stringify([x1 + dx * i, y1 + dy * i]));
      }
    }

    if (!checkValidShipPlacement(coords)) return false;

    const ship = createShip(length);
    coords.forEach((pos) => {
      shipsCoordinates[pos] = ship;
    });
    return true;
  };

  const receiveAttack = (pos) => {
    const posStringify = JSON.stringify(pos);
    const ship = shipsCoordinates[posStringify];

    attacks.add(posStringify);
    notAttacked.delete(posStringify);

    if (ship) {
      ship.hit();
      delete shipsCoordinates[posStringify];
      return true;
    }
    return false;
  };

  const checkAllShipsSunk = () => Object.keys(shipsCoordinates).length === 0;

  return {
    placeShip,
    receiveAttack,
    checkAllShipsSunk,
    get attacks() {
      return attacks;
    },
    get notAttacked() {
      return notAttacked;
    },
  };
};

export default createGameBoard;
