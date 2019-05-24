
// Constructor to display underlying character or underscore, dependent on if user has guessed the correct letter.
function Letter(value) {
    this.character = value.toUpperCase();
    this.isGuessed = false;

    this.renderLetter = function() {
        if (this.character === " ") {
            this.isGuessed = true;
            return " ";
        } else {
            if (!this.isGuessed) {
            return "_";
            } else {            
                return this.character;
            }
        }
    };
    
    this.checkGuess = function(input) {
        if (input.toUpperCase() === this.character) {
            this.isGuessed = true;
            // return true;
        } 
    };
}
module.exports = Letter;
