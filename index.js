
// Import Word
const Word = require("./word.js");
const inquirer = require("inquirer");

// GLobal
const wordBank = ["apple", "banana", "kiwi", "orange", "peach"];
let guessesLeft;
let wrongGuesses;
let currentWord;

function resetGame() {
    guessesLeft = 10;
    wrongGuesses = [];
    currentWord = ""
}

// Randomly selects a word and uses the Word constructor to store it
function randomizeWord() {
    let index = Math.floor(Math.random() * wordBank.length);
    let newWord = wordBank[index];
    currentWord = new Word(newWord)

    // Testing
    console.log(currentWord.string);
    console.log(currentWord.userGuess("p"));
}
randomizeWord();


inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
  });