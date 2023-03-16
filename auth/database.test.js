'use strict';

const {db, userModel} = require('./index');


let userInfo = { user: {username: 'Turd Ferguson', password: 'password', bestScore: 200}
}

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe('Database Functionality', () =>{
  it('Creates a User', async () => {
    await userModel.create(userInfo.user);

    let user = await userModel.findOne({where: {  username: 'Turd Ferguson' }})
    
    expect(user.username).toEqual('Turd Ferguson')
  }),
  it('Checks Best Score', async () => {
    let user = await userModel.findOne({where: {  username: 'Turd Ferguson' }})
    expect(user.bestScore).toEqual(200)
  })
  it('Checks password', async () => {
    let user = await userModel.findOne({where: {  username: 'Turd Ferguson' }})
    expect(user.password).toEqual('password')
  })

})