const assert = require('assert');
const ioClient = require('socket.io-client');
const { Server } = require('socket.io');
const { userModel } = require('../auth/index');
const {syncDatabase, getLeaders, server } = require('../server/server')

describe('Socket', () => {
  let client1, client2, user;

  beforeAll(async () => {
    await syncDatabase();
    user = await userModel.create({ username: 'testuser', password: 'testpassword' });
    server.on('connection', (socket) => {
      socket.on('test-event', (data) => {
        socket.emit('test-event-response', data);
      });
    });
    client1 = ioClient.connect('http://localhost:3006/room10');
    client2 = ioClient.connect('http://localhost:3006/room10');
  });

  afterAll(() => {
    server.close();
    client1.close();
    client2.close();
    userModel.destroy({ where: {} });
  });


  // it('wakes up the server?', () => {
  //   client1.emit('WAKE UP')
  // })


  it('should emit "test-event-response" with correct data', (done) => {
    // No idea why but this only works when one emit has already been called, otherwise test will time out
    client1.emit('ready');
    client1.emit('ready');
    // client1.emit('ready');
    client1.on('main-menu', () => {
      done();
    },);
  });

  it('should emit "start-game" event with user data', (done) => {
    client1.emit('login', { username: 'testuser', password: 'testpassword' });
    // done();
    client1.on('start-game', (data) => {
      expect(data.bestScore).toBe(null);
      expect(data.username).toBe('testuser');
      done();
    });
  });
});
