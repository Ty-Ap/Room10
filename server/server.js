'use strict'

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3006
const server = new Server();
const room10 = server.of('/room10');

room10.on('connection', (socket) => {
  console.log('Connected to socket #', socket.id);

  socket.emit('prompt-credentials')

  socket.emit('login');

  socket.on('submit-credentials', (credentials) => {
    console.log(credentials);
  })
})



const listen = () => {
  server.listen(PORT);
  console.log('listening on port:', PORT)
}
listen();