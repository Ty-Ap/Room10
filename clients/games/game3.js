'use strict';
const { prompt } = require('enquirer');
const Chance = require('chance');
let chance = new Chance();
require('dotenv').config();
const PORT = 3006;
const { io } = require('socket.io-client');
// const socket = io(`http://localhost:${PORT}/room10`);
const figlet = require('figlet');
const chalk = require('chalk');

async function game3(socket) {
  console.clear();
  figlet(`Welcome to Room 3`, (err, data) => {
    console.log(chalk.red(data))
});

let int1 = chance.integer({min: 1, max: 5 })
let int2 = chance.integer({min: 1, max: 5 })
let ans = chance.integer({min: 1, max: 5 })
const colorArr = ['red', 'magenta', 'yellow', 'green', 'blue']
let correctAnswer = colorArr[+ans-1];

let { answer } = await prompt({
  type: 'select',
  name: 'answer',
  message: `\nIn this paragraph you will see ${chalk.red('certain')} words in different colors. \nDisregarding ${chalk.magenta('words')} that are white, solve the following ${chalk.yellow('equation')} \nand with the answer count that amount of ${chalk.green('colored')} words from the beginning. \nType ${chalk.blue('the')} color of the word you land on: \n\n

  Two cyclists start ${int1} miles apart, and begin cycling towards each other at ${int2} mph.\n
  The instant they begin, a fly goes from one cyclist to the other, then back to the first cyclist,\n
  and so on, always flying between the cyclists. The fly flies at a constant ${ans} mph. How far in \n
  total does the fly travel when the cyclists meet? \n\n\n\n`,

  choices: ['red', 'magenta', 'yellow', 'green', 'blue']

})
socket.emit('answer3', answer, correctAnswer)

}



module.exports = game3;