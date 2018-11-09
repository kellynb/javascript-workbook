'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

const switchPlayers = () => {
  if (playerTurn == 'X') {
    return playerTurn = 'O';
  } else {
    return playerTurn = 'X'
  }
}

const changeBoard = (row,column) => {
  if (board[row][column] == ' ') {
    board[row].splice(column, 1, playerTurn);
    return board;
    } else {
    return console.log('Choose a vacant spot');
    }
}

const allXArray = (item) => {
  return item.includes('X')
};

const allOArray = (item) => {
  return item.includes('O')
};

function horizontalWin() {
if (board[0].every(allXArray)  || board[0].every(allOArray))   {
  return true;
} else if (board[1].every(allXArray) || board[1].every(allOArray)) {
  return true;
} else if (board[2].every(allXArray) || board[2].every(allOArray)) {
  return true;
}
}

function verticalWin() {
if ((board[0][0] == 'X' && board[1][0] == 'X' && board[2][0] == 'X') || (board[0][0] == 'O' && board[1][0] == 'O' && board[2][0] == 'O'))   {
  return true;
} else if ((board[0][1] == 'X' && board[1][1] == 'X' && board[2][1] == 'X') || (board[0][1] == 'O' && board[1][1] == 'O' && board[2][1] == 'O')) {
  return true;
} else if ((board[0][2] == 'X' && board[1][2] == 'X' && board[2][2] == 'X') || (board[0][2] == 'O' && board[1][2] == 'O' && board[2][2] == 'O')) {
  return true;
}
}

function diagonalWin() {
if ((board[0][0] == 'X' && board[1][1] == 'X' && board[2][2] == 'X') || (board[0][0] == 'O' && board[1][1] == 'O' && board[2][2] == 'O'))   {
  return true;
} else if ((board[0][2] == 'X' && board[1][1] == 'X' && board[2][0] == 'X') || (board[0][2] == 'O' && board[1][1] == 'O' && board[2][0] == 'O')) {
  return true;
}
}

const fullBoard  = (item) => {
return item.includes('X') || item.includes('O');
}

const tieGame = () => {
  if (board[0].every(fullBoard) && board[1].every(fullBoard) && board[2].every(fullBoard)) {
    return console.log('its a tie');
  }
}



function checkForWin() {
return horizontalWin() || verticalWin() || diagonalWin();
}


function ticTacToe(row, column) {
changeBoard (row, column);  

if (checkForWin()) {
  console.log(playerTurn + ' has won');
  } else if (tieGame()) {
  console.log('Its a Tie');
  } else {
    tieGame(); 
  } 

}

function getPrompt() {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });

}



// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
