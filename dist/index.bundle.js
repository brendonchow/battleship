"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["index"],{

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attackPlayer1: () => (/* binding */ attackPlayer1),
/* harmony export */   attackPlayer2: () => (/* binding */ attackPlayer2),
/* harmony export */   getPlayer1NotAttacked: () => (/* binding */ getPlayer1NotAttacked),
/* harmony export */   getPlayer2NotAttacked: () => (/* binding */ getPlayer2NotAttacked),
/* harmony export */   isPlayer1Winner: () => (/* binding */ isPlayer1Winner),
/* harmony export */   isPlayer2Winner: () => (/* binding */ isPlayer2Winner),
/* harmony export */   placeInitialShips: () => (/* binding */ placeInitialShips),
/* harmony export */   placeShipsAI: () => (/* binding */ placeShipsAI),
/* harmony export */   restartGame: () => (/* binding */ restartGame)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");


let player1 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.createPlayer)();
let player1Board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
let player2 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.createPlayerAI)();
let player2Board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
const placeInitialShips = (length, pos1, pos2) => player1Board.placeShip(length, pos1, pos2);
const placeShipAI = (length, pos1, pos2) => player2Board.placeShip(length, pos1, pos2);
const placeShipsAI = () => {
  const shipLength = [2, 3, 3, 4, 5];
  shipLength.forEach(length => {
    let flag = false;
    do {
      const coord = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
      if (Math.floor(Math.random() * 2)) {
        flag = placeShipAI(length, coord, [coord[0] + 0, coord[1] + 1]);
      } else {
        flag = placeShipAI(length, coord, [coord[0] + 1, coord[1] + 0]);
      }
    } while (!flag);
  });
};
const attackPlayer2 = pos => player1.attack(player2Board, pos);
const attackPlayer1 = () => player2.aiAttack(player1Board);
const getPlayer1NotAttacked = () => player2Board.notAttacked;
const getPlayer2NotAttacked = () => player1Board.notAttacked;
const isPlayer1Winner = () => player2Board.checkAllShipsSunk();
const isPlayer2Winner = () => player1Board.checkAllShipsSunk();
const restartGame = () => {
  player1 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.createPlayer)();
  player1Board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
  player2 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.createPlayerAI)();
  player2Board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
};


/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");

