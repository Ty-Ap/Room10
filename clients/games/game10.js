'use strict';

const { prompt } = require('enquirer');
require('dotenv').config();
const PORT = process.env.PORT || 3006;
const { io } = require('socket.io-client');
// const socket = io(`http://localhost:${PORT}/room60`);
const figlet = require('figlet');
const chalk = require('chalk')
const Chance = require('chance');
const chance = new Chance();
let awaitingPrompt = false





async function game10(socket, verifiedUser) {
  console.clear();
  figlet(`Welcome to Room 10`, (err, data) => {
    console.log(chalk.yellow(data)) 
});
  console.log('\n\n\n', verifiedUser.bestScore);
  setTimeout(async () => {
    socket.emit('get-messages');
    socket.on('send-messages', (messageQueue) => {
      for (let message of messageQueue) {
        console.log(`${message.timeStamp} - ${message.username}: ${message.message}`)
      }
    });
    socket.on('room-message-server', (messageObject) => {
      console.log(`${messageObject.timeStamp} - ${messageObject.username}: ${messageObject.message}`)
      if (!awaitingPrompt) {
        chatLoop(socket, verifiedUser);
      }
    });

    setTimeout( async () => {
      await chatLoop(socket, verifiedUser);
    }, 200);


  }, 10000);

}



module.exports = game10;


async function chatLoop(socket, verifiedUser) {
  awaitingPrompt = true
  let { chat } = await prompt({
    type: 'input',
    name: 'chat',
    message: '>'
  })


  if (chat) {
    awaitingPrompt = false
    socket.emit('room-message-client', chat, verifiedUser);
  }
}