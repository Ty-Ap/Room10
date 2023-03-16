'use strict';

const { MultiSelect } = require('enquirer');
require('dotenv').config();
const PORT = 3006;
const { io } = require('socket.io-client');
const figlet = require('figlet');
const chalk = require('chalk');


async function game1(socket, playerCount = null) {
  console.clear();
  figlet(`Welcome to Room 1`, (err, data) => {
    console.log(chalk.magentaBright(data))
  });
  let arr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  let correctAnswer = [' '];
  for (let i = 0; i < 4; i++) {
    correctAnswer[i] = arr.pop();
  }

  console.log('\n\nCan you remember the 4 words that are about to be displayed?\n\nSelect the choices with Spacebar and submit with Enter')
  
  setTimeout( () => {
    console.clear();
    figlet(`Welcome to Room 1`, (err, data) => {
      console.log(chalk.magentaBright(data))
    });
    console.log(correctAnswer[0])
    }, 5000);


    
    setTimeout( () => {
      console.clear();
      figlet(`Welcome to Room 1`, (err, data) => {
        console.log(chalk.magentaBright(data))
      });
      console.log(correctAnswer[1])
    }, 7000);

    
    setTimeout( () => {
      console.clear();
      figlet(`Welcome to Room 1`, (err, data) => {
        console.log(chalk.magentaBright(data))
      });
      console.log(correctAnswer[2])
    }, 9000);

    
    setTimeout( () => {
      console.clear();
      figlet(`Welcome to Room 1`, (err, data) => {
        console.log(chalk.magentaBright(data))
      });
      console.log(correctAnswer[3])
    }, 11000);

    setTimeout( () => {
      console.clear();
      figlet(`Welcome to Room 1`, (err, data) => {
        console.log(chalk.magentaBright(data))
      });
    }, 13000);

  setTimeout(async () => {
    let answer = await new MultiSelect({

      name: 'value',
      message: 'Which days/months did you see?',
      choices: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }).run();

    answer.sort();
    correctAnswer.sort();


    

    socket.emit(`answer1`, answer.join(''), correctAnswer.join(''))
  }, 13500);
}






module.exports = game1;