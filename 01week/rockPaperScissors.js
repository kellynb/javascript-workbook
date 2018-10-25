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
  // global variables and an array
  const inputs = ['rock', 'paper', 'scissors'];
  const scrubHand1 =  hand1.toLowerCase();
  const scrubHand2 =  hand2.toLowerCase();

  let x = false;
  let y = false;

// Check to see if user inputs are valid
  for (let i=0; i < inputs.length; i++) {
    if (scrubHand1 === inputs[i]) {
        x = true;
      } 
     if (scrubHand2 === inputs[i]) {
        y = true;
      }
    }
// Outcomes of the game
    const WinState= () => {
      if ((scrubHand1 == inputs[0] || scrubHand2 == inputs[0]) && (scrubHand1 == inputs[1] || scrubHand2 == inputs[1])) {
        return "paper wins";
      } else if ((scrubHand1 == inputs[1] || scrubHand2 == inputs[1]) && (scrubHand1 == inputs[2] || scrubHand2 == inputs[2]))  {
        return "scissors wins";
      } else if ((scrubHand1 == inputs[0] || scrubHand2 == inputs[0]) && (scrubHand1 == inputs[2] || scrubHand2 == inputs[2])) {
        return "rock wins";
      } else {
        return "its a tie";
      }
    }

    // Calls winState or informs users of wrong inputs
  if (x == true && y == true) {
    return (WinState());
    } else {
    return "Invalid Inputs";
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
