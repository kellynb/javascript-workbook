'use strict';

// GamePlan

// User enter values. Verify if values are either a, b, or c with function validEntry().
// validEntry() returns true or false.
// After checking validity, check to verify move is legal.
// function isLegal(); This function compares the last value removed from the array called
// and verifies that it is less than any item that is in the array it will move to. Have variables (currentLocation) and (endLocation) that stores what arrays and what values are called
// The local variables within isLegal() store the value that is removed from the startStack (removedItem) and the last value the removedItem is going to (lastArrayItem).
// isLegal() return the function movePiece() or tells the user its an invalid move
// function movePiece() pushes the removedItem onto the endLocation.
// after moving the value, a checkForWin() is called. This function verifies that all four numbers are in stack c.
// if true, the checkForWin() alerts user they've won and resets the board by calling the function resetGame().
// resetGame() will place all values back to its originial location.


const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// variable to store the 3 valid entries
const validEntry = ['a', 'b', 'c'];

// function that verifies if the entries are true or false
const isEntryValid = (startStack,endStack) => {
  return validEntry.includes(startStack) && validEntry.includes(endStack);
};

// function that determines move is valid and calls movePiece if true.
const isLegal = (currentLocation, endLocation) => {
  const lastArrayItem = endLocation[endLocation.length - 1];
  const firstArrayItem = currentLocation[currentLocation.length -1];  
  return (lastArrayItem > firstArrayItem) || (endLocation.length < 1);
}

// function to remove the last item in the array called by startStack
const removedItem = (currentLocation) => {
  return currentLocation.pop();
} 

// function that pushes the removedItem onto the variable endLocation
const movePiece = (currentLocation, endLocation) => {
  endLocation.push(removedItem(currentLocation));
}
// function that puts all values in array a
const resetGame = (endLocation) => {
  const moveArray = endLocation.splice(0,4);
  stacks['a'] = moveArray;
}

// sees if all values are in stack c. Returns true or false
const checkForWin = (endStack, endLocation) => {
  return (endStack == 'c'&& endLocation.length == 4)  
}


function towersOfHanoi(startStack, endStack) {
  // two variables to store the stacks called by the user
  const currentLocation = stacks[startStack];
  const endLocation = stacks[endStack];

  // gameplay
    if (isEntryValid(startStack, endStack)) {
      if (isLegal(currentLocation, endLocation)) {
        movePiece(currentLocation, endLocation);
        if (checkForWin(endStack, endLocation)) {
          console.log('Winner Winner Chicken Dinner');
          resetGame(endLocation);
        }
      } else {
        console.log("Please enter a valid move");
      }
    } else {
      console.log("Please enter a, b, or c"); 
    }   
   
  }
  

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });
  // test to determine if inputs are valid
  describe('#isEntryValid', () => {
    it('should verify if the user inputs are valid: a, b, or c', () => {
      assert.equal(isEntryValid('a', 'z'), false);
      assert.equal(isEntryValid('a', 'b'), true);
      assert.equal(isEntryValid('a', 'c'), true);
      assert.equal(isEntryValid('b', 'c'), true);      
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });

    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [], c: [4, 3, 2, 1] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });
  // test to reset the game.
  describe('#resetGame()', () => {
    it('should reset the stacks object after checkForWin() is true', () => {
      stacks = { a: [4, 3, 2, 1], b: [], c: [] };
      assert.equal(resetGame(), true);
      stacks = { a: [], b: [], c: [4, 3, 2, 1] };
      assert.equal(resetGame(), false);
    });
  });

} else {

  getPrompt();

}
