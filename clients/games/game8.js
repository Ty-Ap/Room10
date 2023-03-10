'use strict';

const { prompt } = require('enquirer');
require('dotenv').config();
const PORT = 3006;
const figlet = require('figlet');
const chalkAnimation = require('chalk-animation');
const chalk = require('chalk');
const inputs = ['X', 'O'];
const available = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
// const available = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const row1 = ['1', '2', '3'];
const row2 = ['4', '5', '6'];
const row3 = ['7', '8', '9'];
const col1 = [row1[0], row2[0], row3[0]];
const col2 = [row1[1], row2[1], row3[1]];
const col3 = [row1[2], row2[2], row3[2]];
const diag1 = [row1[0], row2[1], row3[2]];
const diag2 = [row1[2], row2[1], row3[0]];
const matrix = [row1, row2, row3];
let winner = false;


async function game8(socket) {
  console.clear();
  figlet(`Welcome to Room 8`, (err, data) => {
    console.log(chalk.blue(data)) 
});
  setTimeout(async () => {
    while(!winner) {
      await playGame();
    }

    let correctAnswer = 'a'
    socket.emit(`answer8`, answer, correctAnswer)
  }, 100);
}


module.exports = game8;

async function playGame() {
  console.log(row1)
  console.log(row2)
  console.log(row3)
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
  let cpuMove = available[Math.floor(Math.random() * available.length)];
  console.log(cpuMove, answer);
  removalIndex = available.indexOf(cpuMove);
  available.splice(removalIndex, 1);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === cpuMove) {
        matrix[i][j] = 'O'
      }
    }
  }
}