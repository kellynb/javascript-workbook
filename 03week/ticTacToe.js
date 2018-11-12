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

const isMoveValid = (row,column) => {
  return board[row][column] == ' ';
}

const switchPlayers = () => {
  if (playerTurn == 'X') {
    return playerTurn = 'O';
  } else {
    return playerTurn = 'X'
  }
}

const changeBoard = (row,column) => {
  board[row].splice(column, 1, playerTurn);
  return board;
}

const xValues = (item) => {
  return item.includes('X')
};

const oValues = (item) => {
  return item.includes('O')
};

function horizontalWin() {
  if (board[0].every(xValues)  || board[0].every(oValues))   {
    return true;
  } else if (board[1].every(xValues) || board[1].every(oValues)) {
    return true;
  } else if (board[2].every(xValues) || board[2].every(oValues)) {
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
  return board[0].every(fullBoard) && board[1].every(fullBoard) && board[2].every(fullBoard)
}


function checkForWin() {
  return horizontalWin() || verticalWin() || diagonalWin();
}

const resetGame = () => {
  board.forEach((arr1, index) => {
    arr1.forEach((element, index2) => {
      element = ' ';
      board[index][index2] = element;
    })
  })  
 }



function ticTacToe(row, column) {

  if (isMoveValid(row,column)) {
    if(changeBoard (row, column)) {
      if (checkForWin()) {
        console.log (playerTurn + ' has won');
        resetGame();
        switchPlayers();
        } else if (tieGame()) {
        console.log ('Its a tie');
        resetGame();
        switchPlayers();
        } else {
        switchPlayers();
        }
      } 
    } else {
    console.log('choose a vacant spot');
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
