'use strict';

const { prompt } = require('enquirer');
require('dotenv').config();
const PORT = 3006;
const figlet = require('figlet');
const chalkAnimation = require('chalk-animation');
const chalk = require('chalk');
const inputs = ['X', 'O'];
let available = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
// const available = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let row1 = ['1', '2', '3'];
let row2 = ['4', '5', '6'];
let row3 = ['7', '8', '9'];
let col1 = [row1[0], row2[0], row3[0]];
let col2 = [row1[1], row2[1], row3[1]];
let col3 = [row1[2], row2[2], row3[2]];
let diag1 = [row1[0], row2[1], row3[2]];
let diag2 = [row1[2], row2[1], row3[0]];
// const winningCombos = [row1, row2, row3, col1, col2, col3, diag1, diag2]
let matrix = [row1, row2, row3];
let winningCombos = [
  [matrix[0][0], matrix[0][1], matrix[0][2]],
  [matrix[1][0], matrix[1][1], matrix[1][2]],
  [matrix[2][0], matrix[2][1], matrix[2][2]],
  [matrix[0][0], matrix[1][0], matrix[2][0]],
  [matrix[0][1], matrix[1][1], matrix[2][1]],
  [matrix[0][2], matrix[1][2], matrix[2][2]],
  [matrix[0][0], matrix[1][1], matrix[2][2]],
  [matrix[0][2], matrix[1][1], matrix[2][0]],
]
let winner = false;


async function game8(socket) {
  console.clear();
  figlet(`Welcome to Room 8`, (err, data) => {
    console.log(chalk.blue(data))
  });
  setTimeout(async () => {
    while (!winner) {
      await playGame();
    }
    setTimeout(() => {
      socket.emit(`answer8`, 'winner', 'winner');
    }, 2500);
  }, 100);
}


module.exports = game8;

async function playGame() {
  console.log(matrix[0])
  console.log(matrix[1])
  console.log(matrix[2])
  let { answer } = await prompt({
    type: 'select',
    name: 'answer',
    message: 'It\'s Tic-Tac-Toe! Choose your square. ',
    choices: [
      ...matrix[0].filter(element => inputs.indexOf(element) === -1),
      ...matrix[1].filter(element => inputs.indexOf(element) === -1),
      ...matrix[2].filter(element => inputs.indexOf(element) === -1),
    ]
  })
  let removalIndex = available.indexOf(answer);
  available.splice(removalIndex, 1);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === answer) {
        matrix[i][j] = 'X'
      }
    }
  }
  // checkForWinner();

  if (available.length > 0) {
    let cpuMove = available[Math.floor(Math.random() * available.length)];
    removalIndex = available.indexOf(cpuMove);
    available.splice(removalIndex, 1);

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === cpuMove) {
          matrix[i][j] = 'O'
        }
      }
    }
  } await checkForWinner();
}


async function checkForWinner() {
  winningCombos = [
    [matrix[0][0], matrix[0][1], matrix[0][2]],
    [matrix[1][0], matrix[1][1], matrix[1][2]],
    [matrix[2][0], matrix[2][1], matrix[2][2]],
    [matrix[0][0], matrix[1][0], matrix[2][0]],
    [matrix[0][1], matrix[1][1], matrix[2][1]],
    [matrix[0][2], matrix[1][2], matrix[2][2]],
    [matrix[0][0], matrix[1][1], matrix[2][2]],
    [matrix[0][2], matrix[1][1], matrix[2][0]],
  ]
  for (let combo of winningCombos) {
    if (combo[0] === combo[1] && combo[1] === combo[2]) {
      if (combo[0] === 'X') {
        winGame(); 
        break;
      }
      if (combo[0] === 'O') {
        await loseGame(); 
        break;
      }
    }
  }
  if (!winner && available.length === 0) loseGame();
}

function winGame() {
  winner = true;
  console.log(matrix[0])
  console.log(matrix[1])
  console.log(matrix[2])
  console.log('3 in a Row! You win! Get ready for the next room');
}

async function loseGame() {
  console.log(matrix[0])
  console.log(matrix[1])
  console.log(matrix[2])
  console.log('Sorry you have to try again.')
  row1 = ['1', '2', '3'];
  row2 = ['4', '5', '6'];
  row3 = ['7', '8', '9'];
  matrix = [row1, row2, row3];
  available = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  winningCombos = [
    [matrix[0][0], matrix[0][1], matrix[0][2]],
    [matrix[1][0], matrix[1][1], matrix[1][2]],
    [matrix[2][0], matrix[2][1], matrix[2][2]],
    [matrix[0][0], matrix[1][0], matrix[2][0]],
    [matrix[0][1], matrix[1][1], matrix[2][1]],
    [matrix[0][2], matrix[1][2], matrix[2][2]],
    [matrix[0][0], matrix[1][1], matrix[2][2]],
    [matrix[0][2], matrix[1][1], matrix[2][0]],
  ];
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.clear();
  await new Promise(resolve => setTimeout(resolve, 1000));
}