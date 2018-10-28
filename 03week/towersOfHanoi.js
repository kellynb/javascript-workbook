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

// const validEntry = ['a', 'b', 'c'];
// const currentLocation = stacks[startStack];
// const endLocation = stacks[endStack];
// const removedItem = currentLocation.pop();



// const isEntryValid = (startStack,endStack) => {
//   return validEntry.includes(startStack) && validEntry.includes(endStack);
// };

// function movePiece() {
//   endLocation.push(removedItem);
//   return stacks;
// }

// function isLegal() {
//   const lastArrayItem = endLocation[endLocation.length - 1];
//   if ((lastArrayItem > removedItem) || (endLocation.length < 1)) {
//     return movePiece();
//   } else {
//     currentLocation.push(removedItem);
//     console.log('Invalid Move');
//     return stacks;
//   }
// }

// const resetGame = () => {
//   const moveArray = endLocation.splice(0,4);
//   stacks['a'] = moveArray;
// }

// const checkForWin = (endStack) => {
//   if (endStack == 'c'&& endLocation.length == 4) {
//     console.log('Winner Winner Chicken Dinner')
//     resetGame();
//   } 
// }





function towersOfHanoi(startStack, endStack) {
  const validEntry = ['a', 'b', 'c'];
  const currentLocation = stacks[startStack];
  const endLocation = stacks[endStack];
  
  
  
  const isEntryValid = (startStack,endStack) => {
    return validEntry.includes(startStack) && validEntry.includes(endStack);
  };
  
  
  
  function isLegal() {
    const lastArrayItem = endLocation[endLocation.length - 1];
    const removedItem = currentLocation.pop();
    function movePiece() {
      endLocation.push(removedItem);
      return stacks;
    }

    if ((lastArrayItem > removedItem) || (endLocation.length < 1)) {
      return movePiece();
    } else {
      currentLocation.push(removedItem);
      console.log('Invalid Move');
      return stacks;
    }
  }
  
  const resetGame = () => {
    const moveArray = endLocation.splice(0,4);
    stacks['a'] = moveArray;
  }
  
  const checkForWin = (endStack) => {
    if (endStack == 'c'&& endLocation.length == 4) {
      console.log('Winner Winner Chicken Dinner')
      resetGame();
    } 
  }
  
  if (isEntryValid(startStack,endStack)) {
    isLegal();
    } else {
     console.log ('not valid entry'); 
    } 
  checkForWin(endStack);
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
