'use strict';

const { prompt } = require('enquirer');
require('dotenv').config();
const PORT = 3006;
const { io } = require('socket.io-client');
// const socket = io(`http://localhost:${PORT}/room10`);
const figlet = require('figlet');
const chalk = require('chalk');

const suits = ['Hearts', 'Clubs', 'Spades', 'Diamonds'];
const cards = ['Ace', 'King', 'Queen', 'Jack', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
const tens = ['King', 'Queen', 'Jack', '10',];
let deck = [];
let dealerHand = [];
let playerHand = [];
let dealerScore = 0;
let playerScore = 0;
let playersTurn = true
let gameOver = null;
let winner = null;

class Card {
  constructor(card, value, suit) {
    this.card = card;
    this.value = value;
    this.suit = suit
  }
}
buildDeck();

function game4(socket) {
  console.clear();
  figlet(`Welcome to Room 4`, (err, data) => {
    console.log(chalk.red(data));
  });

  setTimeout(async () => {
    buildHands();
  while (playersTurn) {
   await playersChoice(socket);
  }
  if (gameOver) {
    if (!winner) {
      setTimeout(() => {
        reset();
        game4(socket);
      }, 2000);
    }

  }
  }, 250);
  
}






module.exports = game4;


function addCard(hand) {
  let random = Math.floor(Math.random() * deck.length)
  let tempcard = deck[random]
  deck.splice(random, 1);
  hand.push(tempcard);
}

async function blackjackOrBust(socket) {
  if (playerScore > 21) {
    console.log('Sorry you lose');
    console.log('Please try again');
    playersTurn = false;
    gameOver = true
  } else if (playerScore === 21 && playerHand.length === 2) {
    console.log('BLACKJACK!');
    playersTurn = false;
    gameOver = true
    winner = true
    let { hasWon } = await prompt({
      type: 'Select',
      name: 'hasWon',
      message: 'Press Enter when you\'re ready to advance',
      choices: ['Ready']
    })
    if (hasWon) {
      socket.emit('answer1', 'winner', 'winner');
    }
  } else if (playerScore === 21) {
    console.log('21! Now let\'s see if the dealer can match');
  }
}

function buildDeck() {
  deck = [];
  for (let card of cards) {
    for (let suit of suits) {
      if (tens.includes(card)) {
        let tempCard = new Card(card, 10, suit)
        deck.push(tempCard)
      } else if (card === 'Ace') {
        let tempCard = new Card(card, 11, suit);
        deck.push(tempCard);
      } else {
        let tempCard = new Card(card, +card, suit);
        deck.push(tempCard)
      }
    }
  }
}


function buildHands() {
  for (let i = 0; i < 2; i++){
    addCard(playerHand);
  }
  for (let i = 0; i < 2; i++){
    addCard(dealerHand);
  }
}


function gameStatePlayer() {
  dealerScore = dealerHand.reduce((acc, val) => acc + val.value, 0);
  playerScore = playerHand.reduce((acc, val) => acc + val.value, 0);
  console.log(`The Dealer is showing one card - ${dealerHand[0].card} of ${dealerHand[0].suit} (Total: ${dealerHand[0].value})`)
  console.log(`Your hand is ${playerHand.map(card => card.card)} (Total: ${playerScore})`);
}

async function playersChoice(socket) {
  gameStatePlayer();
  blackjackOrBust(socket);
  if (!gameOver) {
    let { hitOrStand } = await prompt({
      type: 'Select',
      name: 'hitOrStand',
      message: `Your score is ${playerScore}. Would you like to hit (take another card), or stand (see the dealer's cards)`,
      choices: ['Hit Me', 'Stand']
    })
    if (hitOrStand === 'Hit Me') {
      let random = Math.floor(Math.random() * deck.length)
      let tempcard = deck[random]
      deck.splice(random, 1);
      playerHand.push(tempcard);
    } else {
      console.log(`The dealers full hand is ${dealerHand[0].card} of ${dealerHand[0].suit}, ${dealerHand[1].card} of ${dealerHand[1].suit} (Total: ${dealerScore})`)
    } 
  }
}


function reset() {
  buildDeck();
  playerHand = [];
  playerScore = 0;
  dealerHand = [];
  dealerScore = 0;
  playersTurn = true;
  gameOver = false;
  // buildHands();
}
