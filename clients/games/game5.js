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



console.log('\n\n\n who am i? \n\n\n');


let { answer } = await prompt({
  type: 'select',
  name: 'answer',
  message: `${chalkAnimation.radar(`asdjbfvipIMajnpivhabnviqTHEpbkjadmbfouaoufbdTRASHvniadfiupbvnpibMANag`)} `,
  choices: ['red', 'magenta', 'yellow', 'green', 'blue']

})


socket.emit('answer5', answer, correctAnswer)


}

module.exports = game5;