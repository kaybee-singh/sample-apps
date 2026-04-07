document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let isGameActive = true;

    const winningConditions = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    function handleCellClick(e) {
        const index = e.target.dataset.index;
        if (!index || gameState[index] !== '' || !isGameActive) return;

        gameState[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        checkResult();
    }

    function checkResult() {
        let roundWon = false;
        for (let condition of winningConditions) {
            const [a,b,c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            status.textContent = `Player ${currentPlayer} wins!`;
            isGameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            status.textContent = `It's a draw!`;
            isGameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }

    function resetGame() {
        gameState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        isGameActive = true;
        status.textContent = `Player ${currentPlayer}'s turn`;
        document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    }

    board.addEventListener('click', handleCellClick);
    resetButton.addEventListener('click', resetGame);

    // Initialize
    status.textContent = `Player ${currentPlayer}'s turn`;
});
