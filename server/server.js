'use strict'

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3006
const server = new Server();
const room10 = server.of('/room10');
const { userModel } = require('../auth/index');
const bcrypt = require('bcrypt');

room10.on('connection', (socket) => {
  console.log('Connected to socket #', socket.id);

  socket.emit('main-menu')


  socket.on('login', (credentials) => {
    console.log(credentials);
  })
  socket.on('create-account', async (credentials) => {
    console.log(credentials);
    let hashedPassword = await bcrypt.hash(credentials.password, 5);
    let newUser = userModel.create({
      username: credentials.username,
      password: hashedPassword
    })
    console.log(newUser);
  })
})



const listen = () => {
  server.listen(PORT);
  console.log('listening on port:', PORT)
}
listen();