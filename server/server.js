'use strict'

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3006
const server = new Server();
const room10 = server.of('/room10');
const { userModel } = require('../auth/index');
const bcrypt = require('bcrypt');
syncDatabase();

room10.on('connection', (socket) => {

  console.log('Connected to socket #', socket.id);

  socket.emit('main-menu')


  socket.on('login', async (credentials) => {
    let hashedPassword = await bcrypt.hash(credentials.password, 5);
    try {
      let user = await userModel.findOne({where: {
        username: credentials.username
      }})
      if (user.password === hashedPassword) {
        console.log('Success, emit game start')
      }
      socket.emit('start-game', user);
    } catch (error) {
      console.log(error);
      socket.emit('main-menu')
    }
  })
  socket.on('create-account', async (credentials) => {
    
    try {
      let hashedPassword = await bcrypt.hash(credentials.password, 5);
      let newUser = await userModel.create({
        username: credentials.username,
        password: hashedPassword
      })
      console.log(newUser);
      socket.emit('start-game', user);
      setTimeout(() => {
        socket.join('room1');
        console.log(socket.id, 'has joined room1');
      }, 5000);
      socket.emit('game1');

    } catch (error) {
      console.log(error)
      socket.emit('main-menu');
    }

    
  })

  socket.on('continue-guest', () => {
    socket.emit('start-game');
    socket.join('room1');
    setTimeout(() => {
      socket.emit('game1');
    }, 5500);
  })


  socket.on('answer1', (answer, correctAnswer) => {
    console.log('answer1:', answer, 'Correct:', correctAnswer)
    if (answer === correctAnswer) {
      socket.leave('room1');
      socket.join('room2');
      socket.emit('game2');
    } else {
      console.log('retake block')
      socket.emit('game1-retake');
    }
  })
  socket.on('answer2', (answer, correctAnswer) => {
    console.log('answer2:', answer, 'Correct:', correctAnswer)
    if (answer === correctAnswer) {
      socket.leave('room2');
      socket.join('room3');
      socket.emit('game3');
    } else {
      socket.emit('game2-retake');
    }
  })
  socket.on('answer3', (answer, correctAnswer) => {
    console.log('answer3:', answer, 'Correct:', correctAnswer)
    if (answer === correctAnswer) {
      socket.leave('room3');
      socket.join('room4');
      socket.emit('game4');
    } else {
      socket.emit('game3-retake');
    }
  })
  socket.on('answer4', (answer, correctAnswer) => {
    console.log('answer4:', answer, 'Correct:', correctAnswer)
    if (answer === correctAnswer) {
      socket.leave('room4');
      socket.join('room5');
      socket.emit('game5');
    } else {
      socket.emit('game4-retake');
    }
  })
  socket.on('answer5', (answer, correctAnswer) => {
    console.log('answer5:', answer, 'Correct:', correctAnswer)
    if (answer === correctAnswer) {
      socket.leave('room5');
      socket.join('room6');
      socket.emit('game6');
    } else {
      socket.emit('game5-retake');
    }
  })
  socket.on('answer6', (answer, correctAnswer) => {
    console.log('answer6:', answer, 'Correct:', correctAnswer)
    if (answer === correctAnswer) {
      socket.leave('room6');
      socket.join('room7');
      socket.emit('game7');
    } else {
      socket.emit('game6-retake');
    }
  })
  socket.on('answer7', (answer, correctAnswer) => {
    console.log('answer7:', answer, 'Correct:', correctAnswer)
    if (answer === correctAnswer) {
      socket.leave('room7');
      socket.join('room8');
      socket.emit('game8');
    } else {
      socket.emit('game7-retake');
    }
  })
  socket.on('answer8', (answer, correctAnswer) => {
    console.log('answer8:', answer, 'Correct:', correctAnswer)
    if (answer === correctAnswer) {
      socket.leave('room8');
      socket.join('room9');
      socket.emit('game9');
    } else {
      socket.emit('game8-retake');
    }
  })
  socket.on('answer9', (answer, correctAnswer) => {
    console.log('answer9:', answer, 'Correct:', correctAnswer)
    if (answer === correctAnswer) {
      socket.leave('room9');
      socket.join('room10');
      socket.emit('game10');
    } else {
      socket.emit('game9-retake');
    }
  })
  socket.on('answer10', (answer, correctAnswer) => {
    console.log('answer10:', answer, 'Correct:', correctAnswer)
    if (answer === correctAnswer) {
      socket.leave('room10');
      socket.join('champions');
      socket.emit('winner');
    } else {
      socket.emit('game10-retake');
    }
  })


})



const listen = () => {
  server.listen(PORT);
  console.log('listening on port:', PORT)
}
listen();


async function syncDatabase() {
  await userModel.sync();
}