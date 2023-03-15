
const { Select } = require('enquirer');
const figlet = require('figlet');
const chalk = require('chalk');


function game9(socket) {
  console.clear();
  figlet(`Welcome to Room 9`, (err, data) => {
    console.log(chalk.yellow(data))

});


const mazeWidth = 10;
const mazeHeight = 10;
const maze = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', 'O', ' ', ' ', '#', ' ', '#', ' ', ' ', '#'],
  ['#', ' ', '#', ' ', '#', ' ', ' ', ' ', '#', '#'],
  ['#', ' ', '#', ' ', '#', ' ', '#', ' ', ' ', '#'],
  ['#', ' ', '#', ' ', '#', ' ', '#', ' ', ' ', '#'],
  ['#', ' ', '#', ' ', '#', ' ', '#', ' ', ' ', '#'],
  ['#', ' ', '#', ' ', '#', ' ', '#', ' ', ' ', '#'],
  ['#', ' ', '#', ' ', ' ', ' ', '#', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', '#', '#', 'X', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
];
const player = { row: 1, col: 1 };
const endPosition = { row: mazeHeight - 2, col: mazeWidth - 2 };
function renderMaze() {
  let output = '';
  for (let i = 0; i < mazeHeight; i++) {
    output += maze[i].join('') + '\n';
  }
  return output;
}
function hasReachedEnd() {
  return player.row === endPosition.row && player.col === endPosition.col;
}
function movePlayer(direction) {
  let row = player.row;
  let col = player.col;
  if (direction === 'up' && row > 0 && maze[row - 1][col] !== '#') {
    maze[row][col] = ' ';
    row--;
  } else if (direction === 'down' && row < mazeHeight - 1 && maze[row + 1][col] !== '#') {
    maze[row][col] = ' ';
    row++;
  } else if (direction === 'left' && col > 0 && maze[row][col - 1] !== '#') {
    maze[row][col] = ' ';
    col--;
  } else if (direction === 'right' && col < mazeWidth - 1 && maze[row][col + 1] !== '#') {
    maze[row][col] = ' ';
    col++;
  }
  maze[row][col] = '@';
  player.row = row;
  player.col = col;
}
async function playGame() {
  console.log(renderMaze());
  while (true) {
    const answer = await new Select({
      message: 'Enter a direction:',
      choices: [ 'Up', 'Down', 'Left', 'Right']
    }).run()
    const direction = answer.toLowerCase();
    const currentMaze = renderMaze();
    movePlayer(direction);
    const newMaze = renderMaze();
    if (newMaze === currentMaze) {
      continue;
    }
    console.clear();
    console.log(newMaze);
    if (hasReachedEnd()) {
      let answer = true;
      let correctAnswer = true;

      socket.emit('answer9', answer, correctAnswer)
      break;
    }
  }
}
setTimeout(async () => {
  //consoleclear?
  playGame();
  
}, 1000);

}

















module.exports = game9;