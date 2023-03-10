'use strict'

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3006
const server = new Server();
const room10 = server.of('/room10');
const { userModel } = require('../auth/index');
const bcrypt = require('bcrypt');
const { where } = require('sequelize');
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
    } catch (error) {
      console.log(error);
    }
  })
  socket.on('create-account', async (credentials) => {
    

    
    try {
      let newUser = await userModel.create({
        username: credentials.username,
        password: hashedPassword
      })
      console.log(newUser);
    } catch (error) {
      console.log('Do better')
      socket.emit('main-menu');
    }

    
  })

  socket.on('continue-guest', () => {
    socket.emit('start-game');
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