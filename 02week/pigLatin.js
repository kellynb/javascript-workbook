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

// functions:
// 1. checkValidity (checks input for a string)
// 2. firstLetterVowel (check if first letter is a vowel)
// 3. checkforconst (for loop identifying all consonants until return vowel. chops up word into new word) 



const vowels = ['a', 'e', 'i','o', 'u'];

function pigLatin(word) {
  const trimedWord = word.trim();
  const scrubWord = trimedWord.toLowerCase();
  const evaluateWord = scrubWord.split('');

  const firstLetterVowelWord = () => {
    if (vowels.includes(evaluateWord[0])) {
      return scrubWord + "yay";
    }
  }

  const noVowelInWord = evaluateWord.every((letter) => {
    return !vowels.includes(letter);
  })

  const findFirstVowel = evaluateWord.find((vowel) => {
    return vowels.includes(vowel);
  })

  const firstLetterConstWord = (findFirstVowel) => {
    const vowelIndex = evaluateWord.indexOf(findFirstVowel);
    const constOnly = evaluateWord.slice(0, vowelIndex);
    const restOfWord = evaluateWord.slice(vowelIndex);
    const fullNewWord = restOfWord.concat(constOnly);
    return fullNewWord.join('') + 'ay';
  };

  if (noVowelInWord) {
    return scrubWord + 'ay';
  } else {
    return firstLetterVowelWord() || firstLetterConstWord(findFirstVowel);
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
