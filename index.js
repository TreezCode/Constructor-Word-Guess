
// Import Word
var Word = require("./word.js");
var inquirer = require("inquirer");

// GLobal
var wordBank = ["apple", "banana", "kiwi", "orange", "peach"];
var currentWord = new Word

function resetGame() {
    guessesLeft = 10;
    wrongGuesses = [];
}

function randomizeWord() {
    
    var newWord = Math.floor(Math.random() * wordBank.length);
    console.log(newWord);
    
}
randomizeWord();



