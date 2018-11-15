'use strict';

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

const validEntry = ['a', 'b', 'c'];

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
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
