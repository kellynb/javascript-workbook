'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// hand1 input rock,paper,scissors
// check if input is valid (strings of rock, paper, scissors)
// hand2 input rock,paper,scissors
// check if input is valid
// Check for a winner or tie ()


function rockPaperScissors(hand1, hand2) {
  // array of acceptable inputs
  const validInputs = ['rock', 'paper', 'scissors'];

  // variables to hold hand inputs after trimmed and lowercased
  const trimHand1 = hand1.trim();
  const scrubHand1 = trimHand1.toLowerCase();
  const trimHand2 = hand2.trim();
  const scrubHand2 = trimHand2.toLowerCase();

  // index of each input after input's have been trimmed and lowercased
  const indexOfHand1 = validInputs.indexOf(scrubHand1);
  const indexOfHand2 = validInputs.indexOf(scrubHand2);

// Check to see if user inputs are valid
    const isHand1Valid = (indexOfHand1) => {
      return indexOfHand1 !== -1;
    }
  
    const isHand2Valid = (indexOfHand2) => {
      return indexOfHand2 !== -1;
    }

// check for winning plays for Hand1 and Hand 2
    const winStateforHand1 = (indexOfHand1, indexOfHand2) => {
      return (indexOfHand1 == 0 && indexOfHand2 == 2) || (indexOfHand1 == 1 && indexOfHand2 == 0) || (indexOfHand1 == 2 && indexOfHand2 == 1);
    }

    const winStateforHand2 = (indexOfHand1, indexOfHand2) => {
      return (indexOfHand2 == 0 && indexOfHand1 == 2) || (indexOfHand2 == 1 && indexOfHand1 == 0) || (indexOfHand2 == 2 && indexOfHand1 == 1);
    }
// Gameplay
    if (isHand1Valid(indexOfHand1)) {
      if (isHand2Valid(indexOfHand2)) {
        if (winStateforHand1(indexOfHand1,indexOfHand2)) {
          return "Hand one wins!"
        } else if (winStateforHand2(indexOfHand1, indexOfHand2)) {
          return "Hand two wins!"
        } else {
          return "It's a tie!"
        }
      } else {
        return "Hand 2 enter a valid input"
      }
     } else {
      return "Hand 1 enter a valid input"
     }
   


}

 

function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {
      console.log(rockPaperScissors(answer1, answer2));
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#rockPaperScissors()', () => {
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
      assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
      assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
    });
    it('should detect which hand won', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
    });
    it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
      assert.equal(rockPaperScissors('rOcK', ' paper '), "Hand two wins!");
      assert.equal(rockPaperScissors('Paper', 'SCISSORS'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), "Hand one wins!");
    });
  });
} else {

  getPrompt();

}
