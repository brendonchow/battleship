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

.dialog-board .square {
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
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,cAAc;AAChB;;AAEA;EACE,sBAAsB;EACtB;4DAC0D;AAC5D;;AAEA;;;EAGE,mBAAmB;EACnB,UAAU;EACV,SAAS;EACT,YAAY;AACd;;AAEA;EACE,wCAAwC;EACxC,SAAS;AACX;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,aAAa;AACf;;AAEA;EACE,eAAe;EACf,aAAa;EACb,2DAA2D;EAC3D,kBAAkB;EAClB,aAAa;EACb,mBAAmB;AACrB;;AAEA;;;EAGE,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,yDAAyD;AAC3D;;AAEA;EACE,uBAAuB;EACvB,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,aAAa;EACb,SAAS;EACT,aAAa;EACb,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;;EAEE,uBAAuB;EACvB,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,oBAAoB;EACpB,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,oCAAoC;AACtC;;AAEA;;EAEE,qCAAqC;AACvC;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;;EAEE,aAAa;EACb,SAAS;AACX;;AAEA;EACE,kBAAkB;AACpB","sourcesContent":[":root {\n  font-size: 1vw;\n}\n\nhtml {\n  box-sizing: border-box;\n  font-family: Roboto, system-ui, \"Segoe UI\", Helvetica, Arial, sans-serif,\n    \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: inherit;\n  padding: 0;\n  margin: 0;\n  border: none;\n}\n\nh1 {\n  /* To override Normalize.css h1 margin */\n  margin: 0;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: 1fr;\n  height: 100vh;\n}\n\n.boards {\n  padding: 2.5rem;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  column-gap: 2.5rem;\n  row-gap: 50px;\n  align-items: center;\n}\n\n.board1,\n.board2,\n.dialog-board {\n  border: 1px solid black;\n}\n\n.row {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));\n}\n\n.square {\n  border: 1px solid black;\n  aspect-ratio: 1;\n}\n\ndialog[open] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  display: grid;\n  gap: 25px;\n  padding: 2rem;\n  text-align: center;\n  border-radius: 10px;\n}\n\n.rotate,\n.play-again {\n  background-color: black;\n  color: white;\n  padding: 10px 25px;\n  font-size: 20px;\n  justify-self: center;\n  border-radius: 5px;\n  cursor: pointer;\n}\n\n.winner {\n  font-size: 48px;\n}\n\n.play-again {\n  font-size: 32px;\n}\n\n.rotate:hover {\n  background-color: rgba(0, 0, 0, 0.8);\n}\n\n.temp-highlight,\n.highlight {\n  background-color: rgba(0, 0, 0, 0.75);\n}\n\n.dialog-board .square {\n  cursor: pointer;\n}\n\n.hit {\n  background-color: red;\n}\n\n.miss {\n  background-color: green;\n}\n\n.right,\n.left {\n  display: grid;\n  gap: 10px;\n}\n\n.board-title {\n  text-align: center;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3M/MzQyZiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlUGxheWVyLCBjcmVhdGVQbGF5ZXJBSSB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IGNyZWF0ZUdhbWVCb2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxubGV0IHBsYXllcjEgPSBjcmVhdGVQbGF5ZXIoKTtcbmxldCBwbGF5ZXIxQm9hcmQgPSBjcmVhdGVHYW1lQm9hcmQoKTtcbmxldCBwbGF5ZXIyID0gY3JlYXRlUGxheWVyQUkoKTtcbmxldCBwbGF5ZXIyQm9hcmQgPSBjcmVhdGVHYW1lQm9hcmQoKTtcblxuY29uc3QgcGxhY2VJbml0aWFsU2hpcHMgPSAobGVuZ3RoLCBwb3MxLCBwb3MyKSA9PlxuICBwbGF5ZXIxQm9hcmQucGxhY2VTaGlwKGxlbmd0aCwgcG9zMSwgcG9zMik7XG5cbmNvbnN0IHBsYWNlU2hpcEFJID0gKGxlbmd0aCwgcG9zMSwgcG9zMikgPT5cbiAgcGxheWVyMkJvYXJkLnBsYWNlU2hpcChsZW5ndGgsIHBvczEsIHBvczIpO1xuXG5jb25zdCBwbGFjZVNoaXBzQUkgPSAoKSA9PiB7XG4gIGNvbnN0IHNoaXBMZW5ndGggPSBbMiwgMywgMywgNCwgNV07XG4gIHNoaXBMZW5ndGguZm9yRWFjaCgobGVuZ3RoKSA9PiB7XG4gICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICBkbyB7XG4gICAgICBjb25zdCBjb29yZCA9IFtcbiAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLFxuICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCksXG4gICAgICBdO1xuICAgICAgaWYgKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpKSB7XG4gICAgICAgIGZsYWcgPSBwbGFjZVNoaXBBSShsZW5ndGgsIGNvb3JkLCBbY29vcmRbMF0gKyAwLCBjb29yZFsxXSArIDFdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZsYWcgPSBwbGFjZVNoaXBBSShsZW5ndGgsIGNvb3JkLCBbY29vcmRbMF0gKyAxLCBjb29yZFsxXSArIDBdKTtcbiAgICAgIH1cbiAgICB9IHdoaWxlICghZmxhZyk7XG4gIH0pO1xufTtcblxuY29uc3QgYXR0YWNrUGxheWVyMiA9IChwb3MpID0+IHBsYXllcjEuYXR0YWNrKHBsYXllcjJCb2FyZCwgcG9zKTtcblxuY29uc3QgYXR0YWNrUGxheWVyMSA9ICgpID0+IHBsYXllcjIuYWlBdHRhY2socGxheWVyMUJvYXJkKTtcblxuY29uc3QgZ2V0UGxheWVyMU5vdEF0dGFja2VkID0gKCkgPT4gcGxheWVyMkJvYXJkLm5vdEF0dGFja2VkO1xuXG5jb25zdCBnZXRQbGF5ZXIyTm90QXR0YWNrZWQgPSAoKSA9PiBwbGF5ZXIxQm9hcmQubm90QXR0YWNrZWQ7XG5cbmNvbnN0IGlzUGxheWVyMVdpbm5lciA9ICgpID0+IHBsYXllcjJCb2FyZC5jaGVja0FsbFNoaXBzU3VuaygpO1xuXG5jb25zdCBpc1BsYXllcjJXaW5uZXIgPSAoKSA9PiBwbGF5ZXIxQm9hcmQuY2hlY2tBbGxTaGlwc1N1bmsoKTtcblxuY29uc3QgcmVzdGFydEdhbWUgPSAoKSA9PiB7XG4gIHBsYXllcjEgPSBjcmVhdGVQbGF5ZXIoKTtcbiAgcGxheWVyMUJvYXJkID0gY3JlYXRlR2FtZUJvYXJkKCk7XG4gIHBsYXllcjIgPSBjcmVhdGVQbGF5ZXJBSSgpO1xuICBwbGF5ZXIyQm9hcmQgPSBjcmVhdGVHYW1lQm9hcmQoKTtcbn07XG5cbmV4cG9ydCB7XG4gIHBsYWNlSW5pdGlhbFNoaXBzLFxuICBwbGFjZVNoaXBzQUksXG4gIGF0dGFja1BsYXllcjIsXG4gIGF0dGFja1BsYXllcjEsXG4gIGdldFBsYXllcjFOb3RBdHRhY2tlZCxcbiAgZ2V0UGxheWVyMk5vdEF0dGFja2VkLFxuICBpc1BsYXllcjFXaW5uZXIsXG4gIGlzUGxheWVyMldpbm5lcixcbiAgcmVzdGFydEdhbWVcbn07XG4iLCJpbXBvcnQgY3JlYXRlU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmNvbnN0IGNyZWF0ZUdhbWVCb2FyZCA9ICgpID0+IHtcbiAgY29uc3Qgc2hpcHNDb29yZGluYXRlcyA9IHt9O1xuICBjb25zdCBhdHRhY2tzID0gbmV3IFNldCgpO1xuXG4gIGNvbnN0IGluaXRpYWxpemVOb3RBdHRhY2tlZCA9IChzaXplID0gMTApID0+IHtcbiAgICBjb25zdCBub3RBdHRhY2tlZCA9IG5ldyBTZXQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaXplOyBqICs9IDEpIHtcbiAgICAgICAgbm90QXR0YWNrZWQuYWRkKGBbJHtpfSwke2p9XWApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm90QXR0YWNrZWQ7XG4gIH07XG5cbiAgY29uc3Qgbm90QXR0YWNrZWQgPSBpbml0aWFsaXplTm90QXR0YWNrZWQoKTtcblxuICBjb25zdCBjaGVja1ZhbGlkU2hpcFBsYWNlbWVudCA9IChjb29yZHMpID0+XG4gICAgY29vcmRzLmV2ZXJ5KChwb3MpID0+IHtcbiAgICAgIGNvbnN0IFt4LCB5XSA9IEpTT04ucGFyc2UocG9zKTtcbiAgICAgIGlmICh4ID4gOSB8fCB4IDwgMCB8fCB5ID4gOSB8fCB5IDwgMCkgcmV0dXJuIGZhbHNlO1xuICAgICAgZm9yIChsZXQgaSA9IHggLSAxOyBpIDw9IHggKyAxOyBpICs9IDEpIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IHkgLSAxOyBqIDw9IHkgKyAxOyBqICs9IDEpIHtcbiAgICAgICAgICBpZiAoc2hpcHNDb29yZGluYXRlc1tKU09OLnN0cmluZ2lmeShbaSwgal0pXSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcblxuICAvLyBwb3Mgd2lsbCBiZSBhIEpTT04uc3RyaW5naWZpZWQgW3gsIHldXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChsZW5ndGgsIHBvczEsIHBvczIpID0+IHtcbiAgICBjb25zdCBjb29yZHMgPSBbSlNPTi5zdHJpbmdpZnkocG9zMSldO1xuXG4gICAgaWYgKHBvczIpIHtcbiAgICAgIGNvbnN0IFt4MSwgeTFdID0gcG9zMTtcbiAgICAgIGNvbnN0IFt4MiwgeTJdID0gcG9zMjtcbiAgICAgIGNvbnN0IFtkeCwgZHldID0gW3gyIC0geDEsIHkyIC0geTFdO1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb29yZHMucHVzaChKU09OLnN0cmluZ2lmeShbeDEgKyBkeCAqIGksIHkxICsgZHkgKiBpXSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghY2hlY2tWYWxpZFNoaXBQbGFjZW1lbnQoY29vcmRzKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3Qgc2hpcCA9IGNyZWF0ZVNoaXAobGVuZ3RoKTtcbiAgICBjb29yZHMuZm9yRWFjaCgocG9zKSA9PiB7XG4gICAgICBzaGlwc0Nvb3JkaW5hdGVzW3Bvc10gPSBzaGlwO1xuICAgIH0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocG9zKSA9PiB7XG4gICAgY29uc3QgcG9zU3RyaW5naWZ5ID0gSlNPTi5zdHJpbmdpZnkocG9zKTtcbiAgICBjb25zdCBzaGlwID0gc2hpcHNDb29yZGluYXRlc1twb3NTdHJpbmdpZnldO1xuXG4gICAgYXR0YWNrcy5hZGQocG9zU3RyaW5naWZ5KTtcbiAgICBub3RBdHRhY2tlZC5kZWxldGUocG9zU3RyaW5naWZ5KTtcblxuICAgIGlmIChzaGlwKSB7XG4gICAgICBzaGlwLmhpdCgpO1xuICAgICAgZGVsZXRlIHNoaXBzQ29vcmRpbmF0ZXNbcG9zU3RyaW5naWZ5XTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgY2hlY2tBbGxTaGlwc1N1bmsgPSAoKSA9PiBPYmplY3Qua2V5cyhzaGlwc0Nvb3JkaW5hdGVzKS5sZW5ndGggPT09IDA7XG5cbiAgcmV0dXJuIHtcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBjaGVja0FsbFNoaXBzU3VuayxcbiAgICBnZXQgYXR0YWNrcygpIHtcbiAgICAgIHJldHVybiBhdHRhY2tzO1xuICAgIH0sXG4gICAgZ2V0IG5vdEF0dGFja2VkKCkge1xuICAgICAgcmV0dXJuIG5vdEF0dGFja2VkO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVHYW1lQm9hcmQ7XG4iLCJpbXBvcnQgXCJub3JtYWxpemUuY3NzXCI7XG5pbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IHtcbiAgcGxhY2VJbml0aWFsU2hpcHMsXG4gIHBsYWNlU2hpcHNBSSxcbiAgYXR0YWNrUGxheWVyMixcbiAgYXR0YWNrUGxheWVyMSxcbiAgZ2V0UGxheWVyMU5vdEF0dGFja2VkLFxuICBpc1BsYXllcjFXaW5uZXIsXG4gIGlzUGxheWVyMldpbm5lcixcbiAgcmVzdGFydEdhbWUsXG59IGZyb20gXCIuL2dhbWVcIjtcblxuY29uc3QgaW5pdGlhbGl6ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5pdGlhbGl6ZVwiKTtcbmNvbnN0IGRpYWxvZ1NxdWFyZXMgPSBBcnJheS5mcm9tKFxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRpYWxvZy1ib2FyZCAuc3F1YXJlXCIpLFxuKTtcbmNvbnN0IHBsYXllcjFTcXVhcmVzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJvYXJkMSAuc3F1YXJlXCIpKTtcbmNvbnN0IHBsYXllcjJTcXVhcmVzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJvYXJkMiAuc3F1YXJlXCIpKTtcbmNvbnN0IHJvdGF0ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucm90YXRlXCIpO1xuY29uc3Qgc2hpcE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXAtbmFtZVwiKTtcblxuY29uc3QgZ2FtZU92ZXJNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZS1vdmVyXCIpO1xuY29uc3Qgd2lubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5uZXJcIik7XG5jb25zdCBwbGF5QWdhaW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXktYWdhaW5cIik7XG5cbmxldCBkaXJlY3Rpb24gPSBbMCwgMV07XG5sZXQgc2hpcExlbmd0aHMgPSBbMiwgMywgMywgNCwgNV07XG5sZXQgc2hpcE5hbWVzID0gW1wiUGF0cm9sIEJvYXRcIiwgXCJTdWJtYXJpbmVcIiwgXCJEZXN0cm95ZXJcIiwgXCJCYXR0bGVzaGlwXCJdO1xubGV0IGhpZ2hsaWdodGVkID0gW107XG5cbmNvbnN0IG1vdXNlT3ZlclNxdWFyZSA9IChjb29yZCkgPT4ge1xuICBoaWdobGlnaHRlZC5mb3JFYWNoKChpbmRleCkgPT5cbiAgICBkaWFsb2dTcXVhcmVzW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKFwidGVtcC1oaWdobGlnaHRcIiksXG4gICk7XG4gIGhpZ2hsaWdodGVkID0gW107XG5cbiAgY29uc3Qgc2hpcExlbmd0aCA9IHNoaXBMZW5ndGhzW3NoaXBMZW5ndGhzLmxlbmd0aCAtIDFdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IG5leHQgPSBbY29vcmRbMF0gKyBkaXJlY3Rpb25bMF0gKiBpLCBjb29yZFsxXSArIGRpcmVjdGlvblsxXSAqIGldO1xuICAgIGlmIChuZXh0WzBdID4gOSB8fCBuZXh0WzFdID4gOSkgYnJlYWs7XG4gICAgY29uc3QgaW5kZXggPSBuZXh0WzBdICogMTAgKyBuZXh0WzFdO1xuICAgIGRpYWxvZ1NxdWFyZXNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJ0ZW1wLWhpZ2hsaWdodFwiKTtcbiAgICBoaWdobGlnaHRlZC5wdXNoKGluZGV4KTtcbiAgfVxufTtcblxuY29uc3QgY2xpY2tEaWFsb2dTcXVhcmUgPSAoY29vcmQpID0+IHtcbiAgaWYgKFxuICAgIHBsYWNlSW5pdGlhbFNoaXBzKHNoaXBMZW5ndGhzW3NoaXBMZW5ndGhzLmxlbmd0aCAtIDFdLCBjb29yZCwgW1xuICAgICAgY29vcmRbMF0gKyBkaXJlY3Rpb25bMF0sXG4gICAgICBjb29yZFsxXSArIGRpcmVjdGlvblsxXSxcbiAgICBdKVxuICApIHtcbiAgICBoaWdobGlnaHRlZC5mb3JFYWNoKChpbmRleCkgPT4ge1xuICAgICAgZGlhbG9nU3F1YXJlc1tpbmRleF0uY2xhc3NMaXN0LmFkZChcImhpZ2hsaWdodFwiKTtcbiAgICAgIHBsYXllcjFTcXVhcmVzW2luZGV4XS5jbGFzc0xpc3QuYWRkKFwiaGlnaGxpZ2h0XCIpO1xuICAgIH0pO1xuICAgIHNoaXBMZW5ndGhzLnBvcCgpO1xuICAgIGlmIChzaGlwTGVuZ3Rocy5sZW5ndGggPT09IDApIHtcbiAgICAgIGluaXRpYWxpemUuY2xvc2UoKTtcbiAgICAgIHBsYWNlU2hpcHNBSSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBuYW1lID0gc2hpcE5hbWVzLnBvcCgpO1xuICAgIHNoaXBOYW1lLnRleHRDb250ZW50ID0gbmFtZTtcbiAgfVxufTtcblxuZGlhbG9nU3F1YXJlcy5mb3JFYWNoKChzcXVhcmUsIGluZGV4KSA9PiB7XG4gIGNvbnN0IGNvb3JkID0gW01hdGguZmxvb3IoaW5kZXggLyAxMCksIGluZGV4ICUgMTBdO1xuXG4gIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsICgpID0+IG1vdXNlT3ZlclNxdWFyZShjb29yZCkpO1xuICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGNsaWNrRGlhbG9nU3F1YXJlKGNvb3JkKSk7XG59KTtcblxucm90YXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGlmIChkaXJlY3Rpb25bMF0gPT09IDApIGRpcmVjdGlvbiA9IFsxLCAwXTtcbiAgZWxzZSBkaXJlY3Rpb24gPSBbMCwgMV07XG59KTtcblxuY29uc3QgZGlzcGxheVdpbm5lciA9IChtZXNzYWdlKSA9PiB7XG4gIHdpbm5lci50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gIGdhbWVPdmVyTW9kYWwuc2hvd01vZGFsKCk7XG59O1xuXG5jb25zdCBhaUF0dGFjayA9ICgpID0+IHtcbiAgY29uc3QgY29vcmRIaXQgPSBhdHRhY2tQbGF5ZXIxKCk7XG4gIGNvbnN0IHNxdWFyZUhpdCA9IHBsYXllcjFTcXVhcmVzW2Nvb3JkSGl0WzBdICogMTAgKyBjb29yZEhpdFsxXV07XG4gIGlmIChzcXVhcmVIaXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlnaGxpZ2h0XCIpKSB7XG4gICAgc3F1YXJlSGl0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWdobGlnaHRcIik7XG4gICAgc3F1YXJlSGl0LmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gIH0gZWxzZSB7XG4gICAgc3F1YXJlSGl0LmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICB9XG4gIGlmIChpc1BsYXllcjJXaW5uZXIoKSkge1xuICAgIGRpc3BsYXlXaW5uZXIoXCJZb3UgbG9zdCFcIik7XG4gIH1cbn07XG5cbmNvbnN0IHBsYXllckF0dGFjayA9IChzcXVhcmUsIGNvb3JkKSA9PiB7XG4gIGlmIChhdHRhY2tQbGF5ZXIyKGNvb3JkKSkge1xuICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICB9IGVsc2UgaWYgKCFzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpKSBzcXVhcmUuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XG5cbiAgaWYgKGlzUGxheWVyMVdpbm5lcigpKSB7XG4gICAgZGlzcGxheVdpbm5lcihcIllvdSB3b24hXCIpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbnBsYXllcjJTcXVhcmVzLmZvckVhY2goKHNxdWFyZSwgaW5kZXgpID0+XG4gIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkID0gW01hdGguZmxvb3IoaW5kZXggLyAxMCksIGluZGV4ICUgMTBdO1xuICAgIGlmICghZ2V0UGxheWVyMU5vdEF0dGFja2VkKCkuaGFzKEpTT04uc3RyaW5naWZ5KGNvb3JkKSkpIHJldHVybjtcbiAgICBpZiAocGxheWVyQXR0YWNrKHNxdWFyZSwgY29vcmQpKSByZXR1cm47XG5cbiAgICBhaUF0dGFjaygpO1xuICB9KSxcbik7XG5cbmNvbnN0IGNsZWFyU3F1YXJlID0gKHNxdWFyZSkgPT4ge1xuICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcInRlbXAtaGlnaGxpZ2h0XCIpO1xuICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZShcImhpZ2hsaWdodFwiKTtcbiAgc3F1YXJlLmNsYXNzTGlzdC5yZW1vdmUoXCJoaXRcIik7XG4gIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKFwibWlzc1wiKTtcbn07XG5cbnBsYXlBZ2FpbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBnYW1lT3Zlck1vZGFsLmNsb3NlKCk7XG4gIGRpYWxvZ1NxdWFyZXMuZm9yRWFjaCgoc3F1YXJlLCBpbmRleCkgPT4ge1xuICAgIGNsZWFyU3F1YXJlKHNxdWFyZSk7XG4gICAgY2xlYXJTcXVhcmUocGxheWVyMVNxdWFyZXNbaW5kZXhdKTtcbiAgICBjbGVhclNxdWFyZShwbGF5ZXIyU3F1YXJlc1tpbmRleF0pO1xuICB9KTtcblxuICByZXN0YXJ0R2FtZSgpO1xuICBkaXJlY3Rpb24gPSBbMCwgMV07XG4gIHNoaXBMZW5ndGhzID0gWzIsIDMsIDMsIDQsIDVdO1xuICBzaGlwTmFtZXMgPSBbXCJQYXRyb2wgQm9hdFwiLCBcIlN1Ym1hcmluZVwiLCBcIkRlc3Ryb3llclwiLCBcIkJhdHRsZXNoaXBcIl07XG4gIGhpZ2hsaWdodGVkID0gW107XG5cbiAgaW5pdGlhbGl6ZS5zaG93TW9kYWwoKTtcbn0pO1xuXG5pbml0aWFsaXplLnNob3dNb2RhbCgpO1xuIiwiY29uc3QgY3JlYXRlUGxheWVyID0gKCkgPT4ge1xuICBjb25zdCBhdHRhY2sgPSAoYm9hcmQsIHBvcykgPT4gYm9hcmQucmVjZWl2ZUF0dGFjayhwb3MpO1xuICByZXR1cm4geyBhdHRhY2sgfTtcbn07XG5cbmNvbnN0IGNyZWF0ZVBsYXllckFJID0gKCkgPT4ge1xuICAvLyBTdG9yZSB3aGF0IHNoaXBzIGFyZSBzdGlsbCBhbGl2ZVxuICBsZXQgc2hpcENvb3JkID0gbnVsbDtcbiAgbGV0IHNoaXBEaXJlY3Rpb24gPSBudWxsO1xuICBsZXQgZGlyZWN0aW9uID0gMTtcbiAgbGV0IHN0ZXBzID0gMjtcbiAgbGV0IHBvc3NpYmxlID0gW1xuICAgIFswLCAxXSxcbiAgICBbMSwgMF0sXG4gICAgWzAsIC0xXSxcbiAgICBbLTEsIDBdLFxuICBdO1xuICBsZXQgc2hpcExlbmd0aCA9IDA7XG4gIGNvbnN0IHNoaXBzTGVuZ3RoID0gWzAsIDAsIDEsIDIsIDEsIDFdO1xuXG4gIGNvbnN0IHsgYXR0YWNrIH0gPSBjcmVhdGVQbGF5ZXIoKTtcbiAgY29uc3Qgc2hpcFN1bmsgPSAoKSA9PiB7XG4gICAgc2hpcENvb3JkID0gbnVsbDtcbiAgICBzaGlwRGlyZWN0aW9uID0gbnVsbDtcbiAgICBkaXJlY3Rpb24gPSAxO1xuICAgIHN0ZXBzID0gMjtcbiAgICBwb3NzaWJsZSA9IFtcbiAgICAgIFswLCAxXSxcbiAgICAgIFsxLCAwXSxcbiAgICAgIFswLCAtMV0sXG4gICAgICBbLTEsIDBdLFxuICAgIF07XG4gICAgc2hpcHNMZW5ndGhbc2hpcExlbmd0aF0gLT0gMTtcbiAgICBzaGlwTGVuZ3RoID0gMDtcbiAgfTtcblxuICBjb25zdCB2YWxpZGF0ZVNxdWFyZSA9ICh0b0hpdCwgYm9hcmQpID0+XG4gICAgdG9IaXRbMF0gPD0gOSAmJlxuICAgIHRvSGl0WzBdID49IDAgJiZcbiAgICB0b0hpdFsxXSA8PSA5ICYmXG4gICAgdG9IaXRbMV0gPj0gMCAmJlxuICAgIGJvYXJkLm5vdEF0dGFja2VkLmhhcyhKU09OLnN0cmluZ2lmeSh0b0hpdCkpO1xuXG4gIGNvbnN0IGNoZWNrRm9yTGFyZ2VyU2hpcHMgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IHNoaXBzTGVuZ3RoLmxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtPSAxKSB7XG4gICAgICBpZiAoc2hpcExlbmd0aCA9PT0gaSkgc2hpcFN1bmsoKTtcbiAgICAgIGlmIChzaGlwc0xlbmd0aFtpXSA+IDApIHJldHVybjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYWlBdHRhY2sgPSAoYm9hcmQpID0+IHtcbiAgICBpZiAoIXNoaXBDb29yZCkge1xuICAgICAgY29uc3Qgbm90QXR0YWNrZWQgPSBBcnJheS5mcm9tKGJvYXJkLm5vdEF0dGFja2VkKTtcbiAgICAgIGNvbnN0IHRvSGl0ID0gSlNPTi5wYXJzZShcbiAgICAgICAgbm90QXR0YWNrZWRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbm90QXR0YWNrZWQubGVuZ3RoKV0sXG4gICAgICApO1xuICAgICAgaWYgKGF0dGFjayhib2FyZCwgdG9IaXQpKSB7XG4gICAgICAgIHNoaXBDb29yZCA9IHRvSGl0O1xuICAgICAgICBzaGlwTGVuZ3RoICs9IDE7XG4gICAgICB9XG4gICAgICAvLyBURVNUXG4gICAgICAvLyBpZiAoYXR0YWNrKGJvYXJkLCBbMSwgMF0pKSB7XG4gICAgICAvLyAgIHNoaXBDb29yZCA9IFsxLCAwXTtcbiAgICAgIC8vIH1cbiAgICAgIHJldHVybiB0b0hpdDtcbiAgICB9XG4gICAgaWYgKCFzaGlwRGlyZWN0aW9uKSB7XG4gICAgICBsZXQgdmFsaWRTcXVhcmUgPSBmYWxzZTtcbiAgICAgIGxldCB0b0hpdDtcbiAgICAgIGxldCBjaGVjaztcbiAgICAgIGRvIHtcbiAgICAgICAgY2hlY2sgPSBwb3NzaWJsZS5wb3AoKTtcbiAgICAgICAgdG9IaXQgPSBbc2hpcENvb3JkWzBdICsgY2hlY2tbMF0sIHNoaXBDb29yZFsxXSArIGNoZWNrWzFdXTtcbiAgICAgICAgdmFsaWRTcXVhcmUgPSB2YWxpZGF0ZVNxdWFyZSh0b0hpdCwgYm9hcmQpO1xuICAgICAgfSB3aGlsZSAoIXZhbGlkU3F1YXJlICYmIHBvc3NpYmxlLmxlbmd0aCAhPT0gMCk7XG4gICAgICBpZiAoIXZhbGlkU3F1YXJlKSB7XG4gICAgICAgIHNoaXBTdW5rKCk7XG4gICAgICAgIHJldHVybiBhaUF0dGFjayhib2FyZCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhdHRhY2soYm9hcmQsIHRvSGl0KSkge1xuICAgICAgICBzaGlwRGlyZWN0aW9uID0gY2hlY2s7XG4gICAgICAgIHNoaXBMZW5ndGggKz0gMTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRvSGl0O1xuICAgIH1cbiAgICBjb25zdCB0b0hpdCA9IFtcbiAgICAgIHNoaXBDb29yZFswXSArIHNoaXBEaXJlY3Rpb25bMF0gKiBkaXJlY3Rpb24gKiBzdGVwcyxcbiAgICAgIHNoaXBDb29yZFsxXSArIHNoaXBEaXJlY3Rpb25bMV0gKiBkaXJlY3Rpb24gKiBzdGVwcyxcbiAgICBdO1xuXG4gICAgaWYgKHZhbGlkYXRlU3F1YXJlKHRvSGl0LCBib2FyZCkpIHtcbiAgICAgIGlmIChhdHRhY2soYm9hcmQsIHRvSGl0KSkge1xuICAgICAgICBzdGVwcyArPSAxO1xuICAgICAgICBzaGlwTGVuZ3RoICs9IDE7XG4gICAgICAgIGNoZWNrRm9yTGFyZ2VyU2hpcHMoKTtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAxKSB7XG4gICAgICAgIGRpcmVjdGlvbiA9IC0xO1xuICAgICAgICBzdGVwcyA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaGlwU3VuaygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRvSGl0O1xuICAgIH1cblxuICAgIGlmIChkaXJlY3Rpb24gPT09IDEpIHtcbiAgICAgIGRpcmVjdGlvbiA9IC0xO1xuICAgICAgc3RlcHMgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaGlwU3VuaygpO1xuICAgIH1cbiAgICByZXR1cm4gYWlBdHRhY2soYm9hcmQpO1xuICB9O1xuXG4gIHJldHVybiB7IGFpQXR0YWNrIH07XG59O1xuXG5leHBvcnQgeyBjcmVhdGVQbGF5ZXIsIGNyZWF0ZVBsYXllckFJIH07XG4iLCJjb25zdCBjcmVhdGVTaGlwID0gKGxlbmd0aCkgPT4ge1xuICBsZXQgdGltZXNIaXQgPSAwO1xuXG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICB0aW1lc0hpdCArPSAxO1xuICB9O1xuXG4gIC8vIEFzc3VtZSBzaGlwIHdpbGwgb25seSBiZSBoaXQgZm9yIGEgbWF4aW11bSBvZiBsZW5ndGggdGltZXMuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHRpbWVzSGl0ID09PSBsZW5ndGg7XG5cbiAgcmV0dXJuIHsgaGl0LCBpc1N1bmsgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVNoaXA7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qISBub3JtYWxpemUuY3NzIHY4LjAuMSB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cblxuLyogRG9jdW1lbnRcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXG4gKi9cblxuaHRtbCB7XG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xufVxuXG4vKiBTZWN0aW9uc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuYm9keSB7XG4gIG1hcmdpbjogMDtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIFxcYG1haW5cXGAgZWxlbWVudCBjb25zaXN0ZW50bHkgaW4gSUUuXG4gKi9cblxubWFpbiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4vKipcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIFxcYGgxXFxgIGVsZW1lbnRzIHdpdGhpbiBcXGBzZWN0aW9uXFxgIGFuZFxuICogXFxgYXJ0aWNsZVxcYCBjb250ZXh0cyBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBTYWZhcmkuXG4gKi9cblxuaDEge1xuICBmb250LXNpemU6IDJlbTtcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcbn1cblxuLyogR3JvdXBpbmcgY29udGVudFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgYm94IHNpemluZyBpbiBGaXJlZm94LlxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXG4gKi9cblxuaHIge1xuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xuICBoZWlnaHQ6IDA7IC8qIDEgKi9cbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gQ29ycmVjdCB0aGUgb2RkIFxcYGVtXFxgIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5wcmUge1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cbn1cblxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxuICovXG5cbmEge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLyoqXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cbiAqL1xuXG5hYmJyW3RpdGxlXSB7XG4gIGJvcmRlci1ib3R0b206IG5vbmU7IC8qIDEgKi9cbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IGZvbnQgd2VpZ2h0IGluIENocm9tZSwgRWRnZSwgYW5kIFNhZmFyaS5cbiAqL1xuXG5iLFxuc3Ryb25nIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbn1cblxuLyoqXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICogMi4gQ29ycmVjdCB0aGUgb2RkIFxcYGVtXFxgIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cbiAqL1xuXG5jb2RlLFxua2JkLFxuc2FtcCB7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxuICovXG5cbnNtYWxsIHtcbiAgZm9udC1zaXplOiA4MCU7XG59XG5cbi8qKlxuICogUHJldmVudCBcXGBzdWJcXGAgYW5kIFxcYHN1cFxcYCBlbGVtZW50cyBmcm9tIGFmZmVjdGluZyB0aGUgbGluZSBoZWlnaHQgaW5cbiAqIGFsbCBicm93c2Vycy5cbiAqL1xuXG5zdWIsXG5zdXAge1xuICBmb250LXNpemU6IDc1JTtcbiAgbGluZS1oZWlnaHQ6IDA7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xufVxuXG5zdWIge1xuICBib3R0b206IC0wLjI1ZW07XG59XG5cbnN1cCB7XG4gIHRvcDogLTAuNWVtO1xufVxuXG4vKiBFbWJlZGRlZCBjb250ZW50XG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAuXG4gKi9cblxuaW1nIHtcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xufVxuXG4vKiBGb3Jtc1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2Vycy5cbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cbiAqL1xuXG5idXR0b24sXG5pbnB1dCxcbm9wdGdyb3VwLFxuc2VsZWN0LFxudGV4dGFyZWEge1xuICBmb250LWZhbWlseTogaW5oZXJpdDsgLyogMSAqL1xuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cbiAgbWFyZ2luOiAwOyAvKiAyICovXG59XG5cbi8qKlxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXG4gKiAxLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlLlxuICovXG5cbmJ1dHRvbixcbmlucHV0IHsgLyogMSAqL1xuICBvdmVyZmxvdzogdmlzaWJsZTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGluaGVyaXRhbmNlIG9mIHRleHQgdHJhbnNmb3JtIGluIEVkZ2UsIEZpcmVmb3gsIGFuZCBJRS5cbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cbiAqL1xuXG5idXR0b24sXG5zZWxlY3QgeyAvKiAxICovXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xufVxuXG4vKipcbiAqIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXG4gKi9cblxuYnV0dG9uLFxuW3R5cGU9XCJidXR0b25cIl0sXG5bdHlwZT1cInJlc2V0XCJdLFxuW3R5cGU9XCJzdWJtaXRcIl0ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGlubmVyIGJvcmRlciBhbmQgcGFkZGluZyBpbiBGaXJlZm94LlxuICovXG5cbmJ1dHRvbjo6LW1vei1mb2N1cy1pbm5lcixcblt0eXBlPVwiYnV0dG9uXCJdOjotbW96LWZvY3VzLWlubmVyLFxuW3R5cGU9XCJyZXNldFwiXTo6LW1vei1mb2N1cy1pbm5lcixcblt0eXBlPVwic3VibWl0XCJdOjotbW96LWZvY3VzLWlubmVyIHtcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xufVxuXG4vKipcbiAqIFJlc3RvcmUgdGhlIGZvY3VzIHN0eWxlcyB1bnNldCBieSB0aGUgcHJldmlvdXMgcnVsZS5cbiAqL1xuXG5idXR0b246LW1vei1mb2N1c3JpbmcsXG5bdHlwZT1cImJ1dHRvblwiXTotbW96LWZvY3VzcmluZyxcblt0eXBlPVwicmVzZXRcIl06LW1vei1mb2N1c3JpbmcsXG5bdHlwZT1cInN1Ym1pdFwiXTotbW96LWZvY3VzcmluZyB7XG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcbn1cblxuLyoqXG4gKiBDb3JyZWN0IHRoZSBwYWRkaW5nIGluIEZpcmVmb3guXG4gKi9cblxuZmllbGRzZXQge1xuICBwYWRkaW5nOiAwLjM1ZW0gMC43NWVtIDAuNjI1ZW07XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gXFxgZmllbGRzZXRcXGAgZWxlbWVudHMgaW4gSUUuXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XG4gKiAgICBcXGBmaWVsZHNldFxcYCBlbGVtZW50cyBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxubGVnZW5kIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xuICBkaXNwbGF5OiB0YWJsZTsgLyogMSAqL1xuICBtYXgtd2lkdGg6IDEwMCU7IC8qIDEgKi9cbiAgcGFkZGluZzogMDsgLyogMyAqL1xuICB3aGl0ZS1zcGFjZTogbm9ybWFsOyAvKiAxICovXG59XG5cbi8qKlxuICogQWRkIHRoZSBjb3JyZWN0IHZlcnRpY2FsIGFsaWdubWVudCBpbiBDaHJvbWUsIEZpcmVmb3gsIGFuZCBPcGVyYS5cbiAqL1xuXG5wcm9ncmVzcyB7XG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgdGhlIGRlZmF1bHQgdmVydGljYWwgc2Nyb2xsYmFyIGluIElFIDEwKy5cbiAqL1xuXG50ZXh0YXJlYSB7XG4gIG92ZXJmbG93OiBhdXRvO1xufVxuXG4vKipcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLlxuICovXG5cblt0eXBlPVwiY2hlY2tib3hcIl0sXG5bdHlwZT1cInJhZGlvXCJdIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgLyogMSAqL1xuICBwYWRkaW5nOiAwOyAvKiAyICovXG59XG5cbi8qKlxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxuICovXG5cblt0eXBlPVwibnVtYmVyXCJdOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLFxuW3R5cGU9XCJudW1iZXJcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xuICBoZWlnaHQ6IGF1dG87XG59XG5cbi8qKlxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXG4gKiAyLiBDb3JyZWN0IHRoZSBvdXRsaW5lIHN0eWxlIGluIFNhZmFyaS5cbiAqL1xuXG5bdHlwZT1cInNlYXJjaFwiXSB7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4OyAvKiAyICovXG59XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBpbm5lciBwYWRkaW5nIGluIENocm9tZSBhbmQgU2FmYXJpIG9uIG1hY09TLlxuICovXG5cblt0eXBlPVwic2VhcmNoXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xufVxuXG4vKipcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIFxcYGluaGVyaXRcXGAgaW4gU2FmYXJpLlxuICovXG5cbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xuICBmb250OiBpbmhlcml0OyAvKiAyICovXG59XG5cbi8qIEludGVyYWN0aXZlXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKlxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUgMTArLCBhbmQgRmlyZWZveC5cbiAqL1xuXG5kZXRhaWxzIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi8qXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXG4gKi9cblxuc3VtbWFyeSB7XG4gIGRpc3BsYXk6IGxpc3QtaXRlbTtcbn1cblxuLyogTWlzY1xuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXG4gKi9cblxudGVtcGxhdGUge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4vKipcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLlxuICovXG5cbltoaWRkZW5dIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSwyRUFBMkU7O0FBRTNFOytFQUMrRTs7QUFFL0U7OztFQUdFOztBQUVGO0VBQ0UsaUJBQWlCLEVBQUUsTUFBTTtFQUN6Qiw4QkFBOEIsRUFBRSxNQUFNO0FBQ3hDOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLGNBQWM7RUFDZCxnQkFBZ0I7QUFDbEI7O0FBRUE7K0VBQytFOztBQUUvRTs7O0VBR0U7O0FBRUY7RUFDRSx1QkFBdUIsRUFBRSxNQUFNO0VBQy9CLFNBQVMsRUFBRSxNQUFNO0VBQ2pCLGlCQUFpQixFQUFFLE1BQU07QUFDM0I7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsaUNBQWlDLEVBQUUsTUFBTTtFQUN6QyxjQUFjLEVBQUUsTUFBTTtBQUN4Qjs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsNkJBQTZCO0FBQy9COztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLG1CQUFtQixFQUFFLE1BQU07RUFDM0IsMEJBQTBCLEVBQUUsTUFBTTtFQUNsQyxpQ0FBaUMsRUFBRSxNQUFNO0FBQzNDOztBQUVBOztFQUVFOztBQUVGOztFQUVFLG1CQUFtQjtBQUNyQjs7QUFFQTs7O0VBR0U7O0FBRUY7OztFQUdFLGlDQUFpQyxFQUFFLE1BQU07RUFDekMsY0FBYyxFQUFFLE1BQU07QUFDeEI7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOzs7RUFHRTs7QUFFRjs7RUFFRSxjQUFjO0VBQ2QsY0FBYztFQUNkLGtCQUFrQjtFQUNsQix3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7K0VBQytFOztBQUUvRTs7O0VBR0U7O0FBRUY7Ozs7O0VBS0Usb0JBQW9CLEVBQUUsTUFBTTtFQUM1QixlQUFlLEVBQUUsTUFBTTtFQUN2QixpQkFBaUIsRUFBRSxNQUFNO0VBQ3pCLFNBQVMsRUFBRSxNQUFNO0FBQ25COztBQUVBOzs7RUFHRTs7QUFFRjtRQUNRLE1BQU07RUFDWixpQkFBaUI7QUFDbkI7O0FBRUE7OztFQUdFOztBQUVGO1NBQ1MsTUFBTTtFQUNiLG9CQUFvQjtBQUN0Qjs7QUFFQTs7RUFFRTs7QUFFRjs7OztFQUlFLDBCQUEwQjtBQUM1Qjs7QUFFQTs7RUFFRTs7QUFFRjs7OztFQUlFLGtCQUFrQjtFQUNsQixVQUFVO0FBQ1o7O0FBRUE7O0VBRUU7O0FBRUY7Ozs7RUFJRSw4QkFBOEI7QUFDaEM7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSw4QkFBOEI7QUFDaEM7O0FBRUE7Ozs7O0VBS0U7O0FBRUY7RUFDRSxzQkFBc0IsRUFBRSxNQUFNO0VBQzlCLGNBQWMsRUFBRSxNQUFNO0VBQ3RCLGNBQWMsRUFBRSxNQUFNO0VBQ3RCLGVBQWUsRUFBRSxNQUFNO0VBQ3ZCLFVBQVUsRUFBRSxNQUFNO0VBQ2xCLG1CQUFtQixFQUFFLE1BQU07QUFDN0I7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOzs7RUFHRTs7QUFFRjs7RUFFRSxzQkFBc0IsRUFBRSxNQUFNO0VBQzlCLFVBQVUsRUFBRSxNQUFNO0FBQ3BCOztBQUVBOztFQUVFOztBQUVGOztFQUVFLFlBQVk7QUFDZDs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSw2QkFBNkIsRUFBRSxNQUFNO0VBQ3JDLG9CQUFvQixFQUFFLE1BQU07QUFDOUI7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsMEJBQTBCLEVBQUUsTUFBTTtFQUNsQyxhQUFhLEVBQUUsTUFBTTtBQUN2Qjs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsYUFBYTtBQUNmOztBQUVBOztFQUVFOztBQUVGO0VBQ0UsYUFBYTtBQUNmXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qISBub3JtYWxpemUuY3NzIHY4LjAuMSB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cXG5cXG4vKiBEb2N1bWVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gaU9TLlxcbiAqL1xcblxcbmh0bWwge1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xcbn1cXG5cXG4vKiBTZWN0aW9uc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZW5kZXIgdGhlIGBtYWluYCBlbGVtZW50IGNvbnNpc3RlbnRseSBpbiBJRS5cXG4gKi9cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXFxuICogYGFydGljbGVgIGNvbnRleHRzIGluIENocm9tZSwgRmlyZWZveCwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5oMSB7XFxuICBmb250LXNpemU6IDJlbTtcXG4gIG1hcmdpbjogMC42N2VtIDA7XFxufVxcblxcbi8qIEdyb3VwaW5nIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXFxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXFxuICovXFxuXFxuaHIge1xcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cXG4gIGhlaWdodDogMDsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxucHJlIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5hIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4vKipcXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxcbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYWJiclt0aXRsZV0ge1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTsgLyogMSAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmIsXFxuc3Ryb25nIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmNvZGUsXFxua2JkLFxcbnNhbXAge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zbWFsbCB7XFxuICBmb250LXNpemU6IDgwJTtcXG59XFxuXFxuLyoqXFxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXFxuICogYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1YixcXG5zdXAge1xcbiAgZm9udC1zaXplOiA3NSU7XFxuICBsaW5lLWhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuc3ViIHtcXG4gIGJvdHRvbTogLTAuMjVlbTtcXG59XFxuXFxuc3VwIHtcXG4gIHRvcDogLTAuNWVtO1xcbn1cXG5cXG4vKiBFbWJlZGRlZCBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmltZyB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxufVxcblxcbi8qIEZvcm1zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBGaXJlZm94IGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0LFxcbm9wdGdyb3VwLFxcbnNlbGVjdCxcXG50ZXh0YXJlYSB7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxMDAlOyAvKiAxICovXFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgbWFyZ2luOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxcbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0IHsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxcbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b24sXFxuc2VsZWN0IHsgLyogMSAqL1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXSxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXSxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLyoqXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcbiAqL1xcblxcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmZpZWxkc2V0IHtcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmxlZ2VuZCB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xcbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMyAqL1xcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcbiAqL1xcblxcbnByb2dyZXNzIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRSAxMCsuXFxuICovXFxuXFxudGV4dGFyZWEge1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxcbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXG5bdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXFxuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIGBpbmhlcml0YCBpbiBTYWZhcmkuXFxuICovXFxuXFxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xcbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xcbn1cXG5cXG4vKiBJbnRlcmFjdGl2ZVxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSAxMCssIGFuZCBGaXJlZm94LlxcbiAqL1xcblxcbmRldGFpbHMge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1bW1hcnkge1xcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xcbn1cXG5cXG4vKiBNaXNjXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXFxuICovXFxuXFxudGVtcGxhdGUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAuXFxuICovXFxuXFxuW2hpZGRlbl0ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGA6cm9vdCB7XG4gIGZvbnQtc2l6ZTogMXZ3O1xufVxuXG5odG1sIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgc3lzdGVtLXVpLCBcIlNlZ29lIFVJXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYsXG4gICAgXCJBcHBsZSBDb2xvciBFbW9qaVwiLCBcIlNlZ29lIFVJIEVtb2ppXCIsIFwiU2Vnb2UgVUkgU3ltYm9sXCI7XG59XG5cbiosXG4qOjpiZWZvcmUsXG4qOjphZnRlciB7XG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgYm9yZGVyOiBub25lO1xufVxuXG5oMSB7XG4gIC8qIFRvIG92ZXJyaWRlIE5vcm1hbGl6ZS5jc3MgaDEgbWFyZ2luICovXG4gIG1hcmdpbjogMDtcbn1cblxuYm9keSB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogMWZyO1xuICBoZWlnaHQ6IDEwMHZoO1xufVxuXG4uYm9hcmRzIHtcbiAgcGFkZGluZzogMi41cmVtO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDI1MHB4LCAxZnIpKTtcbiAgY29sdW1uLWdhcDogMi41cmVtO1xuICByb3ctZ2FwOiA1MHB4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uYm9hcmQxLFxuLmJvYXJkMixcbi5kaWFsb2ctYm9hcmQge1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbn1cblxuLnJvdyB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMXB4LCAxZnIpKTtcbn1cblxuLnNxdWFyZSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICBhc3BlY3QtcmF0aW86IDE7XG59XG5cbmRpYWxvZ1tvcGVuXSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdhcDogMjVweDtcbiAgcGFkZGluZzogMnJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xufVxuXG4ucm90YXRlLFxuLnBsYXktYWdhaW4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiAxMHB4IDI1cHg7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ud2lubmVyIHtcbiAgZm9udC1zaXplOiA0OHB4O1xufVxuXG4ucGxheS1hZ2FpbiB7XG4gIGZvbnQtc2l6ZTogMzJweDtcbn1cblxuLnJvdGF0ZTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44KTtcbn1cblxuLnRlbXAtaGlnaGxpZ2h0LFxuLmhpZ2hsaWdodCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSk7XG59XG5cbi5kaWFsb2ctYm9hcmQgLnNxdWFyZSB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmhpdCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cblxuLm1pc3Mge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcbn1cblxuLnJpZ2h0LFxuLmxlZnQge1xuICBkaXNwbGF5OiBncmlkO1xuICBnYXA6IDEwcHg7XG59XG5cbi5ib2FyZC10aXRsZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEI7NERBQzBEO0FBQzVEOztBQUVBOzs7RUFHRSxtQkFBbUI7RUFDbkIsVUFBVTtFQUNWLFNBQVM7RUFDVCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSx3Q0FBd0M7RUFDeEMsU0FBUztBQUNYOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsYUFBYTtFQUNiLDJEQUEyRDtFQUMzRCxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLG1CQUFtQjtBQUNyQjs7QUFFQTs7O0VBR0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHlEQUF5RDtBQUMzRDs7QUFFQTtFQUNFLHVCQUF1QjtFQUN2QixlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixTQUFTO0VBQ1QsZ0NBQWdDO0VBQ2hDLGFBQWE7RUFDYixTQUFTO0VBQ1QsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQixtQkFBbUI7QUFDckI7O0FBRUE7O0VBRUUsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usb0NBQW9DO0FBQ3RDOztBQUVBOztFQUVFLHFDQUFxQztBQUN2Qzs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7O0VBRUUsYUFBYTtFQUNiLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI6cm9vdCB7XFxuICBmb250LXNpemU6IDF2dztcXG59XFxuXFxuaHRtbCB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgc3lzdGVtLXVpLCBcXFwiU2Vnb2UgVUlcXFwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmLFxcbiAgICBcXFwiQXBwbGUgQ29sb3IgRW1vamlcXFwiLCBcXFwiU2Vnb2UgVUkgRW1vamlcXFwiLCBcXFwiU2Vnb2UgVUkgU3ltYm9sXFxcIjtcXG59XFxuXFxuKixcXG4qOjpiZWZvcmUsXFxuKjo6YWZ0ZXIge1xcbiAgYm94LXNpemluZzogaW5oZXJpdDtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3JkZXI6IG5vbmU7XFxufVxcblxcbmgxIHtcXG4gIC8qIFRvIG92ZXJyaWRlIE5vcm1hbGl6ZS5jc3MgaDEgbWFyZ2luICovXFxuICBtYXJnaW46IDA7XFxufVxcblxcbmJvZHkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMWZyO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG59XFxuXFxuLmJvYXJkcyB7XFxuICBwYWRkaW5nOiAyLjVyZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyNTBweCwgMWZyKSk7XFxuICBjb2x1bW4tZ2FwOiAyLjVyZW07XFxuICByb3ctZ2FwOiA1MHB4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmJvYXJkMSxcXG4uYm9hcmQyLFxcbi5kaWFsb2ctYm9hcmQge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5yb3cge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMXB4LCAxZnIpKTtcXG59XFxuXFxuLnNxdWFyZSB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGFzcGVjdC1yYXRpbzogMTtcXG59XFxuXFxuZGlhbG9nW29wZW5dIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAyNXB4O1xcbiAgcGFkZGluZzogMnJlbTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxufVxcblxcbi5yb3RhdGUsXFxuLnBsYXktYWdhaW4ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAxMHB4IDI1cHg7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLndpbm5lciB7XFxuICBmb250LXNpemU6IDQ4cHg7XFxufVxcblxcbi5wbGF5LWFnYWluIHtcXG4gIGZvbnQtc2l6ZTogMzJweDtcXG59XFxuXFxuLnJvdGF0ZTpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOCk7XFxufVxcblxcbi50ZW1wLWhpZ2hsaWdodCxcXG4uaGlnaGxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC43NSk7XFxufVxcblxcbi5kaWFsb2ctYm9hcmQgLnNxdWFyZSB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5cXG4ubWlzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcXG59XFxuXFxuLnJpZ2h0LFxcbi5sZWZ0IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDEwcHg7XFxufVxcblxcbi5ib2FyZC10aXRsZSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbm9ybWFsaXplLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9ub3JtYWxpemUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiY3JlYXRlUGxheWVyIiwiY3JlYXRlUGxheWVyQUkiLCJjcmVhdGVHYW1lQm9hcmQiLCJwbGF5ZXIxIiwicGxheWVyMUJvYXJkIiwicGxheWVyMiIsInBsYXllcjJCb2FyZCIsInBsYWNlSW5pdGlhbFNoaXBzIiwibGVuZ3RoIiwicG9zMSIsInBvczIiLCJwbGFjZVNoaXAiLCJwbGFjZVNoaXBBSSIsInBsYWNlU2hpcHNBSSIsInNoaXBMZW5ndGgiLCJmb3JFYWNoIiwiZmxhZyIsImNvb3JkIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiYXR0YWNrUGxheWVyMiIsInBvcyIsImF0dGFjayIsImF0dGFja1BsYXllcjEiLCJhaUF0dGFjayIsImdldFBsYXllcjFOb3RBdHRhY2tlZCIsIm5vdEF0dGFja2VkIiwiZ2V0UGxheWVyMk5vdEF0dGFja2VkIiwiaXNQbGF5ZXIxV2lubmVyIiwiY2hlY2tBbGxTaGlwc1N1bmsiLCJpc1BsYXllcjJXaW5uZXIiLCJyZXN0YXJ0R2FtZSIsImNyZWF0ZVNoaXAiLCJzaGlwc0Nvb3JkaW5hdGVzIiwiYXR0YWNrcyIsIlNldCIsImluaXRpYWxpemVOb3RBdHRhY2tlZCIsInNpemUiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJpIiwiaiIsImFkZCIsImNoZWNrVmFsaWRTaGlwUGxhY2VtZW50IiwiY29vcmRzIiwiZXZlcnkiLCJ4IiwieSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsIngxIiwieTEiLCJ4MiIsInkyIiwiZHgiLCJkeSIsInB1c2giLCJzaGlwIiwicmVjZWl2ZUF0dGFjayIsInBvc1N0cmluZ2lmeSIsImRlbGV0ZSIsImhpdCIsIk9iamVjdCIsImtleXMiLCJpbml0aWFsaXplIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZGlhbG9nU3F1YXJlcyIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwbGF5ZXIxU3F1YXJlcyIsInBsYXllcjJTcXVhcmVzIiwicm90YXRlQnV0dG9uIiwic2hpcE5hbWUiLCJnYW1lT3Zlck1vZGFsIiwid2lubmVyIiwicGxheUFnYWluQnV0dG9uIiwiZGlyZWN0aW9uIiwic2hpcExlbmd0aHMiLCJzaGlwTmFtZXMiLCJoaWdobGlnaHRlZCIsIm1vdXNlT3ZlclNxdWFyZSIsImluZGV4IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwibmV4dCIsImNsaWNrRGlhbG9nU3F1YXJlIiwicG9wIiwiY2xvc2UiLCJuYW1lIiwidGV4dENvbnRlbnQiLCJzcXVhcmUiLCJhZGRFdmVudExpc3RlbmVyIiwiZGlzcGxheVdpbm5lciIsIm1lc3NhZ2UiLCJzaG93TW9kYWwiLCJjb29yZEhpdCIsInNxdWFyZUhpdCIsImNvbnRhaW5zIiwicGxheWVyQXR0YWNrIiwiaGFzIiwiY2xlYXJTcXVhcmUiLCJib2FyZCIsInNoaXBDb29yZCIsInNoaXBEaXJlY3Rpb24iLCJzdGVwcyIsInBvc3NpYmxlIiwic2hpcHNMZW5ndGgiLCJzaGlwU3VuayIsInZhbGlkYXRlU3F1YXJlIiwidG9IaXQiLCJjaGVja0ZvckxhcmdlclNoaXBzIiwidmFsaWRTcXVhcmUiLCJjaGVjayIsInRpbWVzSGl0IiwiaXNTdW5rIl0sInNvdXJjZVJvb3QiOiIifQ==