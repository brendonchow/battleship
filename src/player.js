const createPlayer = () => {
  const attack = (board, pos) => board.receiveAttack(pos);
  return { attack };
};

const createPlayerAI = () => {
  // Store what ships are still alive
  let shipCoord = null;
  let shipDirection = null;
  let direction = 1;
  let steps = 2;
  let possible = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let shipLength = 0;
  const shipsLength = [0, 0, 1, 2, 1, 1];

  const { attack } = createPlayer();
  const shipSunk = () => {
    shipCoord = null;
    shipDirection = null;
    direction = 1;
    steps = 2;
    possible = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    shipsLength[shipLength] -= 1;
    shipLength = 0;
  };

  const validateSquare = (toHit, board) =>
    toHit[0] <= 9 &&
    toHit[0] >= 0 &&
    toHit[1] <= 9 &&
    toHit[1] >= 0 &&
    board.notAttacked.has(JSON.stringify(toHit));

  const checkForLargerShips = () => {
    for (let i = shipsLength.length - 1; i >= 0; i -= 1) {
      if (shipLength === i) shipSunk();
      if (shipsLength[i] > 0) return;
    }
  };

  const aiAttack = (board) => {
    if (!shipCoord) {
      const notAttacked = Array.from(board.notAttacked);
      const toHit = JSON.parse(
        notAttacked[Math.floor(Math.random() * notAttacked.length)],
      );
      if (attack(board, toHit)) {
        shipCoord = toHit;
        shipLength += 1;
      }
      // TEST
      // if (attack(board, [1, 0])) {
      //   shipCoord = [1, 0];
      // }
      return toHit;
    }
    if (!shipDirection) {
      let validSquare = false;
      let toHit;
      let check;
      do {
        check = possible.pop();
        toHit = [shipCoord[0] + check[0], shipCoord[1] + check[1]];
        validSquare = validateSquare(toHit, board);
      } while (!validSquare && possible.length !== 0);
      if (!validSquare) {
        shipSunk();
        return aiAttack(board);
      }

      if (attack(board, toHit)) {
        shipDirection = check;
        shipLength += 1;
      }

      return toHit;
    }
    const toHit = [
      shipCoord[0] + shipDirection[0] * direction * steps,
      shipCoord[1] + shipDirection[1] * direction * steps,
    ];

    if (validateSquare(toHit, board)) {
      if (attack(board, toHit)) {
        steps += 1;
        shipLength += 1;
        checkForLargerShips();
      } else if (direction === 1) {
        direction = -1;
        steps = 1;
      } else {
        shipSunk();
      }
      return toHit;
    }

    if (direction === 1) {
      direction = -1;
      steps = 1;
    } else {
      shipSunk();
    }
    return aiAttack(board);
  };

  return { aiAttack };
};

export { createPlayer, createPlayerAI };