const createGameBoard = () => {
  const shipsCoordinates = {};
  const attacks = new Set();
  const initializeNotAttacked = function () {
    let size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    const notAttacked = new Set();
    for (let i = 0; i < size; i += 1) {
      for (let j = 0; j < size; j += 1) {
        notAttacked.add(`[${i},${j}]`);
      }
    }
    return notAttacked;
  };
  const notAttacked = initializeNotAttacked();
  const checkValidShipPlacement = coords => coords.every(pos => {
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
    const ship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
    coords.forEach(pos => {
      shipsCoordinates[pos] = ship;
    });
    return true;
  };
  const receiveAttack = pos => {
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
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createGameBoard);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! normalize.css */ "./node_modules/normalize.css/normalize.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ "./src/game.js");



const initialize = document.querySelector(".initialize");
const dialogSquares = Array.from(document.querySelectorAll(".dialog-board .square"));
const player1Squares = Array.from(document.querySelectorAll(".board1 .square"));
const player2Squares = Array.from(document.querySelectorAll(".board2 .square"));
const rotateButton = document.querySelector(".rotate");
const shipName = document.querySelector(".ship-name");
const gameOverModal = document.querySelector(".game-over");
const winner = document.querySelector(".winner");
const playAgainButton = document.querySelector(".play-again");
let direction = [0, 1];
let shipLengths = [2, 3, 3, 4, 5];
let shipNames = ["Patrol Boat", "Submarine", "Destroyer", "Battleship"];
let highlighted = [];
const mouseOverSquare = coord => {
  highlighted.forEach(index => dialogSquares[index].classList.remove("temp-highlight"));
  highlighted = [];
  const shipLength = shipLengths[shipLengths.length - 1];
  for (let i = 0; i < shipLength; i += 1) {
    const next = [coord[0] + direction[0] * i, coord[1] + direction[1] * i];
    if (next[0] > 9 || next[1] > 9) break;
    const index = next[0] * 10 + next[1];
    dialogSquares[index].classList.add("temp-highlight");
    highlighted.push(index);
  }
};
const clickDialogSquare = coord => {
  if ((0,_game__WEBPACK_IMPORTED_MODULE_2__.placeInitialShips)(shipLengths[shipLengths.length - 1], coord, [coord[0] + direction[0], coord[1] + direction[1]])) {
    highlighted.forEach(index => {
      dialogSquares[index].classList.add("highlight");
      player1Squares[index].classList.add("highlight");
    });
    shipLengths.pop();
    if (shipLengths.length === 0) {
      initialize.close();
      (0,_game__WEBPACK_IMPORTED_MODULE_2__.placeShipsAI)();
      return;
    }
    const name = shipNames.pop();
    shipName.textContent = name;
  }
};
dialogSquares.forEach((square, index) => {
  const coord = [Math.floor(index / 10), index % 10];
  square.addEventListener("mouseover", () => mouseOverSquare(coord));
  square.addEventListener("click", () => clickDialogSquare(coord));
});
rotateButton.addEventListener("click", () => {
  if (direction[0] === 0) direction = [1, 0];else direction = [0, 1];
});
const displayWinner = message => {
  winner.textContent = message;
  gameOverModal.showModal();
};
const aiAttack = () => {
  const coordHit = (0,_game__WEBPACK_IMPORTED_MODULE_2__.attackPlayer1)();
  const squareHit = player1Squares[coordHit[0] * 10 + coordHit[1]];
  if (squareHit.classList.contains("highlight")) {
    squareHit.classList.remove("highlight");
    squareHit.classList.add("hit");
  } else {
    squareHit.classList.add("miss");
  }
  if ((0,_game__WEBPACK_IMPORTED_MODULE_2__.isPlayer2Winner)()) {
    displayWinner("You lost!");
  }
};
const playerAttack = (square, coord) => {
  if ((0,_game__WEBPACK_IMPORTED_MODULE_2__.attackPlayer2)(coord)) {
    square.classList.add("hit");
  } else if (!square.classList.contains("hit")) square.classList.add("miss");
  if ((0,_game__WEBPACK_IMPORTED_MODULE_2__.isPlayer1Winner)()) {
    displayWinner("You won!");
    return true;
  }
  return false;
};
player2Squares.forEach((square, index) => square.addEventListener("click", () => {
  const coord = [Math.floor(index / 10), index % 10];
  if (!(0,_game__WEBPACK_IMPORTED_MODULE_2__.getPlayer1NotAttacked)().has(JSON.stringify(coord))) return;
  if (playerAttack(square, coord)) return;
  aiAttack();
}));
const clearSquare = square => {
  square.classList.remove("temp-highlight");
  square.classList.remove("highlight");
  square.classList.remove("hit");
  square.classList.remove("miss");
};
playAgainButton.addEventListener("click", () => {
  gameOverModal.close();
  dialogSquares.forEach((square, index) => {
    clearSquare(square);
    clearSquare(player1Squares[index]);
    clearSquare(player2Squares[index]);
  });
  (0,_game__WEBPACK_IMPORTED_MODULE_2__.restartGame)();
  direction = [0, 1];
  shipLengths = [2, 3, 3, 4, 5];
  shipNames = ["Patrol Boat", "Submarine", "Destroyer", "Battleship"];
  highlighted = [];
  initialize.showModal();
});
initialize.showModal();

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPlayer: () => (/* binding */ createPlayer),
/* harmony export */   createPlayerAI: () => (/* binding */ createPlayerAI)
/* harmony export */ });
const createPlayer = () => {
  const attack = (board, pos) => board.receiveAttack(pos);
  return {
    attack
  };
};
const createPlayerAI = () => {
  // Store what ships are still alive
  let shipCoord = null;
  let shipDirection = null;
  let direction = 1;
  let steps = 2;
  let possible = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let shipLength = 0;
  const shipsLength = [0, 0, 1, 2, 1, 1];
  const {
    attack
  } = createPlayer();
  const shipSunk = () => {
    shipCoord = null;
    shipDirection = null;
    direction = 1;
    steps = 2;
    possible = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    shipsLength[shipLength] -= 1;
    shipLength = 0;
  };
  const validateSquare = (toHit, board) => toHit[0] <= 9 && toHit[0] >= 0 && toHit[1] <= 9 && toHit[1] >= 0 && board.notAttacked.has(JSON.stringify(toHit));
  const checkForLargerShips = () => {
    for (let i = shipsLength.length - 1; i >= 0; i -= 1) {
      if (shipLength === i) shipSunk();
      if (shipsLength[i] > 0) return;
    }
  };
  const aiAttack = board => {
    if (!shipCoord) {
      const notAttacked = Array.from(board.notAttacked);
      const toHit = JSON.parse(notAttacked[Math.floor(Math.random() * notAttacked.length)]);
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
    const toHit = [shipCoord[0] + shipDirection[0] * direction * steps, shipCoord[1] + shipDirection[1] * direction * steps];
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
  return {
    aiAttack
  };
};


/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const createShip = length => {
  let timesHit = 0;
  const hit = () => {
    timesHit += 1;
  };

  // Assume ship will only be hit for a maximum of length times.
  const isSunk = () => timesHit === length;
  return {
    hit,
    isSunk
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createShip);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css":
/*!****************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css ***!
  \****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

/* Document
   ========================================================================== */

/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

/* Sections
   ========================================================================== */

/**
 * Remove the margin in all browsers.
 */

body {
  margin: 0;
}

/**
 * Render the \`main\` element consistently in IE.
 */

main {
  display: block;
}

/**
 * Correct the font size and margin on \`h1\` elements within \`section\` and
 * \`article\` contexts in Chrome, Firefox, and Safari.
 */

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/* Grouping content
   ========================================================================== */

/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */

pre {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/* Text-level semantics
   ========================================================================== */

/**
 * Remove the gray background on active links in IE 10.
 */

a {
  background-color: transparent;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */

abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

b,
strong {
  font-weight: bolder;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd \`em\` font sizing in all browsers.
 */

code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */

small {
  font-size: 80%;
}

/**
 * Prevent \`sub\` and \`sup\` elements from affecting the line height in
 * all browsers.
 */

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
   ========================================================================== */

/**
 * Remove the border on images inside links in IE 10.
 */

img {
  border-style: none;
}

/* Forms
   ========================================================================== */

/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

button,
input { /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

button,
select { /* 1 */
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

/**
 * Remove the inner border and padding in Firefox.
 */

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Correct the padding in Firefox.
 */

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from \`fieldset\` elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    \`fieldset\` elements in all browsers.
 */

legend {
  box-sizing: border-box; /* 1 */
  color: inherit; /* 2 */
  display: table; /* 1 */
  max-width: 100%; /* 1 */
  padding: 0; /* 3 */
  white-space: normal; /* 1 */
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */

progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */

textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */

[type="search"] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to \`inherit\` in Safari.
 */

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/* Interactive
   ========================================================================== */

/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */

details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */

summary {
  display: list-item;
}

/* Misc
   ========================================================================== */

/**
 * Add the correct display in IE 10+.
 */

template {
  display: none;
}

/**
 * Add the correct display in IE 10.
 */

[hidden] {
  display: none;
}
`, "",{"version":3,"sources":["webpack://./node_modules/normalize.css/normalize.css"],"names":[],"mappings":"AAAA,2EAA2E;;AAE3E;+EAC+E;;AAE/E;;;EAGE;;AAEF;EACE,iBAAiB,EAAE,MAAM;EACzB,8BAA8B,EAAE,MAAM;AACxC;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,SAAS;AACX;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;EACE,cAAc;EACd,gBAAgB;AAClB;;AAEA;+EAC+E;;AAE/E;;;EAGE;;AAEF;EACE,uBAAuB,EAAE,MAAM;EAC/B,SAAS,EAAE,MAAM;EACjB,iBAAiB,EAAE,MAAM;AAC3B;;AAEA;;;EAGE;;AAEF;EACE,iCAAiC,EAAE,MAAM;EACzC,cAAc,EAAE,MAAM;AACxB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,6BAA6B;AAC/B;;AAEA;;;EAGE;;AAEF;EACE,mBAAmB,EAAE,MAAM;EAC3B,0BAA0B,EAAE,MAAM;EAClC,iCAAiC,EAAE,MAAM;AAC3C;;AAEA;;EAEE;;AAEF;;EAEE,mBAAmB;AACrB;;AAEA;;;EAGE;;AAEF;;;EAGE,iCAAiC,EAAE,MAAM;EACzC,cAAc,EAAE,MAAM;AACxB;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;;EAEE,cAAc;EACd,cAAc;EACd,kBAAkB;EAClB,wBAAwB;AAC1B;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,WAAW;AACb;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,kBAAkB;AACpB;;AAEA;+EAC+E;;AAE/E;;;EAGE;;AAEF;;;;;EAKE,oBAAoB,EAAE,MAAM;EAC5B,eAAe,EAAE,MAAM;EACvB,iBAAiB,EAAE,MAAM;EACzB,SAAS,EAAE,MAAM;AACnB;;AAEA;;;EAGE;;AAEF;QACQ,MAAM;EACZ,iBAAiB;AACnB;;AAEA;;;EAGE;;AAEF;SACS,MAAM;EACb,oBAAoB;AACtB;;AAEA;;EAEE;;AAEF;;;;EAIE,0BAA0B;AAC5B;;AAEA;;EAEE;;AAEF;;;;EAIE,kBAAkB;EAClB,UAAU;AACZ;;AAEA;;EAEE;;AAEF;;;;EAIE,8BAA8B;AAChC;;AAEA;;EAEE;;AAEF;EACE,8BAA8B;AAChC;;AAEA;;;;;EAKE;;AAEF;EACE,sBAAsB,EAAE,MAAM;EAC9B,cAAc,EAAE,MAAM;EACtB,cAAc,EAAE,MAAM;EACtB,eAAe,EAAE,MAAM;EACvB,UAAU,EAAE,MAAM;EAClB,mBAAmB,EAAE,MAAM;AAC7B;;AAEA;;EAEE;;AAEF;EACE,wBAAwB;AAC1B;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;;EAEE,sBAAsB,EAAE,MAAM;EAC9B,UAAU,EAAE,MAAM;AACpB;;AAEA;;EAEE;;AAEF;;EAEE,YAAY;AACd;;AAEA;;;EAGE;;AAEF;EACE,6BAA6B,EAAE,MAAM;EACrC,oBAAoB,EAAE,MAAM;AAC9B;;AAEA;;EAEE;;AAEF;EACE,wBAAwB;AAC1B;;AAEA;;;EAGE;;AAEF;EACE,0BAA0B,EAAE,MAAM;EAClC,aAAa,EAAE,MAAM;AACvB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;EAEE;;AAEF;EACE,kBAAkB;AACpB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,aAAa;AACf;;AAEA;;EAEE;;AAEF;EACE,aAAa;AACf","sourcesContent":["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
  font-size: 1vw;
}

html {
  box-sizing: border-box;
  font-family: Roboto, system-ui, "Segoe UI", Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

*,
*::before,
*::after {
  box-sizing: inherit;
  padding: 0;
  margin: 0;
  border: none;
}

h1 {
  /* To override Normalize.css h1 margin */
  margin: 0;
}

body {
  display: grid;
  grid-template-rows: 1fr;
  height: 100vh;
}

.boards {
  padding: 2.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  column-gap: 2.5rem;
  row-gap: 50px;
  align-items: center;
}

.board1,
.board2,
.dialog-board {
  border: 1px solid black;
}

.row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
}

.square {
  border: 1px solid black;
  aspect-ratio: 1;
}

.board2 .square:not(.miss, .hit) {
  cursor: pointer;
}

dialog[open] {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  gap: 25px;
  padding: 2rem;
  text-align: center;
  border-radius: 10px;
}

.rotate,
.play-again {
  background-color: black;
  color: white;
  padding: 10px 25px;
  font-size: 20px;
  justify-self: center;
  border-radius: 5px;
  cursor: pointer;
}

.winner {
  font-size: 48px;
}

.play-again {
  font-size: 32px;
}

.rotate:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.temp-highlight,
.highlight {
  background-color: rgba(0, 0, 0, 0.75);
}

.dialog-board .square:not(.highlight) {
  cursor: pointer;
}

.hit {
  background-color: red;
}

.miss {
  background-color: green;
}

.right,
.left {
  display: grid;
  gap: 10px;
}

.board-title {
  text-align: center;
}
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,cAAc;AAChB;;AAEA;EACE,sBAAsB;EACtB;4DAC0D;AAC5D;;AAEA;;;EAGE,mBAAmB;EACnB,UAAU;EACV,SAAS;EACT,YAAY;AACd;;AAEA;EACE,wCAAwC;EACxC,SAAS;AACX;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,aAAa;AACf;;AAEA;EACE,eAAe;EACf,aAAa;EACb,2DAA2D;EAC3D,kBAAkB;EAClB,aAAa;EACb,mBAAmB;AACrB;;AAEA;;;EAGE,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,yDAAyD;AAC3D;;AAEA;EACE,uBAAuB;EACvB,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,aAAa;EACb,SAAS;EACT,aAAa;EACb,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;;EAEE,uBAAuB;EACvB,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,oBAAoB;EACpB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,oCAAoC;AACtC;;AAEA;;EAEE,qCAAqC;AACvC;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;;EAEE,aAAa;EACb,SAAS;AACX;;AAEA;EACE,kBAAkB;AACpB","sourcesContent":[":root {\n  font-size: 1vw;\n}\n\nhtml {\n  box-sizing: border-box;\n  font-family: Roboto, system-ui, \"Segoe UI\", Helvetica, Arial, sans-serif,\n    \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: inherit;\n  padding: 0;\n  margin: 0;\n  border: none;\n}\n\nh1 {\n  /* To override Normalize.css h1 margin */\n  margin: 0;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: 1fr;\n  height: 100vh;\n}\n\n.boards {\n  padding: 2.5rem;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  column-gap: 2.5rem;\n  row-gap: 50px;\n  align-items: center;\n}\n\n.board1,\n.board2,\n.dialog-board {\n  border: 1px solid black;\n}\n\n.row {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));\n}\n\n.square {\n  border: 1px solid black;\n  aspect-ratio: 1;\n}\n\n.board2 .square:not(.miss, .hit) {\n  cursor: pointer;\n}\n\ndialog[open] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  display: grid;\n  gap: 25px;\n  padding: 2rem;\n  text-align: center;\n  border-radius: 10px;\n}\n\n.rotate,\n.play-again {\n  background-color: black;\n  color: white;\n  padding: 10px 25px;\n  font-size: 20px;\n  justify-self: center;\n  border-radius: 5px;\n  cursor: pointer;\n}\n\n.winner {\n  font-size: 48px;\n}\n\n.play-again {\n  font-size: 32px;\n}\n\n.rotate:hover {\n  background-color: rgba(0, 0, 0, 0.8);\n}\n\n.temp-highlight,\n.highlight {\n  background-color: rgba(0, 0, 0, 0.75);\n}\n\n.dialog-board .square:not(.highlight) {\n  cursor: pointer;\n}\n\n.hit {\n  background-color: red;\n}\n\n.miss {\n  background-color: green;\n}\n\n.right,\n.left {\n  display: grid;\n  gap: 10px;\n}\n\n.board-title {\n  text-align: center;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/normalize.css/normalize.css":
/*!**************************************************!*\
  !*** ./node_modules/normalize.css/normalize.css ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../css-loader/dist/cjs.js!./normalize.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcz8zNDJmIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVQbGF5ZXIsIGNyZWF0ZVBsYXllckFJIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgY3JlYXRlR2FtZUJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5sZXQgcGxheWVyMSA9IGNyZWF0ZVBsYXllcigpO1xubGV0IHBsYXllcjFCb2FyZCA9IGNyZWF0ZUdhbWVCb2FyZCgpO1xubGV0IHBsYXllcjIgPSBjcmVhdGVQbGF5ZXJBSSgpO1xubGV0IHBsYXllcjJCb2FyZCA9IGNyZWF0ZUdhbWVCb2FyZCgpO1xuXG5jb25zdCBwbGFjZUluaXRpYWxTaGlwcyA9IChsZW5ndGgsIHBvczEsIHBvczIpID0+XG4gIHBsYXllcjFCb2FyZC5wbGFjZVNoaXAobGVuZ3RoLCBwb3MxLCBwb3MyKTtcblxuY29uc3QgcGxhY2VTaGlwQUkgPSAobGVuZ3RoLCBwb3MxLCBwb3MyKSA9PlxuICBwbGF5ZXIyQm9hcmQucGxhY2VTaGlwKGxlbmd0aCwgcG9zMSwgcG9zMik7XG5cbmNvbnN0IHBsYWNlU2hpcHNBSSA9ICgpID0+IHtcbiAgY29uc3Qgc2hpcExlbmd0aCA9IFsyLCAzLCAzLCA0LCA1XTtcbiAgc2hpcExlbmd0aC5mb3JFYWNoKChsZW5ndGgpID0+IHtcbiAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgIGRvIHtcbiAgICAgIGNvbnN0IGNvb3JkID0gW1xuICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCksXG4gICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSxcbiAgICAgIF07XG4gICAgICBpZiAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMikpIHtcbiAgICAgICAgZmxhZyA9IHBsYWNlU2hpcEFJKGxlbmd0aCwgY29vcmQsIFtjb29yZFswXSArIDAsIGNvb3JkWzFdICsgMV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmxhZyA9IHBsYWNlU2hpcEFJKGxlbmd0aCwgY29vcmQsIFtjb29yZFswXSArIDEsIGNvb3JkWzFdICsgMF0pO1xuICAgICAgfVxuICAgIH0gd2hpbGUgKCFmbGFnKTtcbiAgfSk7XG59O1xuXG5jb25zdCBhdHRhY2tQbGF5ZXIyID0gKHBvcykgPT4gcGxheWVyMS5hdHRhY2socGxheWVyMkJvYXJkLCBwb3MpO1xuXG5jb25zdCBhdHRhY2tQbGF5ZXIxID0gKCkgPT4gcGxheWVyMi5haUF0dGFjayhwbGF5ZXIxQm9hcmQpO1xuXG5jb25zdCBnZXRQbGF5ZXIxTm90QXR0YWNrZWQgPSAoKSA9PiBwbGF5ZXIyQm9hcmQubm90QXR0YWNrZWQ7XG5cbmNvbnN0IGdldFBsYXllcjJOb3RBdHRhY2tlZCA9ICgpID0+IHBsYXllcjFCb2FyZC5ub3RBdHRhY2tlZDtcblxuY29uc3QgaXNQbGF5ZXIxV2lubmVyID0gKCkgPT4gcGxheWVyMkJvYXJkLmNoZWNrQWxsU2hpcHNTdW5rKCk7XG5cbmNvbnN0IGlzUGxheWVyMldpbm5lciA9ICgpID0+IHBsYXllcjFCb2FyZC5jaGVja0FsbFNoaXBzU3VuaygpO1xuXG5jb25zdCByZXN0YXJ0R2FtZSA9ICgpID0+IHtcbiAgcGxheWVyMSA9IGNyZWF0ZVBsYXllcigpO1xuICBwbGF5ZXIxQm9hcmQgPSBjcmVhdGVHYW1lQm9hcmQoKTtcbiAgcGxheWVyMiA9IGNyZWF0ZVBsYXllckFJKCk7XG4gIHBsYXllcjJCb2FyZCA9IGNyZWF0ZUdhbWVCb2FyZCgpO1xufTtcblxuZXhwb3J0IHtcbiAgcGxhY2VJbml0aWFsU2hpcHMsXG4gIHBsYWNlU2hpcHNBSSxcbiAgYXR0YWNrUGxheWVyMixcbiAgYXR0YWNrUGxheWVyMSxcbiAgZ2V0UGxheWVyMU5vdEF0dGFja2VkLFxuICBnZXRQbGF5ZXIyTm90QXR0YWNrZWQsXG4gIGlzUGxheWVyMVdpbm5lcixcbiAgaXNQbGF5ZXIyV2lubmVyLFxuICByZXN0YXJ0R2FtZVxufTtcbiIsImltcG9ydCBjcmVhdGVTaGlwIGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgY3JlYXRlR2FtZUJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBzaGlwc0Nvb3JkaW5hdGVzID0ge307XG4gIGNvbnN0IGF0dGFja3MgPSBuZXcgU2V0KCk7XG5cbiAgY29uc3QgaW5pdGlhbGl6ZU5vdEF0dGFja2VkID0gKHNpemUgPSAxMCkgPT4ge1xuICAgIGNvbnN0IG5vdEF0dGFja2VkID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNpemU7IGogKz0gMSkge1xuICAgICAgICBub3RBdHRhY2tlZC5hZGQoYFske2l9LCR7an1dYCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub3RBdHRhY2tlZDtcbiAgfTtcblxuICBjb25zdCBub3RBdHRhY2tlZCA9IGluaXRpYWxpemVOb3RBdHRhY2tlZCgpO1xuXG4gIGNvbnN0IGNoZWNrVmFsaWRTaGlwUGxhY2VtZW50ID0gKGNvb3JkcykgPT5cbiAgICBjb29yZHMuZXZlcnkoKHBvcykgPT4ge1xuICAgICAgY29uc3QgW3gsIHldID0gSlNPTi5wYXJzZShwb3MpO1xuICAgICAgaWYgKHggPiA5IHx8IHggPCAwIHx8IHkgPiA5IHx8IHkgPCAwKSByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IgKGxldCBpID0geCAtIDE7IGkgPD0geCArIDE7IGkgKz0gMSkge1xuICAgICAgICBmb3IgKGxldCBqID0geSAtIDE7IGogPD0geSArIDE7IGogKz0gMSkge1xuICAgICAgICAgIGlmIChzaGlwc0Nvb3JkaW5hdGVzW0pTT04uc3RyaW5naWZ5KFtpLCBqXSldKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuXG4gIC8vIHBvcyB3aWxsIGJlIGEgSlNPTi5zdHJpbmdpZmllZCBbeCwgeV1cbiAgY29uc3QgcGxhY2VTaGlwID0gKGxlbmd0aCwgcG9zMSwgcG9zMikgPT4ge1xuICAgIGNvbnN0IGNvb3JkcyA9IFtKU09OLnN0cmluZ2lmeShwb3MxKV07XG5cbiAgICBpZiAocG9zMikge1xuICAgICAgY29uc3QgW3gxLCB5MV0gPSBwb3MxO1xuICAgICAgY29uc3QgW3gyLCB5Ml0gPSBwb3MyO1xuICAgICAgY29uc3QgW2R4LCBkeV0gPSBbeDIgLSB4MSwgeTIgLSB5MV07XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvb3Jkcy5wdXNoKEpTT04uc3RyaW5naWZ5KFt4MSArIGR4ICogaSwgeTEgKyBkeSAqIGldKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFjaGVja1ZhbGlkU2hpcFBsYWNlbWVudChjb29yZHMpKSByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBzaGlwID0gY3JlYXRlU2hpcChsZW5ndGgpO1xuICAgIGNvb3Jkcy5mb3JFYWNoKChwb3MpID0+IHtcbiAgICAgIHNoaXBzQ29vcmRpbmF0ZXNbcG9zXSA9IHNoaXA7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChwb3MpID0+IHtcbiAgICBjb25zdCBwb3NTdHJpbmdpZnkgPSBKU09OLnN0cmluZ2lmeShwb3MpO1xuICAgIGNvbnN0IHNoaXAgPSBzaGlwc0Nvb3JkaW5hdGVzW3Bvc1N0cmluZ2lmeV07XG5cbiAgICBhdHRhY2tzLmFkZChwb3NTdHJpbmdpZnkpO1xuICAgIG5vdEF0dGFja2VkLmRlbGV0ZShwb3NTdHJpbmdpZnkpO1xuXG4gICAgaWYgKHNoaXApIHtcbiAgICAgIHNoaXAuaGl0KCk7XG4gICAgICBkZWxldGUgc2hpcHNDb29yZGluYXRlc1twb3NTdHJpbmdpZnldO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBjaGVja0FsbFNoaXBzU3VuayA9ICgpID0+IE9iamVjdC5rZXlzKHNoaXBzQ29vcmRpbmF0ZXMpLmxlbmd0aCA9PT0gMDtcblxuICByZXR1cm4ge1xuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGNoZWNrQWxsU2hpcHNTdW5rLFxuICAgIGdldCBhdHRhY2tzKCkge1xuICAgICAgcmV0dXJuIGF0dGFja3M7XG4gICAgfSxcbiAgICBnZXQgbm90QXR0YWNrZWQoKSB7XG4gICAgICByZXR1cm4gbm90QXR0YWNrZWQ7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUdhbWVCb2FyZDtcbiIsImltcG9ydCBcIm5vcm1hbGl6ZS5jc3NcIjtcbmltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQge1xuICBwbGFjZUluaXRpYWxTaGlwcyxcbiAgcGxhY2VTaGlwc0FJLFxuICBhdHRhY2tQbGF5ZXIyLFxuICBhdHRhY2tQbGF5ZXIxLFxuICBnZXRQbGF5ZXIxTm90QXR0YWNrZWQsXG4gIGlzUGxheWVyMVdpbm5lcixcbiAgaXNQbGF5ZXIyV2lubmVyLFxuICByZXN0YXJ0R2FtZSxcbn0gZnJvbSBcIi4vZ2FtZVwiO1xuXG5jb25zdCBpbml0aWFsaXplID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbml0aWFsaXplXCIpO1xuY29uc3QgZGlhbG9nU3F1YXJlcyA9IEFycmF5LmZyb20oXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZGlhbG9nLWJvYXJkIC5zcXVhcmVcIiksXG4pO1xuY29uc3QgcGxheWVyMVNxdWFyZXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYm9hcmQxIC5zcXVhcmVcIikpO1xuY29uc3QgcGxheWVyMlNxdWFyZXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYm9hcmQyIC5zcXVhcmVcIikpO1xuY29uc3Qgcm90YXRlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yb3RhdGVcIik7XG5jb25zdCBzaGlwTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcC1uYW1lXCIpO1xuXG5jb25zdCBnYW1lT3Zlck1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLW92ZXJcIik7XG5jb25zdCB3aW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbm5lclwiKTtcbmNvbnN0IHBsYXlBZ2FpbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheS1hZ2FpblwiKTtcblxubGV0IGRpcmVjdGlvbiA9IFswLCAxXTtcbmxldCBzaGlwTGVuZ3RocyA9IFsyLCAzLCAzLCA0LCA1XTtcbmxldCBzaGlwTmFtZXMgPSBbXCJQYXRyb2wgQm9hdFwiLCBcIlN1Ym1hcmluZVwiLCBcIkRlc3Ryb3llclwiLCBcIkJhdHRsZXNoaXBcIl07XG5sZXQgaGlnaGxpZ2h0ZWQgPSBbXTtcblxuY29uc3QgbW91c2VPdmVyU3F1YXJlID0gKGNvb3JkKSA9PiB7XG4gIGhpZ2hsaWdodGVkLmZvckVhY2goKGluZGV4KSA9PlxuICAgIGRpYWxvZ1NxdWFyZXNbaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoXCJ0ZW1wLWhpZ2hsaWdodFwiKSxcbiAgKTtcbiAgaGlnaGxpZ2h0ZWQgPSBbXTtcblxuICBjb25zdCBzaGlwTGVuZ3RoID0gc2hpcExlbmd0aHNbc2hpcExlbmd0aHMubGVuZ3RoIC0gMV07XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgbmV4dCA9IFtjb29yZFswXSArIGRpcmVjdGlvblswXSAqIGksIGNvb3JkWzFdICsgZGlyZWN0aW9uWzFdICogaV07XG4gICAgaWYgKG5leHRbMF0gPiA5IHx8IG5leHRbMV0gPiA5KSBicmVhaztcbiAgICBjb25zdCBpbmRleCA9IG5leHRbMF0gKiAxMCArIG5leHRbMV07XG4gICAgZGlhbG9nU3F1YXJlc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcInRlbXAtaGlnaGxpZ2h0XCIpO1xuICAgIGhpZ2hsaWdodGVkLnB1c2goaW5kZXgpO1xuICB9XG59O1xuXG5jb25zdCBjbGlja0RpYWxvZ1NxdWFyZSA9IChjb29yZCkgPT4ge1xuICBpZiAoXG4gICAgcGxhY2VJbml0aWFsU2hpcHMoc2hpcExlbmd0aHNbc2hpcExlbmd0aHMubGVuZ3RoIC0gMV0sIGNvb3JkLCBbXG4gICAgICBjb29yZFswXSArIGRpcmVjdGlvblswXSxcbiAgICAgIGNvb3JkWzFdICsgZGlyZWN0aW9uWzFdLFxuICAgIF0pXG4gICkge1xuICAgIGhpZ2hsaWdodGVkLmZvckVhY2goKGluZGV4KSA9PiB7XG4gICAgICBkaWFsb2dTcXVhcmVzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwiaGlnaGxpZ2h0XCIpO1xuICAgICAgcGxheWVyMVNxdWFyZXNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJoaWdobGlnaHRcIik7XG4gICAgfSk7XG4gICAgc2hpcExlbmd0aHMucG9wKCk7XG4gICAgaWYgKHNoaXBMZW5ndGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaW5pdGlhbGl6ZS5jbG9zZSgpO1xuICAgICAgcGxhY2VTaGlwc0FJKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5hbWUgPSBzaGlwTmFtZXMucG9wKCk7XG4gICAgc2hpcE5hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xuICB9XG59O1xuXG5kaWFsb2dTcXVhcmVzLmZvckVhY2goKHNxdWFyZSwgaW5kZXgpID0+IHtcbiAgY29uc3QgY29vcmQgPSBbTWF0aC5mbG9vcihpbmRleCAvIDEwKSwgaW5kZXggJSAxMF07XG5cbiAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT4gbW91c2VPdmVyU3F1YXJlKGNvb3JkKSk7XG4gIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gY2xpY2tEaWFsb2dTcXVhcmUoY29vcmQpKTtcbn0pO1xuXG5yb3RhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgaWYgKGRpcmVjdGlvblswXSA9PT0gMCkgZGlyZWN0aW9uID0gWzEsIDBdO1xuICBlbHNlIGRpcmVjdGlvbiA9IFswLCAxXTtcbn0pO1xuXG5jb25zdCBkaXNwbGF5V2lubmVyID0gKG1lc3NhZ2UpID0+IHtcbiAgd2lubmVyLnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgZ2FtZU92ZXJNb2RhbC5zaG93TW9kYWwoKTtcbn07XG5cbmNvbnN0IGFpQXR0YWNrID0gKCkgPT4ge1xuICBjb25zdCBjb29yZEhpdCA9IGF0dGFja1BsYXllcjEoKTtcbiAgY29uc3Qgc3F1YXJlSGl0ID0gcGxheWVyMVNxdWFyZXNbY29vcmRIaXRbMF0gKiAxMCArIGNvb3JkSGl0WzFdXTtcbiAgaWYgKHNxdWFyZUhpdC5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWdobGlnaHRcIikpIHtcbiAgICBzcXVhcmVIaXQuY2xhc3NMaXN0LnJlbW92ZShcImhpZ2hsaWdodFwiKTtcbiAgICBzcXVhcmVIaXQuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgfSBlbHNlIHtcbiAgICBzcXVhcmVIaXQuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XG4gIH1cbiAgaWYgKGlzUGxheWVyMldpbm5lcigpKSB7XG4gICAgZGlzcGxheVdpbm5lcihcIllvdSBsb3N0IVwiKTtcbiAgfVxufTtcblxuY29uc3QgcGxheWVyQXR0YWNrID0gKHNxdWFyZSwgY29vcmQpID0+IHtcbiAgaWYgKGF0dGFja1BsYXllcjIoY29vcmQpKSB7XG4gICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gIH0gZWxzZSBpZiAoIXNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaXRcIikpIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcblxuICBpZiAoaXNQbGF5ZXIxV2lubmVyKCkpIHtcbiAgICBkaXNwbGF5V2lubmVyKFwiWW91IHdvbiFcIik7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxucGxheWVyMlNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlLCBpbmRleCkgPT5cbiAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3QgY29vcmQgPSBbTWF0aC5mbG9vcihpbmRleCAvIDEwKSwgaW5kZXggJSAxMF07XG4gICAgaWYgKCFnZXRQbGF5ZXIxTm90QXR0YWNrZWQoKS5oYXMoSlNPTi5zdHJpbmdpZnkoY29vcmQpKSkgcmV0dXJuO1xuICAgIGlmIChwbGF5ZXJBdHRhY2soc3F1YXJlLCBjb29yZCkpIHJldHVybjtcblxuICAgIGFpQXR0YWNrKCk7XG4gIH0pLFxuKTtcblxuY29uc3QgY2xlYXJTcXVhcmUgPSAoc3F1YXJlKSA9PiB7XG4gIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKFwidGVtcC1oaWdobGlnaHRcIik7XG4gIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlnaGxpZ2h0XCIpO1xuICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcImhpdFwiKTtcbiAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJtaXNzXCIpO1xufTtcblxucGxheUFnYWluQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGdhbWVPdmVyTW9kYWwuY2xvc2UoKTtcbiAgZGlhbG9nU3F1YXJlcy5mb3JFYWNoKChzcXVhcmUsIGluZGV4KSA9PiB7XG4gICAgY2xlYXJTcXVhcmUoc3F1YXJlKTtcbiAgICBjbGVhclNxdWFyZShwbGF5ZXIxU3F1YXJlc1tpbmRleF0pO1xuICAgIGNsZWFyU3F1YXJlKHBsYXllcjJTcXVhcmVzW2luZGV4XSk7XG4gIH0pO1xuXG4gIHJlc3RhcnRHYW1lKCk7XG4gIGRpcmVjdGlvbiA9IFswLCAxXTtcbiAgc2hpcExlbmd0aHMgPSBbMiwgMywgMywgNCwgNV07XG4gIHNoaXBOYW1lcyA9IFtcIlBhdHJvbCBCb2F0XCIsIFwiU3VibWFyaW5lXCIsIFwiRGVzdHJveWVyXCIsIFwiQmF0dGxlc2hpcFwiXTtcbiAgaGlnaGxpZ2h0ZWQgPSBbXTtcblxuICBpbml0aWFsaXplLnNob3dNb2RhbCgpO1xufSk7XG5cbmluaXRpYWxpemUuc2hvd01vZGFsKCk7XG4iLCJjb25zdCBjcmVhdGVQbGF5ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IGF0dGFjayA9IChib2FyZCwgcG9zKSA9PiBib2FyZC5yZWNlaXZlQXR0YWNrKHBvcyk7XG4gIHJldHVybiB7IGF0dGFjayB9O1xufTtcblxuY29uc3QgY3JlYXRlUGxheWVyQUkgPSAoKSA9PiB7XG4gIC8vIFN0b3JlIHdoYXQgc2hpcHMgYXJlIHN0aWxsIGFsaXZlXG4gIGxldCBzaGlwQ29vcmQgPSBudWxsO1xuICBsZXQgc2hpcERpcmVjdGlvbiA9IG51bGw7XG4gIGxldCBkaXJlY3Rpb24gPSAxO1xuICBsZXQgc3RlcHMgPSAyO1xuICBsZXQgcG9zc2libGUgPSBbXG4gICAgWzAsIDFdLFxuICAgIFsxLCAwXSxcbiAgICBbMCwgLTFdLFxuICAgIFstMSwgMF0sXG4gIF07XG4gIGxldCBzaGlwTGVuZ3RoID0gMDtcbiAgY29uc3Qgc2hpcHNMZW5ndGggPSBbMCwgMCwgMSwgMiwgMSwgMV07XG5cbiAgY29uc3QgeyBhdHRhY2sgfSA9IGNyZWF0ZVBsYXllcigpO1xuICBjb25zdCBzaGlwU3VuayA9ICgpID0+IHtcbiAgICBzaGlwQ29vcmQgPSBudWxsO1xuICAgIHNoaXBEaXJlY3Rpb24gPSBudWxsO1xuICAgIGRpcmVjdGlvbiA9IDE7XG4gICAgc3RlcHMgPSAyO1xuICAgIHBvc3NpYmxlID0gW1xuICAgICAgWzAsIDFdLFxuICAgICAgWzEsIDBdLFxuICAgICAgWzAsIC0xXSxcbiAgICAgIFstMSwgMF0sXG4gICAgXTtcbiAgICBzaGlwc0xlbmd0aFtzaGlwTGVuZ3RoXSAtPSAxO1xuICAgIHNoaXBMZW5ndGggPSAwO1xuICB9O1xuXG4gIGNvbnN0IHZhbGlkYXRlU3F1YXJlID0gKHRvSGl0LCBib2FyZCkgPT5cbiAgICB0b0hpdFswXSA8PSA5ICYmXG4gICAgdG9IaXRbMF0gPj0gMCAmJlxuICAgIHRvSGl0WzFdIDw9IDkgJiZcbiAgICB0b0hpdFsxXSA+PSAwICYmXG4gICAgYm9hcmQubm90QXR0YWNrZWQuaGFzKEpTT04uc3RyaW5naWZ5KHRvSGl0KSk7XG5cbiAgY29uc3QgY2hlY2tGb3JMYXJnZXJTaGlwcyA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gc2hpcHNMZW5ndGgubGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC09IDEpIHtcbiAgICAgIGlmIChzaGlwTGVuZ3RoID09PSBpKSBzaGlwU3VuaygpO1xuICAgICAgaWYgKHNoaXBzTGVuZ3RoW2ldID4gMCkgcmV0dXJuO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhaUF0dGFjayA9IChib2FyZCkgPT4ge1xuICAgIGlmICghc2hpcENvb3JkKSB7XG4gICAgICBjb25zdCBub3RBdHRhY2tlZCA9IEFycmF5LmZyb20oYm9hcmQubm90QXR0YWNrZWQpO1xuICAgICAgY29uc3QgdG9IaXQgPSBKU09OLnBhcnNlKFxuICAgICAgICBub3RBdHRhY2tlZFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBub3RBdHRhY2tlZC5sZW5ndGgpXSxcbiAgICAgICk7XG4gICAgICBpZiAoYXR0YWNrKGJvYXJkLCB0b0hpdCkpIHtcbiAgICAgICAgc2hpcENvb3JkID0gdG9IaXQ7XG4gICAgICAgIHNoaXBMZW5ndGggKz0gMTtcbiAgICAgIH1cbiAgICAgIC8vIFRFU1RcbiAgICAgIC8vIGlmIChhdHRhY2soYm9hcmQsIFsxLCAwXSkpIHtcbiAgICAgIC8vICAgc2hpcENvb3JkID0gWzEsIDBdO1xuICAgICAgLy8gfVxuICAgICAgcmV0dXJuIHRvSGl0O1xuICAgIH1cbiAgICBpZiAoIXNoaXBEaXJlY3Rpb24pIHtcbiAgICAgIGxldCB2YWxpZFNxdWFyZSA9IGZhbHNlO1xuICAgICAgbGV0IHRvSGl0O1xuICAgICAgbGV0IGNoZWNrO1xuICAgICAgZG8ge1xuICAgICAgICBjaGVjayA9IHBvc3NpYmxlLnBvcCgpO1xuICAgICAgICB0b0hpdCA9IFtzaGlwQ29vcmRbMF0gKyBjaGVja1swXSwgc2hpcENvb3JkWzFdICsgY2hlY2tbMV1dO1xuICAgICAgICB2YWxpZFNxdWFyZSA9IHZhbGlkYXRlU3F1YXJlKHRvSGl0LCBib2FyZCk7XG4gICAgICB9IHdoaWxlICghdmFsaWRTcXVhcmUgJiYgcG9zc2libGUubGVuZ3RoICE9PSAwKTtcbiAgICAgIGlmICghdmFsaWRTcXVhcmUpIHtcbiAgICAgICAgc2hpcFN1bmsoKTtcbiAgICAgICAgcmV0dXJuIGFpQXR0YWNrKGJvYXJkKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGF0dGFjayhib2FyZCwgdG9IaXQpKSB7XG4gICAgICAgIHNoaXBEaXJlY3Rpb24gPSBjaGVjaztcbiAgICAgICAgc2hpcExlbmd0aCArPSAxO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdG9IaXQ7XG4gICAgfVxuICAgIGNvbnN0IHRvSGl0ID0gW1xuICAgICAgc2hpcENvb3JkWzBdICsgc2hpcERpcmVjdGlvblswXSAqIGRpcmVjdGlvbiAqIHN0ZXBzLFxuICAgICAgc2hpcENvb3JkWzFdICsgc2hpcERpcmVjdGlvblsxXSAqIGRpcmVjdGlvbiAqIHN0ZXBzLFxuICAgIF07XG5cbiAgICBpZiAodmFsaWRhdGVTcXVhcmUodG9IaXQsIGJvYXJkKSkge1xuICAgICAgaWYgKGF0dGFjayhib2FyZCwgdG9IaXQpKSB7XG4gICAgICAgIHN0ZXBzICs9IDE7XG4gICAgICAgIHNoaXBMZW5ndGggKz0gMTtcbiAgICAgICAgY2hlY2tGb3JMYXJnZXJTaGlwcygpO1xuICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IDEpIHtcbiAgICAgICAgZGlyZWN0aW9uID0gLTE7XG4gICAgICAgIHN0ZXBzID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNoaXBTdW5rKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG9IaXQ7XG4gICAgfVxuXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gMSkge1xuICAgICAgZGlyZWN0aW9uID0gLTE7XG4gICAgICBzdGVwcyA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNoaXBTdW5rKCk7XG4gICAgfVxuICAgIHJldHVybiBhaUF0dGFjayhib2FyZCk7XG4gIH07XG5cbiAgcmV0dXJuIHsgYWlBdHRhY2sgfTtcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZVBsYXllciwgY3JlYXRlUGxheWVyQUkgfTtcbiIsImNvbnN0IGNyZWF0ZVNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGxldCB0aW1lc0hpdCA9IDA7XG5cbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIHRpbWVzSGl0ICs9IDE7XG4gIH07XG5cbiAgLy8gQXNzdW1lIHNoaXAgd2lsbCBvbmx5IGJlIGhpdCBmb3IgYSBtYXhpbXVtIG9mIGxlbmd0aCB0aW1lcy5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4gdGltZXNIaXQgPT09IGxlbmd0aDtcblxuICByZXR1cm4geyBoaXQsIGlzU3VuayB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU2hpcDtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4xIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xuXG4vKiBEb2N1bWVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluIGlPUy5cbiAqL1xuXG5odG1sIHtcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXG59XG5cbi8qIFNlY3Rpb25zXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5ib2R5IHtcbiAgbWFyZ2luOiAwO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgXFxgbWFpblxcYCBlbGVtZW50IGNvbnNpc3RlbnRseSBpbiBJRS5cbiAqL1xuXG5tYWluIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgZm9udCBzaXplIGFuZCBtYXJnaW4gb24gXFxgaDFcXGAgZWxlbWVudHMgd2l0aGluIFxcYHNlY3Rpb25cXGAgYW5kXG4gKiBcXGBhcnRpY2xlXFxgIGNvbnRleHRzIGluIENocm9tZSwgRmlyZWZveCwgYW5kIFNhZmFyaS5cbiAqL1xuXG5oMSB7XG4gIGZvbnQtc2l6ZTogMmVtO1xuICBtYXJnaW46IDAuNjdlbSAwO1xufVxuXG4vKiBHcm91cGluZyBjb250ZW50XG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cbiAqL1xuXG5ociB7XG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94OyAvKiAxICovXG4gIGhlaWdodDogMDsgLyogMSAqL1xuICBvdmVyZmxvdzogdmlzaWJsZTsgLyogMiAqL1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgXFxgZW1cXGAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbnByZSB7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xufVxuXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdyYXkgYmFja2dyb3VuZCBvbiBhY3RpdmUgbGlua3MgaW4gSUUgMTAuXG4gKi9cblxuYSB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG4vKipcbiAqIDEuIFJlbW92ZSB0aGUgYm90dG9tIGJvcmRlciBpbiBDaHJvbWUgNTctXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdGV4dCBkZWNvcmF0aW9uIGluIENocm9tZSwgRWRnZSwgSUUsIE9wZXJhLCBhbmQgU2FmYXJpLlxuICovXG5cbmFiYnJbdGl0bGVdIHtcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTsgLyogMSAqL1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZSBkb3R0ZWQ7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxuICovXG5cbmIsXG5zdHJvbmcge1xuICBmb250LXdlaWdodDogYm9sZGVyO1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgXFxgZW1cXGAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbmNvZGUsXG5rYmQsXG5zYW1wIHtcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuc21hbGwge1xuICBmb250LXNpemU6IDgwJTtcbn1cblxuLyoqXG4gKiBQcmV2ZW50IFxcYHN1YlxcYCBhbmQgXFxgc3VwXFxgIGVsZW1lbnRzIGZyb20gYWZmZWN0aW5nIHRoZSBsaW5lIGhlaWdodCBpblxuICogYWxsIGJyb3dzZXJzLlxuICovXG5cbnN1YixcbnN1cCB7XG4gIGZvbnQtc2l6ZTogNzUlO1xuICBsaW5lLWhlaWdodDogMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XG59XG5cbnN1YiB7XG4gIGJvdHRvbTogLTAuMjVlbTtcbn1cblxuc3VwIHtcbiAgdG9wOiAtMC41ZW07XG59XG5cbi8qIEVtYmVkZGVkIGNvbnRlbnRcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBib3JkZXIgb24gaW1hZ2VzIGluc2lkZSBsaW5rcyBpbiBJRSAxMC5cbiAqL1xuXG5pbWcge1xuICBib3JkZXItc3R5bGU6IG5vbmU7XG59XG5cbi8qIEZvcm1zXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gUmVtb3ZlIHRoZSBtYXJnaW4gaW4gRmlyZWZveCBhbmQgU2FmYXJpLlxuICovXG5cbmJ1dHRvbixcbmlucHV0LFxub3B0Z3JvdXAsXG5zZWxlY3QsXG50ZXh0YXJlYSB7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0OyAvKiAxICovXG4gIGZvbnQtc2l6ZTogMTAwJTsgLyogMSAqL1xuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xuICBtYXJnaW46IDA7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBTaG93IHRoZSBvdmVyZmxvdyBpbiBJRS5cbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXG4gKi9cblxuYnV0dG9uLFxuaW5wdXQgeyAvKiAxICovXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxuICovXG5cbmJ1dHRvbixcbnNlbGVjdCB7IC8qIDEgKi9cbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cbiAqL1xuXG5idXR0b24sXG5bdHlwZT1cImJ1dHRvblwiXSxcblt0eXBlPVwicmVzZXRcIl0sXG5bdHlwZT1cInN1Ym1pdFwiXSB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uO1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXG4gKi9cblxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxuW3R5cGU9XCJidXR0b25cIl06Oi1tb3otZm9jdXMtaW5uZXIsXG5bdHlwZT1cInJlc2V0XCJdOjotbW96LWZvY3VzLWlubmVyLFxuW3R5cGU9XCJzdWJtaXRcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xuICBib3JkZXItc3R5bGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi8qKlxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxuICovXG5cbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcblt0eXBlPVwiYnV0dG9uXCJdOi1tb3otZm9jdXNyaW5nLFxuW3R5cGU9XCJyZXNldFwiXTotbW96LWZvY3VzcmluZyxcblt0eXBlPVwic3VibWl0XCJdOi1tb3otZm9jdXNyaW5nIHtcbiAgb3V0bGluZTogMXB4IGRvdHRlZCBCdXR0b25UZXh0O1xufVxuXG4vKipcbiAqIENvcnJlY3QgdGhlIHBhZGRpbmcgaW4gRmlyZWZveC5cbiAqL1xuXG5maWVsZHNldCB7XG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSB0ZXh0IHdyYXBwaW5nIGluIEVkZ2UgYW5kIElFLlxuICogMi4gQ29ycmVjdCB0aGUgY29sb3IgaW5oZXJpdGFuY2UgZnJvbSBcXGBmaWVsZHNldFxcYCBlbGVtZW50cyBpbiBJRS5cbiAqIDMuIFJlbW92ZSB0aGUgcGFkZGluZyBzbyBkZXZlbG9wZXJzIGFyZSBub3QgY2F1Z2h0IG91dCB3aGVuIHRoZXkgemVybyBvdXRcbiAqICAgIFxcYGZpZWxkc2V0XFxgIGVsZW1lbnRzIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5sZWdlbmQge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXG4gIGRpc3BsYXk6IHRhYmxlOyAvKiAxICovXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xuICBwYWRkaW5nOiAwOyAvKiAzICovXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7IC8qIDEgKi9cbn1cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxuICovXG5cbnByb2dyZXNzIHtcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xufVxuXG4vKipcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUgMTArLlxuICovXG5cbnRleHRhcmVhIHtcbiAgb3ZlcmZsb3c6IGF1dG87XG59XG5cbi8qKlxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gSUUgMTAuXG4gKiAyLiBSZW1vdmUgdGhlIHBhZGRpbmcgaW4gSUUgMTAuXG4gKi9cblxuW3R5cGU9XCJjaGVja2JveFwiXSxcblt0eXBlPVwicmFkaW9cIl0ge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBjdXJzb3Igc3R5bGUgb2YgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgYnV0dG9ucyBpbiBDaHJvbWUuXG4gKi9cblxuW3R5cGU9XCJudW1iZXJcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXG5bdHlwZT1cIm51bWJlclwiXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XG4gIGhlaWdodDogYXV0bztcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cbiAqIDIuIENvcnJlY3QgdGhlIG91dGxpbmUgc3R5bGUgaW4gU2FmYXJpLlxuICovXG5cblt0eXBlPVwic2VhcmNoXCJdIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cbiAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXG4gKi9cblxuW3R5cGU9XCJzZWFyY2hcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gXFxgaW5oZXJpdFxcYCBpbiBTYWZhcmkuXG4gKi9cblxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAxICovXG4gIGZvbnQ6IGluaGVyaXQ7IC8qIDIgKi9cbn1cblxuLyogSW50ZXJhY3RpdmVcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSAxMCssIGFuZCBGaXJlZm94LlxuICovXG5cbmRldGFpbHMge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLypcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5zdW1tYXJ5IHtcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xufVxuXG4vKiBNaXNjXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwKy5cbiAqL1xuXG50ZW1wbGF0ZSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAuXG4gKi9cblxuW2hpZGRlbl0ge1xuICBkaXNwbGF5OiBub25lO1xufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLDJFQUEyRTs7QUFFM0U7K0VBQytFOztBQUUvRTs7O0VBR0U7O0FBRUY7RUFDRSxpQkFBaUIsRUFBRSxNQUFNO0VBQ3pCLDhCQUE4QixFQUFFLE1BQU07QUFDeEM7O0FBRUE7K0VBQytFOztBQUUvRTs7RUFFRTs7QUFFRjtFQUNFLFNBQVM7QUFDWDs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsY0FBYztFQUNkLGdCQUFnQjtBQUNsQjs7QUFFQTsrRUFDK0U7O0FBRS9FOzs7RUFHRTs7QUFFRjtFQUNFLHVCQUF1QixFQUFFLE1BQU07RUFDL0IsU0FBUyxFQUFFLE1BQU07RUFDakIsaUJBQWlCLEVBQUUsTUFBTTtBQUMzQjs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSxpQ0FBaUMsRUFBRSxNQUFNO0VBQ3pDLGNBQWMsRUFBRSxNQUFNO0FBQ3hCOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSw2QkFBNkI7QUFDL0I7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsbUJBQW1CLEVBQUUsTUFBTTtFQUMzQiwwQkFBMEIsRUFBRSxNQUFNO0VBQ2xDLGlDQUFpQyxFQUFFLE1BQU07QUFDM0M7O0FBRUE7O0VBRUU7O0FBRUY7O0VBRUUsbUJBQW1CO0FBQ3JCOztBQUVBOzs7RUFHRTs7QUFFRjs7O0VBR0UsaUNBQWlDLEVBQUUsTUFBTTtFQUN6QyxjQUFjLEVBQUUsTUFBTTtBQUN4Qjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7OztFQUdFOztBQUVGOztFQUVFLGNBQWM7RUFDZCxjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7K0VBQytFOztBQUUvRTs7RUFFRTs7QUFFRjtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTsrRUFDK0U7O0FBRS9FOzs7RUFHRTs7QUFFRjs7Ozs7RUFLRSxvQkFBb0IsRUFBRSxNQUFNO0VBQzVCLGVBQWUsRUFBRSxNQUFNO0VBQ3ZCLGlCQUFpQixFQUFFLE1BQU07RUFDekIsU0FBUyxFQUFFLE1BQU07QUFDbkI7O0FBRUE7OztFQUdFOztBQUVGO1FBQ1EsTUFBTTtFQUNaLGlCQUFpQjtBQUNuQjs7QUFFQTs7O0VBR0U7O0FBRUY7U0FDUyxNQUFNO0VBQ2Isb0JBQW9CO0FBQ3RCOztBQUVBOztFQUVFOztBQUVGOzs7O0VBSUUsMEJBQTBCO0FBQzVCOztBQUVBOztFQUVFOztBQUVGOzs7O0VBSUUsa0JBQWtCO0VBQ2xCLFVBQVU7QUFDWjs7QUFFQTs7RUFFRTs7QUFFRjs7OztFQUlFLDhCQUE4QjtBQUNoQzs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLDhCQUE4QjtBQUNoQzs7QUFFQTs7Ozs7RUFLRTs7QUFFRjtFQUNFLHNCQUFzQixFQUFFLE1BQU07RUFDOUIsY0FBYyxFQUFFLE1BQU07RUFDdEIsY0FBYyxFQUFFLE1BQU07RUFDdEIsZUFBZSxFQUFFLE1BQU07RUFDdkIsVUFBVSxFQUFFLE1BQU07RUFDbEIsbUJBQW1CLEVBQUUsTUFBTTtBQUM3Qjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLHdCQUF3QjtBQUMxQjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7OztFQUdFOztBQUVGOztFQUVFLHNCQUFzQixFQUFFLE1BQU07RUFDOUIsVUFBVSxFQUFFLE1BQU07QUFDcEI7O0FBRUE7O0VBRUU7O0FBRUY7O0VBRUUsWUFBWTtBQUNkOztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLDZCQUE2QixFQUFFLE1BQU07RUFDckMsb0JBQW9CLEVBQUUsTUFBTTtBQUM5Qjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLHdCQUF3QjtBQUMxQjs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSwwQkFBMEIsRUFBRSxNQUFNO0VBQ2xDLGFBQWEsRUFBRSxNQUFNO0FBQ3ZCOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOztFQUVFOztBQUVGO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxhQUFhO0FBQ2ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4xIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xcblxcbi8qIERvY3VtZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXFxuICovXFxuXFxuaHRtbCB7XFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXFxufVxcblxcbi8qIFNlY3Rpb25zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlbmRlciB0aGUgYG1haW5gIGVsZW1lbnQgY29uc2lzdGVudGx5IGluIElFLlxcbiAqL1xcblxcbm1haW4ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcXG59XFxuXFxuLyogR3JvdXBpbmcgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cXG4gKi9cXG5cXG5ociB7XFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xcbiAgaGVpZ2h0OiAwOyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5wcmUge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi8qKlxcbiAqIDEuIFJlbW92ZSB0aGUgYm90dG9tIGJvcmRlciBpbiBDaHJvbWUgNTctXFxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5hYmJyW3RpdGxlXSB7XFxuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYixcXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuY29kZSxcXG5rYmQsXFxuc2FtcCB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnNtYWxsIHtcXG4gIGZvbnQtc2l6ZTogODAlO1xcbn1cXG5cXG4vKipcXG4gKiBQcmV2ZW50IGBzdWJgIGFuZCBgc3VwYCBlbGVtZW50cyBmcm9tIGFmZmVjdGluZyB0aGUgbGluZSBoZWlnaHQgaW5cXG4gKiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3ViLFxcbnN1cCB7XFxuICBmb250LXNpemU6IDc1JTtcXG4gIGxpbmUtaGVpZ2h0OiAwO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG5zdWIge1xcbiAgYm90dG9tOiAtMC4yNWVtO1xcbn1cXG5cXG5zdXAge1xcbiAgdG9wOiAtMC41ZW07XFxufVxcblxcbi8qIEVtYmVkZGVkIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAuXFxuICovXFxuXFxuaW1nIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG59XFxuXFxuLyogRm9ybXNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQsXFxub3B0Z3JvdXAsXFxuc2VsZWN0LFxcbnRleHRhcmVhIHtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0OyAvKiAxICovXFxuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICBtYXJnaW46IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXFxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQgeyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXFxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbixcXG5zZWxlY3QgeyAvKiAxICovXFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lciB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZXN0b3JlIHRoZSBmb2N1cyBzdHlsZXMgdW5zZXQgYnkgdGhlIHByZXZpb3VzIHJ1bGUuXFxuICovXFxuXFxuYnV0dG9uOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06LW1vei1mb2N1c3Jpbmcge1xcbiAgb3V0bGluZTogMXB4IGRvdHRlZCBCdXR0b25UZXh0O1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuZmllbGRzZXQge1xcbiAgcGFkZGluZzogMC4zNWVtIDAuNzVlbSAwLjYyNWVtO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSB0ZXh0IHdyYXBwaW5nIGluIEVkZ2UgYW5kIElFLlxcbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBJRS5cXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XFxuICogICAgYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxubGVnZW5kIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXFxuICBkaXNwbGF5OiB0YWJsZTsgLyogMSAqL1xcbiAgbWF4LXdpZHRoOiAxMDAlOyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAzICovXFxuICB3aGl0ZS1zcGFjZTogbm9ybWFsOyAvKiAxICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXFxuICovXFxuXFxucHJvZ3Jlc3Mge1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGRlZmF1bHQgdmVydGljYWwgc2Nyb2xsYmFyIGluIElFIDEwKy5cXG4gKi9cXG5cXG50ZXh0YXJlYSB7XFxuICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gSUUgMTAuXFxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLlxcbiAqL1xcblxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxcbiAqL1xcblxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvdXRsaW5lIHN0eWxlIGluIFNhZmFyaS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4OyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgcGFkZGluZyBpbiBDaHJvbWUgYW5kIFNhZmFyaSBvbiBtYWNPUy5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cXG4gKi9cXG5cXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAxICovXFxuICBmb250OiBpbmhlcml0OyAvKiAyICovXFxufVxcblxcbi8qIEludGVyYWN0aXZlXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIEVkZ2UsIElFIDEwKywgYW5kIEZpcmVmb3guXFxuICovXFxuXFxuZGV0YWlscyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3VtbWFyeSB7XFxuICBkaXNwbGF5OiBsaXN0LWl0ZW07XFxufVxcblxcbi8qIE1pc2NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwKy5cXG4gKi9cXG5cXG50ZW1wbGF0ZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC5cXG4gKi9cXG5cXG5baGlkZGVuXSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYDpyb290IHtcbiAgZm9udC1zaXplOiAxdnc7XG59XG5cbmh0bWwge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBmb250LWZhbWlseTogUm9ib3RvLCBzeXN0ZW0tdWksIFwiU2Vnb2UgVUlcIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZixcbiAgICBcIkFwcGxlIENvbG9yIEVtb2ppXCIsIFwiU2Vnb2UgVUkgRW1vamlcIiwgXCJTZWdvZSBVSSBTeW1ib2xcIjtcbn1cblxuKixcbio6OmJlZm9yZSxcbio6OmFmdGVyIHtcbiAgYm94LXNpemluZzogaW5oZXJpdDtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBib3JkZXI6IG5vbmU7XG59XG5cbmgxIHtcbiAgLyogVG8gb3ZlcnJpZGUgTm9ybWFsaXplLmNzcyBoMSBtYXJnaW4gKi9cbiAgbWFyZ2luOiAwO1xufVxuXG5ib2R5IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnI7XG4gIGhlaWdodDogMTAwdmg7XG59XG5cbi5ib2FyZHMge1xuICBwYWRkaW5nOiAyLjVyZW07XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjUwcHgsIDFmcikpO1xuICBjb2x1bW4tZ2FwOiAyLjVyZW07XG4gIHJvdy1nYXA6IDUwcHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5ib2FyZDEsXG4uYm9hcmQyLFxuLmRpYWxvZy1ib2FyZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xufVxuXG4ucm93IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgxcHgsIDFmcikpO1xufVxuXG4uc3F1YXJlIHtcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gIGFzcGVjdC1yYXRpbzogMTtcbn1cblxuLmJvYXJkMiAuc3F1YXJlOm5vdCgubWlzcywgLmhpdCkge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbmRpYWxvZ1tvcGVuXSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdhcDogMjVweDtcbiAgcGFkZGluZzogMnJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xufVxuXG4ucm90YXRlLFxuLnBsYXktYWdhaW4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiAxMHB4IDI1cHg7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ud2lubmVyIHtcbiAgZm9udC1zaXplOiA0OHB4O1xufVxuXG4ucGxheS1hZ2FpbiB7XG4gIGZvbnQtc2l6ZTogMzJweDtcbn1cblxuLnJvdGF0ZTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44KTtcbn1cblxuLnRlbXAtaGlnaGxpZ2h0LFxuLmhpZ2hsaWdodCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSk7XG59XG5cbi5kaWFsb2ctYm9hcmQgLnNxdWFyZTpub3QoLmhpZ2hsaWdodCkge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5oaXQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbi5taXNzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XG59XG5cbi5yaWdodCxcbi5sZWZ0IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ2FwOiAxMHB4O1xufVxuXG4uYm9hcmQtdGl0bGUge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCOzREQUMwRDtBQUM1RDs7QUFFQTs7O0VBR0UsbUJBQW1CO0VBQ25CLFVBQVU7RUFDVixTQUFTO0VBQ1QsWUFBWTtBQUNkOztBQUVBO0VBQ0Usd0NBQXdDO0VBQ3hDLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsYUFBYTtBQUNmOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGFBQWE7RUFDYiwyREFBMkQ7RUFDM0Qsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixtQkFBbUI7QUFDckI7O0FBRUE7OztFQUdFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYix5REFBeUQ7QUFDM0Q7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsUUFBUTtFQUNSLFNBQVM7RUFDVCxnQ0FBZ0M7RUFDaEMsYUFBYTtFQUNiLFNBQVM7RUFDVCxhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLG1CQUFtQjtBQUNyQjs7QUFFQTs7RUFFRSx1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2Ysb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxvQ0FBb0M7QUFDdEM7O0FBRUE7O0VBRUUscUNBQXFDO0FBQ3ZDOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTs7RUFFRSxhQUFhO0VBQ2IsU0FBUztBQUNYOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXG4gIGZvbnQtc2l6ZTogMXZ3O1xcbn1cXG5cXG5odG1sIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBmb250LWZhbWlseTogUm9ib3RvLCBzeXN0ZW0tdWksIFxcXCJTZWdvZSBVSVxcXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYsXFxuICAgIFxcXCJBcHBsZSBDb2xvciBFbW9qaVxcXCIsIFxcXCJTZWdvZSBVSSBFbW9qaVxcXCIsIFxcXCJTZWdvZSBVSSBTeW1ib2xcXFwiO1xcbn1cXG5cXG4qLFxcbio6OmJlZm9yZSxcXG4qOjphZnRlciB7XFxuICBib3gtc2l6aW5nOiBpbmhlcml0O1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJvcmRlcjogbm9uZTtcXG59XFxuXFxuaDEge1xcbiAgLyogVG8gb3ZlcnJpZGUgTm9ybWFsaXplLmNzcyBoMSBtYXJnaW4gKi9cXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuYm9keSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnI7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbn1cXG5cXG4uYm9hcmRzIHtcXG4gIHBhZGRpbmc6IDIuNXJlbTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDI1MHB4LCAxZnIpKTtcXG4gIGNvbHVtbi1nYXA6IDIuNXJlbTtcXG4gIHJvdy1nYXA6IDUwcHg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmQxLFxcbi5ib2FyZDIsXFxuLmRpYWxvZy1ib2FyZCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLnJvdyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgxcHgsIDFmcikpO1xcbn1cXG5cXG4uc3F1YXJlIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYXNwZWN0LXJhdGlvOiAxO1xcbn1cXG5cXG4uYm9hcmQyIC5zcXVhcmU6bm90KC5taXNzLCAuaGl0KSB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbmRpYWxvZ1tvcGVuXSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogMjVweDtcXG4gIHBhZGRpbmc6IDJyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbn1cXG5cXG4ucm90YXRlLFxcbi5wbGF5LWFnYWluIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogMTBweCAyNXB4O1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi53aW5uZXIge1xcbiAgZm9udC1zaXplOiA0OHB4O1xcbn1cXG5cXG4ucGxheS1hZ2FpbiB7XFxuICBmb250LXNpemU6IDMycHg7XFxufVxcblxcbi5yb3RhdGU6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjgpO1xcbn1cXG5cXG4udGVtcC1oaWdobGlnaHQsXFxuLmhpZ2hsaWdodCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNzUpO1xcbn1cXG5cXG4uZGlhbG9nLWJvYXJkIC5zcXVhcmU6bm90KC5oaWdobGlnaHQpIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxufVxcblxcbi5taXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xcbn1cXG5cXG4ucmlnaHQsXFxuLmxlZnQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogMTBweDtcXG59XFxuXFxuLmJvYXJkLXRpdGxlIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ub3JtYWxpemUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL25vcm1hbGl6ZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJjcmVhdGVQbGF5ZXIiLCJjcmVhdGVQbGF5ZXJBSSIsImNyZWF0ZUdhbWVCb2FyZCIsInBsYXllcjEiLCJwbGF5ZXIxQm9hcmQiLCJwbGF5ZXIyIiwicGxheWVyMkJvYXJkIiwicGxhY2VJbml0aWFsU2hpcHMiLCJsZW5ndGgiLCJwb3MxIiwicG9zMiIsInBsYWNlU2hpcCIsInBsYWNlU2hpcEFJIiwicGxhY2VTaGlwc0FJIiwic2hpcExlbmd0aCIsImZvckVhY2giLCJmbGFnIiwiY29vcmQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJhdHRhY2tQbGF5ZXIyIiwicG9zIiwiYXR0YWNrIiwiYXR0YWNrUGxheWVyMSIsImFpQXR0YWNrIiwiZ2V0UGxheWVyMU5vdEF0dGFja2VkIiwibm90QXR0YWNrZWQiLCJnZXRQbGF5ZXIyTm90QXR0YWNrZWQiLCJpc1BsYXllcjFXaW5uZXIiLCJjaGVja0FsbFNoaXBzU3VuayIsImlzUGxheWVyMldpbm5lciIsInJlc3RhcnRHYW1lIiwiY3JlYXRlU2hpcCIsInNoaXBzQ29vcmRpbmF0ZXMiLCJhdHRhY2tzIiwiU2V0IiwiaW5pdGlhbGl6ZU5vdEF0dGFja2VkIiwic2l6ZSIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImkiLCJqIiwiYWRkIiwiY2hlY2tWYWxpZFNoaXBQbGFjZW1lbnQiLCJjb29yZHMiLCJldmVyeSIsIngiLCJ5IiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwieDEiLCJ5MSIsIngyIiwieTIiLCJkeCIsImR5IiwicHVzaCIsInNoaXAiLCJyZWNlaXZlQXR0YWNrIiwicG9zU3RyaW5naWZ5IiwiZGVsZXRlIiwiaGl0IiwiT2JqZWN0Iiwia2V5cyIsImluaXRpYWxpemUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJkaWFsb2dTcXVhcmVzIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsInBsYXllcjFTcXVhcmVzIiwicGxheWVyMlNxdWFyZXMiLCJyb3RhdGVCdXR0b24iLCJzaGlwTmFtZSIsImdhbWVPdmVyTW9kYWwiLCJ3aW5uZXIiLCJwbGF5QWdhaW5CdXR0b24iLCJkaXJlY3Rpb24iLCJzaGlwTGVuZ3RocyIsInNoaXBOYW1lcyIsImhpZ2hsaWdodGVkIiwibW91c2VPdmVyU3F1YXJlIiwiaW5kZXgiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJuZXh0IiwiY2xpY2tEaWFsb2dTcXVhcmUiLCJwb3AiLCJjbG9zZSIsIm5hbWUiLCJ0ZXh0Q29udGVudCIsInNxdWFyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJkaXNwbGF5V2lubmVyIiwibWVzc2FnZSIsInNob3dNb2RhbCIsImNvb3JkSGl0Iiwic3F1YXJlSGl0IiwiY29udGFpbnMiLCJwbGF5ZXJBdHRhY2siLCJoYXMiLCJjbGVhclNxdWFyZSIsImJvYXJkIiwic2hpcENvb3JkIiwic2hpcERpcmVjdGlvbiIsInN0ZXBzIiwicG9zc2libGUiLCJzaGlwc0xlbmd0aCIsInNoaXBTdW5rIiwidmFsaWRhdGVTcXVhcmUiLCJ0b0hpdCIsImNoZWNrRm9yTGFyZ2VyU2hpcHMiLCJ2YWxpZFNxdWFyZSIsImNoZWNrIiwidGltZXNIaXQiLCJpc1N1bmsiXSwic291cmNlUm9vdCI6IiJ9