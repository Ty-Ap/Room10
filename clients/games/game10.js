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





async function game10(socket) {
  console.clear();
  figlet(`Welcome to Room 10`, (err, data) => {
    console.log(chalkAnimation.neon(data).render()) 
});
  setTimeout(async () => {
    socket.emit('get-messages');
    socket.on('send-messages', (messageQueue) => {
      for (let message of messageQueue) {
        console.log(`${message.timeStamp} - ${message.username}: ${message.message}`)
      }
    });

  }, 100);

}



module.exports = game10;