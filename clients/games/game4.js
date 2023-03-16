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
let chosenArray = [];

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
        console.log(`Sorry but you're out of lives. The word was ${word}`);
        console.log('Please try again');
        lives = 5
        chosenArray = [];
        word = chance.state({full: true}).toLowerCase();
        hangedWord = '';
        for (let letter of word) {
          if (letter === ' ') {
            hangedWord += ' '
          }else {
            hangedWord += '_'
    
          }
        }
      }
    }
    console.log('You got it! Get ready for the next room!')

    setTimeout(() => {
      socket.emit('answer4', word, hangedWord);
    }, 1000);


  }, 100);  

}

module.exports = game4;


async function guessLetter(word, hangedWord, lives) {
  if (chosenArray.length > 1) console.log(`So far you have chosen ${chosenArray}`)
  let hangedArray = hangedWord.split('');
  answer = await prompt({
    type: 'input',
    name: 'answer',
    message: `You have ${lives} remaining. Guess one letter in this word - ${hangedWord}.`,
  })

  while(answer.answer.length > 1 || chosenArray.includes(answer.answer)) {
    if (answer.answer.length > 1) {
    console.log('Please enter one letter at a time to proceed.')
    } else if (chosenArray.includes(answer.answer)) {
      console.log(`Please pick a new letter. So far you have chosen ${chosenArray}`);
    }
    answer = await prompt({
      type: 'input',
      name: 'answer',
      message: `You have ${lives} lives remaining. Guess one letter in this word - ${hangedWord}.`,
    })  
  }

  answer.answer = answer.answer.toLowerCase();

  chosenArray.push(answer.answer);


  for (let i = 0; i < word.length; i++) {
    if (word[i] === answer.answer) {
      hangedArray[i] = answer.answer
    }
  } 
  return hangedArray.join('');

}
