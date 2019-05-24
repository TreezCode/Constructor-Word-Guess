
// Import files and packages
const Word = require("./word.js");
const inquirer = require("inquirer");
const colors = require("colors");

// GLobal Variables
const wordBank = [
  "Acai", 
  "Apple",
  "Apricot",
  "Avocado", 
  "Banana", 
  "Blackberry", 
  "Blueberry", 
  "Boysenberry", 
  "Cantaloupe", 
  "Cherry", 
  "Chili pepper", 
  "Coconut",
  "Corn kernel", 
  "Crab apples", 
  "Cranberry", 
  "Cucumber",
  "Currant", 
  "Date", 
  "Dragonfruit", 
  "Eggplant",
  "Elderberry", 
  "Fig", 
  "Goji berry", 
  "Grape", 
  "Grapefruit", 
  "Guava", 
  "Huckleberry", 
  "Jackfruit", 
  "Juniper berry", 
  "Kiwi", 
  "Kumquat", 
  "Lemon", 
  "Lime", 
  "Mango", 
  "Melon", 
  "Nectarine", 
  "Orange", 
  "Papaya", 
  "Passionfruit", 
  "Peach", 
  "Pear", 
  "Pineapple", 
  "Plantain", 
  "Plum", 
  "Pomegranate",
  "Pumpkin", 
  "Raspberry", 
  "Star apple", 
  "Star fruit", 
  "Strawberry", 
  "Tomato", 
  "Zucchini", 
];

const alphabet = "abcdefghijklmnopqrstuvwxyz";

let randomIndex = Math.floor(Math.random() * wordBank.length);
let randomWord = wordBank[randomIndex];
let cpuWord = new Word(randomWord);

let asterisk = "**********************************************************".rainbow;
let tilde =    "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~".rainbow;
let fruityIntro = "*.*.*.*.*.*.* ".rainbow;

let requireWord = false;
let wrongLetters = [];
let correctLetters = [];
let guessesLeft;
let wins = 0;
let losses = 0;

// Welcome prompt logic
function introPrompt() {

  console.log(
    asterisk + "\r\n" + "\r\n" +
    fruityIntro + "WELCOME TO FRUITY WORD GUESS ".white + fruityIntro + "\r\n" + "\r\n" +
    asterisk + "\r\n" + "\r\n"
  );
  inquirer.prompt([
    {
      type: "list",
      message: "Choose your difficulty!\r\n",
      choices: ["Easy".green, "Medium".yellow, "Hard".red],
      name: "difficulty"
    }
  ]).then(answers => {
      let diff = answers.difficulty
      if (diff === "Easy".green) {
        guessesLeft = 10;
        gameLogic();
      } else if (diff === "Medium".yellow) {
        guessesLeft = 7;
        gameLogic();
      } else {
        guessesLeft = 3;
        gameLogic();
      }
  })
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
  // Log game stats data
  cpuWord.log();
  console.log("Guesses Left: ".white + guessesLeft) + "\r\n";
  console.log("Letters Guessed: ".white + wrongLetters.join(" ")) + "\r\n";
  console.log("\r\n" + tilde);

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

          console.log("\nPlease enter a letter from A to Z... ONE at a time! >.< \n".cyan);
          gameLogic();
        } else {
          if (wrongLetters.includes(input.userInput) || correctLetters.includes(input.userInput) || input.userInput === "") {

            console.log("\nYou've already tried that letter or nothing was entered!\n".cyan);
            gameLogic();
          } 
            // User input is valid then do this logic
            else {

            let checkerArray = [];

            cpuWord.userGuess(input.userInput);
            cpuWord.objArray.forEach(wordCheck);

            if (checkerArray.join("") === wordComplete.join("")) {
              console.log("\r\n                * * * ".rainbow + "INCORRECT!".red + " * * *\r\n".rainbow);
              wrongLetters.push(input.userInput);
              guessesLeft --;
            } else {
              console.log("\r\n                * * * CORRECT! * * *\r\n".yellow);
              correctLetters.push(input.userInput);
            }

            // Handle the guesses left
            if (guessesLeft > 0) {
              gameLogic();
            } else {
              losses++;
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
    wins++;
    console.log("              * * * * ".yellow + "YOU WIN!".bgYellow.black + " * * * * \n".yellow);
    playAgain();
  }
  function completeCheck(key) {
    wordComplete.push(key.isGuessed)
  }
}

// Prompt user to play again if they win or lose
function playAgain() {
  
  console.log("                  Wins: ".yellow + wins + " Losses: ".red + losses + "\r\n");
  inquirer.prompt([
    {
      type: "list",
      message: "Play Again?".rainbow,
      choices: ["Yes", "No".red],
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
    } else {
      console.log(
        asterisk + "\r\n" + "\r\n" +
        "*.*.*.*.*.*.*.*.* ".rainbow + "THANKS FOR PLAYING".white + " *.*.*.*.*.*.*.*.*".rainbow + "\r\n" + "\r\n" +
        asterisk + "\r\n" + "\r\n"
      );
      return;
    }
  });
}
introPrompt();
