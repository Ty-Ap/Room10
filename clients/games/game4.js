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
let alphabet = 'abcdefghijklmnopqrstuvwxyz';





async function game4(socket) {
  console.clear();
  figlet(`Welcome to Room 4`, (err, data) => {
    console.log(chalkAnimation.neon(data).render()) 
});
  setTimeout(async () => {
    let word = chance.state({full: true}).toLowerCase();
    let hangedWord = '';
    let lives = 5;

    for (let letter of word) {
      if (letter === ' ') {
        hangedWord += ' '
      }else {
        hangedWord += '_'

      }
    }
    while(word !== hangedWord){
      let newhangedWord = await guessLetter(word, hangedWord, lives);
      if (newhangedWord === hangedWord) {lives--;}
      hangedWord = newhangedWord
      
      if (lives < 1) {
        console.log('Sorry but you\'re out of lives. Try again with a new word');
        lives = 5
        alphabet = 'abcdefghijklmnopqrstuvwxyz'
        word = chance.state({full: true}).toLowerCase();
        hangedWord = '';
        for (let letter of word) {
          hangedWord += '_';
        }
      }
    }
    let correctAnswer = 'a'
    console.log('You got it! Get ready for the next room!')

    setTimeout(() => {
      socket.emit('answer4', word, hangedWord);
    }, 1000);


  }, 100);  

}



module.exports = game4;


async function guessLetter(word, hangedWord, lives) {
  let hangedArray = hangedWord.split('');
  answer = await prompt({
    type: 'select',
    name: 'answer',
    message: `You have ${lives} remaining. Guess one letter in this word - ${hangedWord}.`,
    choices: alphabet.split('')
  })

  for (let i = 0; i < word.length; i++) {
    if (word[i] === answer.answer) {
      hangedArray[i] = answer.answer
    }
  } 
  let removalIndex = alphabet.indexOf(answer.answer);
  let newAlphabet = alphabet.split('');
  newAlphabet.splice(removalIndex, 1);
  alphabet = newAlphabet.join('')
  return hangedArray.join('');

}


module.exports = game4;