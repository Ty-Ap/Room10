'use strict'

require('dotenv').config();
const game1 = require('./games/game1');
const game2 = require('./games/game2');
const game3 = require('./games/game3');
const game5 = require('./games/game5');
const PORT = 3006;

const { io } = require('socket.io-client');
const socket = io(`http://localhost:${PORT}/room10`);
const { prompt } = require('enquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const chalkAnimation = require('chalk-animation');





let timer = 1;
let verifiedUser = {username: 'guest'};




socket.on('main-menu', mainMenu);
socket.on('start-game', async (user) => {
  if (user) {
    verifiedUser = user;
  }
  console.log(`Get ready to begin ${verifiedUser.username}`);
  setInterval(advanceTimer, 1000);
});

socket.on('game1', () => game1(socket) );
socket.on('game1-retake', () => game1(socket));
socket.on('game2', () => game2(socket));
socket.on('game2-retake', () => game2(socket));

socket.on('game3', () => game3(socket));
socket.on('game3-retake', () => game3(socket));

socket.on('game4', () => {
  multipleChoice(4);
});
socket.on('game4-retake', () => {
  multipleChoice(4);
});

socket.on('game5', () => game5(socket));
socket.on('game5-retake', () => game5(socket));

socket.on('game6', () => {
  multipleChoice(6);
});
socket.on('game6-retake', () => {
  multipleChoice(6);
});
socket.on('game7', () => {
  multipleChoice(7);
});
socket.on('game7-retake', () => {
  multipleChoice(7);
});
socket.on('game8', () => {
  multipleChoice(8);
});
socket.on('game8-retake', () => {
  multipleChoice(8);
});
socket.on('game9', () => {
  multipleChoice(9);
});
socket.on('game9-retake', () => {
  multipleChoice(9);
});
socket.on('game10', () => {
  multipleChoice(10);
});
socket.on('game10-retake', () => {
  multipleChoice(10);
});
socket.on('winner', () => {
  console.log('NEVER GONNA GIVE YOU UP');
})

async function mainMenu() {
  let { haveAccount } = await prompt({
    type: 'input',
    name: 'haveAccount',
    message: 'Press 1 if you want to sign into an existing account.\n  Press 2 if you want to create an account.\n  Press 3 if you want to continue as a guest.\n\n\n',
  });

  if (haveAccount === '1') {
    let credentials = await getCredentials();
    socket.emit('login', credentials);
  } else if (haveAccount === '2') {
    let credentials = await getCredentials();
    socket.emit('create-account', credentials);
  } else if (haveAccount === '3') {
    console.log('Continuing as guest');
    socket.emit('continue-guest');
  } else {
    mainMenu();
  }
}

async function getCredentials() {
  let { username } = await prompt({
    type: 'input',
    name: 'username',
    message: 'Please enter your username'
  })
  
  let { password } = await prompt({
    type: 'input',
    name: 'password',
    message: 'Please enter your password'
  })

  let credentials = { username, password };
  return credentials

}

function advanceTimer() {
  if (timer > 0) {
    console.clear();
    console.log(timer);
  }
  timer -= 1;
}

async function multipleChoice(roomNum) {
  console.clear();
  figlet(`Welcome to Room ${roomNum}`, (err, data) => {
    console.log(chalkAnimation.neon(data).render()) 
});
  setTimeout(async () => {
    let { answer } = await prompt({
      type: 'input',
      name: 'answer',
      message: 'Hint: it\'s the first letter of the alphabet'
    })
    console.log(timer * -1);
    let correctAnswer = 'a'
    socket.emit(`answer${roomNum}`, answer, correctAnswer)
  }, 100);
}

// async function signup
// function continueGuest
