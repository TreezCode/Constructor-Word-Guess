
// Import letter.js
const Letter = require("./letter.js")
const colors = require("colors")

let tilde =    "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".rainbow;

function Word(answer) {
    this.objArray = [];

    for (let i = 0; i < answer.length; i++) {
        let letter = new Letter(answer[i]);
        this.objArray.push(letter);
    }
    
    this.log = function() {
        answerLog = "";
        for (let i = 0; i < this.objArray.length; i++) {
            answerLog += this.objArray[i].renderLetter() + " ";
        }
        console.log("\nWord to Guess: ".blue + answerLog, "\n" + tilde + "\n");
    };

    this.userGuess = function(input) {
        for (let i = 0; i < this.objArray.length; i++) {
            this.objArray[i].checkGuess(input);
        }
    };
}
module.exports = Word;
