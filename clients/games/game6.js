'use strict';

const { prompt } = require('enquirer');
require('dotenv').config();
const PORT = process.env.PORT || 3006;
const { io } = require('socket.io-client');
// const socket = io(`http://localhost:${PORT}/room60`);
const figlet = require('figlet');
const chalkAnimation = require('chalk-animation');
const Chance = require('chance');
const chance = new Chance();
let answer = null;
let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');





async function game6(socket) {
  console.clear();
  figlet(`Welcome to Room 6`, (err, data) => {
    console.log(chalkAnimation.neon(data).render()) 
});
  setTimeout(async () => {
    for (let letter of word) {
      hangedWord += '_'
    }
    while(word !== hangedWord){
      answer = await prompt({
        type: 'select',
        name: 'answer',
        message: `Guess one letter in this word - ${hangedWord}`,
        choices: alphabet
      })
    }
    let correctAnswer = 'a'
    socket.emit(`answer6`, answer, correctAnswer)
  }, 100);
}





module.exports = game6;


function guessLetter() {
  let word = chance.word();
  let hangedWord = '';

}



















module.exports = game6;