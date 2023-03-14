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

let abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let ABC = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

let word = '';
let scramble = '';
let correctAnswer = '';

for (let i = 0; i < 5; i++){
  let rand = Math.floor(Math.random() * (ABC.length -1));
  word += ABC[rand]
}
correctAnswer = word;
for (let i = 0; i < 44; i++){
  let rand = Math.floor(Math.random() * (abc.length -1));
  word += abc[rand]
}

while (word.length > 0) {
  let i = Math.floor(Math.random() * word.length);
  scramble += word[i];
  word = word.slice(0, i) + word.slice(i + 1);
}


console.log('\n\n\n Input the capital letters that appear in the following cypher (do not use spaces): \n\n\n');


let { answer } = await prompt({
  type: 'input',
  name: 'answer',
  message: `${chalkAnimation.radar(`${scramble}\n\n\n\n`)} `,


})

answer = answer.split('').sort().join('').toLowerCase();
correctAnswer = correctAnswer.split('').sort().join('').toLowerCase();

socket.emit('answer5', answer, correctAnswer);


}





module.exports = game5;