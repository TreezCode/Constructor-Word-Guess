
// Constructor to display underlying character or underscore, dependent on if user has guessed the correct letter.
function Letter(character) {
    this.character = character.toUpperCase();
    this.isGuessed = false;

    this.renderLetter = function() {
        if(this.character === " ") {
            return " "
        } else if (!this.isGuessed) {
            return "_";
        } else {            
            return this.character;
        }
    }
    
    this.checkGuess = function(input) {
        if (input.toUpperCase() === this.character) {
            this.isGuessed = true;
            return true;
        } else {
            this.isGuessed = false
            return false;
        }
    }
}

// Testing
// var test = new Letter("g");
// console.log(test.checkGuess("f"));
// console.log(test.renderLetter("f"));
module.exports = Letter;

