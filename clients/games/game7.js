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

async function game7(socket) {
  console.clear();
  figlet(`Welcome to Room 7`, (err, data) => {
    console.log(chalk.yellow(data))
});
 
  let gameOptions = ['rock', 'paper', 'scissors']
  let opponent = gameOptions[Math.floor(Math.random() * (gameOptions.length))];
  let correctAnswer = true;
 

  let insultArr = ["Looks like you're all thumbs today!","Better stick to tic-tac-toe!","I heard you're a pro at coin flipping.","Are you playing blindfolded? I can't tell!","I thought this was a rock-paper-scissors competition, not a paper-scissors-paper competition!","You're making it too easy for me!","You might as well give up now!","I bet you're regretting your choice already.","I don't even need to look at my hand to beat you!","Is it opposite day? Because you're throwing all the wrong moves!"
]
  
let insult = insultArr[Math.floor(Math.random() * (insultArr.length))];


let { answer } = await prompt({
  type: 'select',
  name: 'answer',
  message: `Rock, Paper, Scissors.... GO!\n\n\n\n`,
  choices: ['rock', 'paper', 'scissors']
})



if (opponent === 'rock'){
  if (answer === 'paper'){
    console.log ('You won?! That was quick... You must have cheated')
    answer = true;
  } else {
    console.log(insult)
    answer = false;
  }

} 
if (opponent === 'paper'){
  if (answer === 'scissors'){
    console.log ('You won?! That was quick... You must have cheated');
    answer = true;
  } else {
    console.log(insult)
    answer = false;
  }

}if (opponent === 'scissors'){
  if (answer === 'rock'){
    console.log ('You won?! That was quick... You must have cheated');
    answer = true;
  } else {
    console.log(insult);
    answer = false;
  }

}

setTimeout(async () => {
socket.emit('answer7', answer, correctAnswer)

}, 5000);
}
module.exports = game7;
