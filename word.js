
// Import letter.js
const Letter = require("./letter.js")
const colors = require("colors")

let tilde =    "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".rainbow;

function Word(answer) {
    
    // Create new Letter objects array
    this.objArray = [];
    for (let i = 0; i < answer.length; i++) {
        let letter = new Letter(answer[i]);
        this.objArray.push(letter);
    }
    
    // Iterate through objects and run renderLetter on each item then log the output
    this.log = function() {
        answerLog = "";
        for (let i = 0; i < this.objArray.length; i++) {
            answerLog += this.objArray[i].renderLetter() + " ";
        }
        console.log("\nWord to Guess: ".blue + answerLog, "\n" + tilde + "\n");
    };

    // Iterate through objects and run checkGuess on each item
    this.userGuess = function(input) {
        for (let i = 0; i < this.objArray.length; i++) {
            this.objArray[i].checkGuess(input);
        }
    };
}
module.exports = Word;
