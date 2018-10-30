'use strict';

// Player X picks row 0-2. Picking a row is calling array element 0-2 in array board
// Player X picks column 0-2. Picking a column is picking an element within a multidimensional array
// After picking row and column. That nested element is stored and displayed on the board
// function storePlayOnBoard 
    // input player X move = board [row][column];
    // store that move
    // return 'x' in function printBoard();
// Check for player X win after a move using checkForWin() function
    // check for a horizontal win
      // input board and see if array board [0],[1],[2] have either all X's or all O's
      // return true or false
    // check for a vertical win
      // input board and see if array board has either all X's or all O's in the same column. rows are different, column input in board[row][column] is the same
      // return true or false
    // check for diagnol win
      // Check that row 0, column 0 && row 1, column 1 && row 2, column 2 have either all X's or O's
      // Check that row 2, column 0 && row 1, column 1 && row 0, column 2 have either all X's or o's 
      // return true or false
    // if checkForWin() returns false, run a function to check for a full board/tie game
  // check for a tieGame
      // function to determine if board all array spots have a value
      // will check for either X or O for each spot in array
      // return a function to reset game
      // else return false
// If checkForWin() is false and tieGame() is false, switch players
  // to switch players, have function switchPlayers()
    // evaluate playerTurn and return the other option 'O' or 'X'


// 
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




const changeBoard = (row,column) => {
  if (board[row][column] == ' ') {
    board[row].splice(column, 1, playerTurn);
    return board;
    } else {
    console.log('Choose a vacant spot');
  }
}

const switchPlayers = () => {
  if (playerTurn == 'X') {
    return playerTurn = 'O';
    } else {
    return playerTurn = 'X'
  }
};

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
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
 return board[0].every(fullBoard) && board[1].every(fullBoard) && board[2].every(fullBoard);
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
    switchPlayers();
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
