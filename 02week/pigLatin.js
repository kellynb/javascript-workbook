'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 
// - Rules for pigLatin:
// - check if input is a string
// - change string to all lowercase.
// - check if first letter is a vowel. 
// - If a vowel, Return True. If true, return "yay" function to word. IF false, go to function consonant.
// - Identify consonants. For loop until you find a vowel.
// - Find a vowel. splice the consonants.
// - Add consonants to end of word
// - return word

// arrary of vowels
const vowels = ['a', 'e', 'i','o', 'u'];


// Function to check if first letter is a vowel and return the new recombined word
const firstLetterVowelWord = (scrubWord, evaluateWord) => {
  if (vowels.includes(evaluateWord[0])) {
    return scrubWord + "yay";
  }
}

// Function that returns the new word if its a word that starts without a vowel and contains a vowel
const firstLetterConstWord = (evaluateWord, findFirstVowel) => {
  const vowelIndex = evaluateWord.indexOf(findFirstVowel);
  const constOnly = evaluateWord.slice(0, vowelIndex);
  const restOfWord = evaluateWord.slice(vowelIndex);
  const fullNewWord = restOfWord.concat(constOnly);
  return fullNewWord.join('') + 'ay';
};

function pigLatin(word) {
  // variables that in the end stores the trimmed and lowercased word
  const trimedWord = word.trim();
  const scrubWord = trimedWord.toLowerCase();
  const evaluateWord = scrubWord.split('');

  // Variable to determine if there are no vowels in word and return true or false.
  // not sure if it should just be a function
  const noVowelInWord = evaluateWord.every((letter) => {
    return !vowels.includes(letter);
  })

  // Variable to find the first vowel in word
  // not sure if it should just be a function
  const findFirstVowel = evaluateWord.find((vowel) => {
    return vowels.includes(vowel);
  })

  if (noVowelInWord) {
    return scrubWord + 'ay';
  } else {
    return firstLetterVowelWord(scrubWord, evaluateWord) || firstLetterConstWord(evaluateWord, findFirstVowel);
  }

}

function getPrompt() {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}
