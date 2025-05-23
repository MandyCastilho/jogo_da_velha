const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = true;
let scores = { X: 0, O: 0 };
let startPlayer = 'X';

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// 🎵 Sons do jogo
const soundMove = new Audio('audio/move.mp3');
const soundWin = new Audio('audio/win.mp3');
const soundDraw = new Audio('audio/draw.mp3');

function handleCellClick() {
  const index = this.getAttribute('data-index');
  if (board[index] !== '' || !running) return;

  updateCell(this, index);
  soundMove.play(); // Som ao jogar
  checkWinner();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Vez do jogador: ${currentPlayer}`;
}

function checkWinner() {
  let roundWon = false;

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] === '' || board[b] === '' || board[c] === '') continue;
    if (board[a] === board[b] && board[b] === board[c]) {
      highlightWinningCells(a, b, c);
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    status.textContent = `Jogador ${currentPlayer} venceu! 🎉`;
    soundWin.play();
    scores[currentPlayer]++;
    updateScore();
    running = false;
    return;
  }

  if (!board.includes('')) {
    status.textContent = "Empate! Ninguém venceu.";
    soundDraw.play(); // 💥 Som de empate adicionado aqui
    running = false;
    return;
  }

  changePlayer();
}

function highlightWinningCells(a, b, c) {
  cells[a].classList.add('highlight');
  cells[b].classList.add('highlight');
  cells[c].classList.add('highlight');
}

function updateScore() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

function resetGame() {
  board.fill('');
  running = true;
  // Alterna o jogador inicial a cada rodada
  startPlayer = (startPlayer === 'X' ? 'O' : 'X');
  currentPlayer = startPlayer;
  status.textContent = `Vez do jogador: ${currentPlayer}`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('highlight');
  });
}

// 🎯 Eventos
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

