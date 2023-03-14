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
const chalkAnimation = require('chalk-animation');

async function game5(socket) {
  console.clear();
  figlet(`Welcome to Room 5`, (err, data) => {
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
  message: `this is a sentence ${chalkAnimation.radar('testtestetstetstetsetstestestetstest')} `,
  choices: ['red', 'magenta', 'yellow', 'green', 'blue']

})
socket.emit('answer5', answer, correctAnswer)

}

module.exports = game5;