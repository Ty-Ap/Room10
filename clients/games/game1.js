'use strict';

const { prompt } = require('enquirer');
require('dotenv').config();
const PORT = 3006;
const { io } = require('socket.io-client');
// const socket = io(`http://localhost:${PORT}/room10`);
const figlet = require('figlet');
const chalkAnimation = require('chalk-animation');


async function game1(socket, playerCount=null) {
  console.clear();
  figlet(`Welcome to Room 1`, (err, data) => {
    console.log(chalkAnimation.neon(data).render()) 
});
  if(playerCount){console.log(`LOOK HERE>>>>>>>>>>>>>>${playerCount}`)};
  setTimeout(async () => {
    let { answer } = await prompt({
      type: 'select',
      name: 'answer',
      message: 'Hint: it\'s the first letter of the alphabet',
      choices: ['a', 'b', 'c', 'd']
    })
    let correctAnswer = 'a'
    socket.emit(`answer9`, answer, correctAnswer)
  }, 100);
}






module.exports = game1;