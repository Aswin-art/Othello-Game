const board = document.getElementById("board");
const discLayer = document.getElementById("disclayer");

const cellWidth = 50;
const gap = 5;
board.style.width = cellWidth * 8 + gap * 9 + "px";
board.style.height = cellWidth * 8 + gap * 9 + "px";

let turn = 1;

const discs = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

function makeBlockElement(row, column, color, radius) {
  const el = document.createElement("div");
  el.style.backgroundColor = color;
  el.style.width = `${cellWidth}px`;
  el.style.height = `${cellWidth}px`;
  el.style.position = "absolute";
  el.style.borderRadius = radius;
  el.style.top = (cellWidth + gap) * row + gap + "px";
  el.style.left = (cellWidth + gap) * column + gap + "px";

  return el;
}

function checkTop(row, column) {
  let enemy = null;
  if (turn == 1) {
    enemy = 2;
  } else {
    enemy = 1;
  }

  if (discs[row + 2][column] == turn && discs[row + 1][column] == enemy) {
    discs[row + 1][column] = turn
    return true;
  }

  return false;
}

function checkBottom(row, column) {
  let enemy = null;
  if (turn == 1) {
    enemy = 2;
  } else {
    enemy = 1;
  }

  if (discs[row - 2][column] == turn && discs[row - 1][column] == enemy) {
    discs[row - 1][column] = turn
    return true;
  }

  return false;
}

function checkRight(row, column) {
  let enemy = null;
  if (turn == 1) {
    enemy = 2;
  } else {
    enemy = 1;
  }

  if (discs[row][column + 2] == turn && discs[row][column + 1] == enemy) {
    discs[row][column + 1] = turn
    return true;
  }

  return false;
}

function checkLeft(row, column) {
  let enemy = null;
  if (turn == 1) {
    enemy = 2;
  } else {
    enemy = 1;
  }

  if (discs[row][column - 2] == turn && discs[row][column - 1] == enemy) {
    discs[row][column - 1] = turn
    return true;
  }

  return false;
}

function clickedSquare(row, column) {
  if (discs[row][column] == 0) {
    const top = checkTop(row, column);
    const bottom = checkBottom(row, column);
    const right = checkRight(row, column);
    const left = checkLeft(row, column);

    if (top || bottom || right || left) {
      discs[row][column] = turn;

      if (turn == 1) {
        turn = 2;
      } else {
        turn = 1;
      }

      drawDisc();
    }
  }
}

function drawBlock() {
  for (let row = 0; row < 8; ++row) {
    for (let column = 0; column < 8; ++column) {
      const el = makeBlockElement(row, column, "green", "0");
      el.setAttribute("onClick", "clickedSquare(" + row + "," + column + ")");
      board.appendChild(el);
    }
  }
}

function drawDisc() {
  for (let row = 0; row < 8; ++row) {
    for (let column = 0; column < 8; ++column) {
      if (discs[row][column] != 0) {
        let el = null;
        if (discs[row][column] == 1) {
          el = makeBlockElement(row, column, "black", "50%");
        } else if (discs[row][column] == 2) {
          el = makeBlockElement(row, column, "white", "50%");
        } else {
          el = makeBlockElement(row, column, "green", "0");
        }

        discLayer.appendChild(el);
      }
    }
  }
}

function game(){
    board.style.backgroundColor = 'black'
    drawBlock();
    drawDisc();
}

function playGame(){
    menu.style.display = 'none'
    overlay.style.display = 'none'
    game()
}

const menu = document.querySelector('.menu')
const overlay = document.querySelector('.overlay')
const play = document.querySelector('.play')
play.addEventListener('click', playGame)