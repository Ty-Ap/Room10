'use strict'

require('dotenv').config();
const game1 = require('./games/game1');
const game2 = require('./games/game2');
const game3 = require('./games/game3');
const game4 = require('./games/game4');
const game5 = require('./games/game5');
const game6 = require('./games/game6');
const game7 = require('./games/game7');
const game8 = require('./games/game8');
const game9 = require('./games/game9');
const game10 = require('./games/game10');
const PORT = 3006;


const { io } = require('socket.io-client');
const socket = io(`https://room-10-practice.onrender.com/room10`);
const { prompt } = require('enquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const chalkAnimation = require('chalk-animation');
const Chance = require('chance');
const chance = new Chance();




let timer = 5;
let verifiedUser = {username: chance.name() + ' (Guest)', isGuest: true};




socket.on('main-menu', mainMenu);
socket.on('start-game', async (user) => {
  if (user) {
    verifiedUser = user;
  }

  figlet(`GODSPEED\n\n ${verifiedUser.username}`, (err, data) => {
    console.log(chalk.red(data));
});
  if (verifiedUser.bestScore) {
    figlet(`Hi-Score: ${verifiedUser.bestScore}`, (err, data) => {
      console.log(chalk.red(data));
  });
  };
  setTimeout(() => {
    setInterval(advanceTimer, 1000);
  }, 5000);
});


socket.on('game1', (roomCount) => game1(socket, roomCount) );
socket.on('game1-retake', () => game1(socket));
socket.on('game2', () => game2(socket));
socket.on('game2-retake', () => game2(socket));

socket.on('game3', () => game3(socket));
socket.on('game3-retake', () => game3(socket));

socket.on('game4', () => game4(socket));
socket.on('game4-retake', () => game4(socket));

socket.on('game5', () => game5(socket));
socket.on('game5-retake', () => game5(socket));

socket.on('game6', () => game6(socket));
socket.on('game6-retake', () => game6(socket));

socket.on('game7', () => game7(socket));
socket.on('game7-retake', () => game7(socket));

socket.on('game8', () => game8(socket));
socket.on('game8-retake', () => game8(socket));

socket.on('game9', () => game9(socket));
socket.on('game9-retake', () => game9(socket));

socket.on('game10', (leaderboard) => {
  if(!verifiedUser.isGuest) {
    updateBestScore();
  }
  game10(socket, verifiedUser, leaderboard)
});
socket.on('game10-retake', () => game10(socket, verifiedUser));

async function mainMenu(error=null) {
  console.clear();
  figlet(`Room 10`, (err, data) => {
    console.log(chalk.greenBright(data)) 
    setTimeout(() => {
      if (error) console.log(error);
    }, 200);
  });

  setTimeout(async () => {

    
    let { haveAccount } = await prompt({
      type: 'select',
      name: 'haveAccount',
      message: '\n Select a sign in',
      choices: ['Sign in with existing account', 'Create account', 'Continue as Guest'],
    });

    if (haveAccount === 'Sign in with existing account') {
      let credentials = await getCredentials();
      socket.emit('login', credentials);
    } else if (haveAccount === 'Create account') {
      let credentials = await getCredentials();
      socket.emit('create-account', credentials);
    } else if (haveAccount === 'Continue as Guest') {
      console.log('Continuing as guest');
      socket.emit('continue-guest');
    } else {
      mainMenu();
    }
  }, 2000);
}

async function getCredentials() {
  let { username } = await prompt({
    type: 'input',
    name: 'username',
    message: 'Please enter your username'
  })
  username = username.toLowerCase();
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
    figlet(`${timer}`, (err, data) => {
      console.log(chalk.yellow(data))
  });
  }
  timer -= 1;
}

function updateBestScore() {
  let score = timer * -1
  if (verifiedUser.bestScore) {
    if (score < verifiedUser.bestScore) {
      verifiedUser.bestScore = score
      socket.emit('update-score', verifiedUser)
    }
  } else {
    verifiedUser.bestScore = score
    socket.emit('update-score', verifiedUser)
  }
}

// async function signup
// function continueGuest
