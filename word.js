
// Import letter.js
const Letter = require("./letter.js")

// Constructor to create an object for the current word the user is attempting to guess
function Word(string) {
    this.string = string;
    
    // Build an object to store data for each Letter
    this.buildLetters = function (string) {
        let letters = [];
        string.split("").forEach(character => {
            var newLetter = new Letter(character);
            letters.push(newLetter);
        });
        console.log(letters);
        return letters;
    }

    // Store Letter objects
    this.letters = this.buildLetters(this.string);

    // Testing
    console.log(this.letters);
    
    // Check user input by passing character through checkGuess() and then display the results by calling updateWord()
    this.userGuess = function(character) {
        this.letters.forEach(letter => {
            if(letter.character !== " ") {
                letter.checkGuess(character);
            }
        }); 
        this.updateWord();
    }
     
    // Update word with user input by concatinating and passing through renderLetter()
    this.updateWord = function() {
        let printWord = "";
        this.letters.forEach(letter => {
            printWord += letter.renderLetter() + " "
        });
        console.log(printWord);
        return printWord
    }
}

// Testing
var testWord = new Word("Treez");
console.log(testWord.userGuess("t"));

module.exports = Word;