'use strict'

require('dotenv').config();
const { Server } = require('socket.io');
const PORT =  3006;
const server = new Server();
const room10 = server.of('/room10');
const { userModel } = require('../auth/index');
const bcrypt = require('bcrypt');
syncDatabase();

let roomCount= [0,0,0,0,0,0,0,0,0,0,0];
const messageQueue = [0, 0, 0, 0, 0, 0, 0, 0,
  {username: 'admin', message: 'I am an admin, you are banned', timeStamp: Date().slice(16, 24)},
  {username: 'user', message: 'Good I hate this game anyway', timeStamp: Date().slice(16, 24)}
];

room10.on('connection', (socket) => {

  console.log('Connected to socket #', socket.id);

  socket.emit('main-menu')


  socket.on('login', async (credentials) => {
    let hashedPassword = await bcrypt.hash(credentials.password, 5);
    console.log(credentials.password, hashedPassword);
    try {
      let user = await userModel.findOne({where: {
        username: credentials.username
      }})
      // console.log(user, hashedPassword)
      if (bcrypt.compare(credentials.password, user.password)) {
        console.log('Success, emit game start')
        socket.emit('start-game', user);
        setTimeout(() => {
          socket.emit('game1', roomCount[1])
        }, 10500);
      } else {
        socket.emit('main-menu', 'Incorrect Password, please try again.\n' )
      }


    } catch (error) {
      console.log(error);
      socket.emit('main-menu', 'Cannot find account by that username\n')
    }
  })
  socket.on('create-account', async (credentials) => {
    
    try {
      let hashedPassword = await bcrypt.hash(credentials.password, 5);
      console.log(credentials.password, hashedPassword);
      let newUser = await userModel.create({
        username: credentials.username,
        password: hashedPassword
      })
      console.log(newUser);
      socket.emit('start-game', newUser);
      setTimeout(() => {
        socket.join('room1');
        console.log(socket.id, 'has joined room1');
        socket.emit('game1');
      }, 10500);

    } catch (error) {
      console.log(error)
      socket.emit('main-menu');
    }

    
  })

  socket.on('continue-guest', () => {
    socket.emit('start-game');
    // console.log('before',room10.sockets.adapter.rooms.get('room1').size);
    socket.join('room1');
    roomCount[1]++;
    setTimeout(() => {
      socket.emit('game1', roomCount[1]);

    }, 10500);
  })


  socket.on('answer1', (answer, correctAnswer) => {
    console.log('answer1:', answer, 'Correct:', correctAnswer)
    if (answer === correctAnswer) {
      socket.leave('room1');
      roomCount[1]--;
      socket.join('room2');
      roomCount[2]++;
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
      roomCount[3]++;
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
  socket.on('answer9', async (answer, correctAnswer) => {
    console.log('answer9:', answer, 'Correct:', correctAnswer)
    if (answer === correctAnswer) {
      let allUsers = await userModel.findAll();
      // console.log(allUsers);
      const groomedUsers = allUsers.map(user => {
        return {username: user.username, bestScore: user.bestScore}
      })
      const leadersArray = groomedUsers.sort((a, b) => a.bestScore - b.bestScore);
      console.log(leadersArray);
      console.log(groomedUsers);
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

  socket.on('get-messages', () => {
    socket.emit('send-messages', messageQueue)
  });

  socket.on('room-message-client', (chat, verifiedUser) => {
    console.log('received', chat, verifiedUser)
    messageQueue.shift();
    let messageObject = {
      username: verifiedUser.username,
      message: chat,
      timeStamp: Date().slice(16, 24)
    }
    messageQueue.push(messageObject);
    console.log(messageQueue[messageQueue.length - 1]);


    // socket.emit('room-message-server', messageQueue[messageQueue.length - 1])
    room10.to('room10').emit('room-message-server', messageQueue[messageQueue.length - 1])
  })

  socket.on('update-score', async (user) => {
    let dbUser = await userModel.findOne({where: {username: user.username}});
    dbUser.update(user)
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