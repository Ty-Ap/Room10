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
const tens = ['Ace', 'King', 'Queen', 'Jack', '10',];
const deck = [];


class Card {
  constructor(card, value, suit) {
    this.card = card;
    this.value = value;
    this.suit = suit
  }
}

for (let card of cards) {
  for (let suit of suits) {
    if (tens.includes(card)) {
      let tempCard = new Card(card, 10, suit)
      deck.push(tempCard)
    } else {
      let tempCard = new Card(card, +card, suit);
      deck.push(tempCard)
    }
  }
}


async function game4(socket) {
  console.clear();
  figlet(`Welcome to Room 4`, (err, data) => {
    console.log(chalk.red(data));
  });
  // console.log(deck);
  let dealerHand = [];
  let playerHand = [];

  for (let i = 0; i < 2; i++){
    let random = Math.floor(Math.random() * deck.length)
    let tempcard = deck[random]
    deck.splice(random, 1);
    playerHand.push(tempcard);
  }
  
  for (let i = 0; i < 2; i++){
    let random = Math.floor(Math.random() * deck.length)
    let tempcard = deck[random]
    deck.splice(random, 1);
    dealerHand.push(tempcard);
  }


  let dealerScore = dealerHand.reduce((acc, val) => acc + val.value, 0);
  console.log(dealerScore)
  let playerScore = playerHand.reduce((acc, val) => acc + val.value, 0);

  console.log(`The Dealer is showing one card - ${dealerHand[0].card} of ${dealerHand[0].suit} (Total: ${dealerHand[0].value})`)
  console.log(`Your hand is ${playerHand[0].card} of ${playerHand[0].suit}, ${playerHand[1].card} of ${playerHand[1].suit} (Total: ${playerScore})`);

  if (playerScore === 21) {
    console.log('BLACKJACK!');
    correctAnswer = true;
    let { hasWon } = await prompt({
      type: 'Select',
      name: 'hasWon',
      message: 'Press Enter when you\re ready to advance',
      choices: ['Ready']
    })
  } else {
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


  // setTimeout(async () => {
  //   let { answer } = await prompt({
  //     type: 'select',
  //     name: 'answer',
  //     message: 'Hint: it\'s the first letter of the alphabet',
  //     choices: ['a', 'b', 'c', 'd']
  //   });
  //   let correctAnswer = 'a'
  //   socket.emit(`answer1`, answer, correctAnswer)
  // }, 100);
}






module.exports = game4;




function gameState() {
  
}