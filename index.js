
// Import files and packages
const Word = require("./word.js");
const inquirer = require("inquirer");
const colors = require("colors");

// GLobal Variables
const wordBank = ["apple", "banana", "kiwi", "orange", "peach"];
const alphabet = "abcdefghijklmnopqrstuvwxyz";

let randomIndex = Math.floor(Math.random() * wordBank.length);
let randomWord = wordBank[randomIndex];
let cpuWord = new Word(randomWord);

let asterisk = "**********************************************************".rainbow;
let tilde =    "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".cyan;

let requireWord = false;
let wrongLetters = [];
let correctLetters = [];
let guessesLeft = 10;

// Welcome logic
function introPrompt() {
  console.log(
    asterisk + "\r\n" + "\r\n" +
    "              WELCOME TO FRUITY WORD GUESS".white + "\r\n" + "\r\n" +
    asterisk + "\r\n" + "\r\n"
  );
  
}

// Main logic
function gameLogic() {
  
  // Make cpu randomly select word from word bank
  if (requireWord) {

    let randomIndex = Math.floor(Math.random() * wordBank.length);
    let randomWord = wordBank[randomIndex];
    cpuWord = new Word(randomWord);
    requireWord = false;
  }
  cpuWord.log();

  // Store the word that is completed
  let wordComplete = [];
  cpuWord.objArray.forEach(completeCheck);

  // Begin user prompt if the word is not complete
  if (wordComplete.includes(false)) {
    inquirer.prompt([
      {
        type: "input",
        message: "Guess a letter from A to Z  ".white + "=>" ,
        name: "userInput"
      }
    ]).then(input => {

        // Validate user input
        if (!alphabet.includes(input.userInput) || input.userInput.length > 1) {

          console.log("Please enter a valid letter... ONE at a time! >.< ");
          gameLogic();
        } else {
          if (wrongLetters.includes(input.userInput) || correctLetters.includes(input.userInput) || input.userInput === "") {

            console.log("\nYou've already tried that letter or nothing was entered!\n");
            gameLogic();
          } else {

            let checkerArray = [];
            cpuWord.userGuess(input.userInput);
            cpuWord.objArray.forEach(wordCheck);

            if (checkerArray.join("") === wordComplete.join("")) {
              console.log("\r\n                * * * INCORRECT! * * *\r\n".red);
              wrongLetters.push(input.userInput);
              guessesLeft --;
            } else {
              console.log("\r\n                * * * CORRECT! * * *\r\n".yellow);
              correctLetters.push(input.userInput);
            }

            console.log("Guesses Left: ".white + guessesLeft) + "\r\n";
            console.log("Letters Guessed: ".white + wrongLetters.join(" ")) + "\r\n";
            console.log("\r\n" + tilde);

            // Handle the guesses left
            if (guessesLeft > 0) {
              gameLogic();
            } else {
              console.log("              * * * * ".red + "GAME OVER!".bgRed.black + " * * * * \n".red);
              playAgain();
            }
            function wordCheck(key) {
              checkerArray.push(key.isGuessed);
            }
          }
        }
    });
  } else {
    console.log("              * * * * ".yellow + "YOU WIN!".bgYellow.black + " * * * * \n".yellow);
    playAgain();
  }
  function completeCheck(key) {
    wordComplete.push(key.isGuessed)
  }
}

function playAgain() {
  inquirer.prompt([
    {
      type: "list",
      message: "Play Again?",
      choices: ["Yes", "No"],
      name: "restart"
    }
  ])
  .then(input => {
    if (input.restart === "Yes") {
      requireWord = true;
      wrongLetters = [];
      correctLetters = [];
      guessesLeft = 10;
      introPrompt();
      gameLogic();
    } else {
      return;
    }
  });
}
introPrompt()
gameLogic();




















