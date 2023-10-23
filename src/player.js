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
  };

  const aiAttack = (board) => {
    if (!shipCoord) {
      const notAttacked = Array.from(board.notAttacked);
      const toHit = JSON.parse(
        notAttacked[Math.floor(Math.random() * notAttacked.length)],
      );
      if (attack(board, toHit)) shipCoord = toHit;
      // TEST
      // if (attack(board, [1, 0])) {
      //   shipCoord = [1, 0];
      // }
      return;
    }
    if (!shipDirection) {
      let validSquare = false;
      let toHit;
      let check;
      do {
        check = possible.pop();
        toHit = [shipCoord[0] + check[0], shipCoord[1] + check[1]];
        if (toHit[0] <= 9 && toHit[0] >= 0 && toHit[1] <= 9 && toHit[1] >= 0)
          validSquare = true;
      } while (!validSquare);

      if (attack(board, toHit)) shipDirection = check;
      return;
    }
    const toHit = [
      shipCoord[0] + shipDirection[0] * direction * steps,
      shipCoord[1] + shipDirection[1] * direction * steps,
    ];

    if (toHit[0] <= 9 && toHit[0] >= 0 && toHit[1] <= 9 && toHit[1] >= 0) {
      if (attack(board, toHit)) steps += 1;
      else if (direction === 1) {
        direction = -1;
        steps = 1;
      } else {
        shipSunk();
      }
      return;
    }

    if (direction === 1) {
      direction = -1;
      steps = 1;
    } else {
      shipSunk();
    }
    aiAttack(board);
  };

  return { aiAttack };
};

export { createPlayer, createPlayerAI };
