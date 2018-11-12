'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Checker {

  constructor(color) {
    if (color == 'white') {
      this.symbol = String.fromCharCode(0x125CB);
    } else {
      this.symbol = String.fromCharCode(0x125CF);
    }
  }
  

}

class Board {
  constructor() {
    this.grid = []
    this.checkers = [];
  }
  // method that creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  }

  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column]);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }

  createChecker() {
    const checker1 = new Checker('white');
    const checker2 = new Checker('black');


    // print white checker
    this.grid.forEach((arr,index) => {
      if ((index % 2 == 0) && index <3 ) {
         arr.forEach((arr2,column) => {
           if (column % 2 == 0) {
             arr.splice(column, 1, checker1.symbol);
             this.checkers.push(checker1.symbol);
           }
         })
        } else if ((index % 2 == 1) && index <3) {
          arr.forEach((arr2, column) => {
           if (column % 2 == 1) {
             arr.splice(column, 1, checker1.symbol);
             this.checkers.push(checker1.symbol);
           }
         })
        } 
     })
    // print black checker
    this.grid.forEach((arr,index) => {
       if ((index % 2 == 0) && index > 4 ) {
          arr.forEach((arr2, column) => {
            if (column % 2 == 0) {
              arr.splice(column, 1, checker2.symbol);
              this.checkers.push(checker2.symbol);
            }
          })
         } else if ((index % 2 == 1) && index > 4) {
           arr.forEach((arr2, column) => {
            if (column % 2 == 1) {
              arr.splice(column, 1, checker2.symbol);
              this.checkers.push(checker2.symbol);
            }
          })
         } 
      })
  }
  
  selectChecker (row,column) {
    return this.grid[row][column];
  }

  killChecker (position) {
    console.log(position);
    const killSpot = position.split('');
    const killSpotNumArr = killSpot.map(Number);
    const checkerDies = this.selectChecker(killSpotNumArr[0],(killSpotNumArr[1]));
    const removeCheckerArrSpot = this.checkers.indexOf(checkerDies);
    this.checkers.splice(removeCheckerArrSpot, 1);
    this.grid[killSpotNumArr[0]][killSpotNumArr[1]] = null;
    console.log(this.checkers.length);
  }

}

class Game {
  constructor() {
    this.board = new Board;
  }
  start() {
    this.board.createGrid();
    this.board.createChecker();
  }

  moveChecker (start, end) {
    const startArr = start.split('');
    const startArrNum = startArr.map(Number);
    const endArr = end.split('');
    const endArrNum = endArr.map(Number);
    const checker = this.board.selectChecker(startArrNum[0],startArrNum[1]);
    this.board.grid[startArrNum[0]][startArrNum[1]] = null;
    this.board.grid[endArrNum[0]][endArrNum[1]] = checker;
    

    if (Math.abs(startArrNum[0] - endArrNum[0]) == 2) {
      const killPosition = (start,end) => {
        const startKill = parseInt(start);
        const endKill = parseInt(end);
        const halfpoint = (startKill + endKill) / 2;
        return halfpoint.toString();
      }
      this.board.killChecker(killPosition(start,end));
    }
    
  }
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests
if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', () => {
    it('should move a checker', () => {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}
