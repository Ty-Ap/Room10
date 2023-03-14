'use strict';
const { prompt } = require('enquirer');
const Chance = require('chance');
let chance = new Chance();
require('dotenv').config();
const PORT = 3006;
const { io } = require('socket.io-client');
// const socket = io(`http://localhost:${PORT}/room10`);
const figlet = require('figlet');
const chalkAnimation = require('chalk-animation');

async function game2(socket) {
  console.clear();
  figlet(`Welcome to Room 2`, (err, data) => {
    console.log(chalkAnimation.neon(data).render())
});
  let word = chance.state({full: true}).toLowerCase();
  let correctAnswer = word;
  let scramble = '';
  while (word.length > 0) {
    let i = Math.floor(Math.random() * word.length);
    scramble += word[i];
    word = word.slice(0, i) + word.slice(i + 1);
  }
let { answer } = await prompt({
  type: 'input',
  name: 'answer',
  message: `Find the following word by rearranging the letters:   ${scramble}\n\n\n\n`
})
socket.emit('answer2', answer, correctAnswer)

// if (correctAnswer === answer) {
//   console.log('Good Job!')
// } else {
//   console.log('Sorry play again')
//   setTimeout(async () => {
//     console.clear();
//     game();
//   }, 2000);
// }
}
// game();

module.exports = game2;



















module.exports = game2;