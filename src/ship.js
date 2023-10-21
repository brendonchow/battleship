const createShip = (length) => {
  let timesHit = 0;

  const hit = () => {
    timesHit += 1;
  };

  // Assume ship will only be hit for a maximum of length times.
  const isSunk = () => timesHit === length;

  return { hit, isSunk };
};

export default createShip;
