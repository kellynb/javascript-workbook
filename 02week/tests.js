// Tests

if (typeof describe === 'function') {

    describe('#rockPaperScissors()', () => {
      it('should detect a tie', () => {
        assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
        assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
        assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
      });

      it('should verify that hand input is valid after scrubbing to ensure lowercase with "trim"ed whitepace', () => {
        assert.equal(rockPaperScissors('rocks', 'paper'), "Invalid Inputs");
        assert.equal(rockPaperScissors('papers', 'paper'), "Invalid Inputs");
        assert.equal(rockPaperScissors('sciss0rs', 'scissors!'), "Invalid Inputs");
      });

      it('should detect which hand won', () => {
        assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
        assert.equal(rockPaperScissors('scissors', 'rock'), "Hand two wins!");
        assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
        assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
        assert.equal(rockPaperScissors('scissors', 'paper'), "Hand one wins!");
        assert.equal(rockPaperScissors('paper', 'rock'), "Hand one wins!");
      });

      it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
        assert.equal(rockPaperScissors('rOcK', ' paper '), "Hand two wins!");
        assert.equal(rockPaperScissors('Paper', 'SCISSORS'), "Hand two wins!");
        assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), "Hand one wins!");
      });

      it('should switch to Hand2 after Hand1 entered input', () => {
        assert.equal(rockPaperScissors('rock', ' paper '), "Hand two wins!");
        assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
        assert.equal(rockPaperScissors('scissors', 'rock'), "Hand two wins!");
      });

      it('should restart after WinState or Invalid Input is declared', () => {
        assert.equal(rockPaperScissors('rock', ' papers'), "Invalid Input");
        assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
        assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
        // not sure how to test for this scenario other than playing the game and seeing if it restarts
      });
    });
  } else {
  
    getPrompt();
  
  }