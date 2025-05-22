  const cells = document.querySelectorAll('.cell');
  const status = document.getElementById('status');
  const resetBtn = document.getElementById('resetBtn');

  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let running = true;

  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8], // linhas
    [0,3,6], [1,4,7], [2,5,8], // colunas
    [0,4,8], [2,4,6]           // diagonais
  ];

  function handleCellClick() {
    const index = this.getAttribute('data-index');

    if(board[index] !== '' || !running) return;

    updateCell(this, index);
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
    for(let condition of winConditions) {
      const [a, b, c] = condition;
      if(board[a] === '' || board[b] === '' || board[c] === '') continue;
      if(board[a] === board[b] && board[b] === board[c]) {
        roundWon = true;
        break;
      }
    }

    if(roundWon) {
      status.textContent = `Jogador ${currentPlayer} venceu! 🎉`;
      running = false;
      return;
    }

    if(!board.includes('')) {
      status.textContent = "Empate! Ninguém venceu.";
      running = false;
      return;
    }

    changePlayer();
  }

  function resetGame() {
    board.fill('');
    running = true;
    currentPlayer = 'X';
    status.textContent = `Vez do jogador: ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = '');
  }

  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  resetBtn.addEventListener('click', resetGame);