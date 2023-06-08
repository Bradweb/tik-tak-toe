

const TicTacToe = (function () {
  // Variables privadas
  let gameboard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  let currentPlayer = 'X';
  let gameEnded = false;


  // Función privada para renderizar el tablero de juego en el DOM
  function renderGameboard() {
    const cells = document.querySelectorAll('.cell');

    for (let i = 0; i < gameboard.length; i++) {
      for (let j = 0; j < gameboard[i].length; j++) {
        const cellIndex = i * 3 + j;
        const cell = cells[cellIndex];
        cell.textContent = gameboard[i][j];
        cell.classList.remove('winning-cell');
      }
    }
  }


   // Función privada para cambiar el turno del jugador
   function changeTurn() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }


  // Función privada para verificar si un jugador ha ganado
  function checkWin(player) {
    // Verificar filas
    for (let i = 0; i < 3; i++) {
      if (
        gameboard[i][0] === player &&
        gameboard[i][1] === player &&
        gameboard[i][2] === player
      ) {
        return true;
      }
    }

    // Verificar columnas
    for (let j = 0; j < 3; j++) {
      if (
        gameboard[0][j] === player &&
        gameboard[1][j] === player &&
        gameboard[2][j] === player
      ) {
        return true;
      }
    }

    // Verificar diagonales
    if (
      (gameboard[0][0] === player &&
        gameboard[1][1] === player &&
        gameboard[2][2] === player) ||
      (gameboard[0][2] === player &&
        gameboard[1][1] === player &&
        gameboard[2][0] === player)
    ) {
      return true;
    }

    return false; // No hay un ganador
  }

 
  // Función privada para verificar si el tablero está lleno
  function isBoardFull() {
    for (let i = 0; i < gameboard.length; i++) {
      for (let j = 0; j < gameboard[i].length; j++) {
        if (gameboard[i][j] === '') {
          return false; // Si hay al menos una celda vacía, el tablero no está lleno
        }
      }
    }
    return true; // Si no se encontraron celdas vacías, el tablero está lleno
  }
   // Función privada para obtener la combinación ganadora
   function getWinningCombination(player) {
    const winningCombinations = [
      [[0, 0], [0, 1], [0, 2]], // Fila 1
      [[1, 0], [1, 1], [1, 2]], // Fila 2
      [[2, 0], [2, 1], [2, 2]], // Fila 3
      [[0, 0], [1, 0], [2, 0]], // Columna 1
      [[0, 1], [1, 1], [2, 1]], // Columna 2
      [[0, 2], [1, 2], [2, 2]], // Columna 3
      [[0, 0], [1, 1], [2, 2]], // Diagonal principal
      [[0, 2], [1, 1], [2, 0]] // Diagonal secundaria
    ];

    for (const combination of winningCombinations) {
      const isWinningCombination = combination.every(([row, col]) => gameboard[row][col] === player);
      if (isWinningCombination) {
        return combination;
       
      }
      
    }
    
   

    return [];
  }

 

  // Función privada para resaltar las celdas ganadoras
  function highlightWinningCells(winningCombination) {
    const cells = document.querySelectorAll('.cell');

    for (const [row, col] of winningCombination) {
      const cellIndex = row * 3 + col;
      const cell = cells[cellIndex];
      cell.classList.add('winning-cell');
    }
  }

  // funcion privada patra chequear si el juego a terminado
  function checkGameOver() {
    const player1Name = document.getElementById('player1-name').value || 'Player 1';
    const player2Name = document.getElementById('player2-name').value || 'Player 2';

    // Verificar si hay un ganador
    if (checkWin('X')) {
      document.getElementById('winner-display').textContent = '¡' + player1Name + ' ha ganado!';
      gameEnded = true;
      const winningCombination = getWinningCombination('X');
      highlightWinningCells(winningCombination);
      console.log(winningCombination);
      return;
    }
    
    if (checkWin('O')) {
      document.getElementById('winner-display').textContent = '¡' + player2Name + ' ha ganado!';
      gameEnded = true;
      const winningCombination = getWinningCombination('O');
      highlightWinningCells(winningCombination);
      
      if (checkWin('X')) {
        document.getElementById('winner-display').textContent = '¡' + player1Name + ' ha ganado!';
        gameEnded = true;
        const winningCombination = getWinningCombination('X');
              
        highlightWinningCells(winningCombination);
        return;
       
      }
      
      return;
    }
    

    // Verificar si hay empate
    if (isBoardFull()) {
      document.getElementById('winner-display').textContent = '¡Empate!';
      gameEnded = true;
    }
  }




 

  // Función pública para realizar un movimiento
  function makeMove(row, col) {
    if (gameEnded) {
      return;
    }

    if (gameboard[row][col] === '') {
      gameboard[row][col] = currentPlayer;

      renderGameboard();
      checkGameOver(); // Verificar si el juego ha terminado

      if (!gameEnded) {
        // Cambiar el turno al siguiente jugador
        changeTurn();
      }
    }
  }

  // Función pública para iniciar el juego
  function startGame() {
    const player1Name = document.getElementById('player1-name').value || 'Player 1';
    const player2Name = document.getElementById('player2-name').value || 'Player 2';

    resetGame();
  }

  // Función pública para reiniciar el juego
  function resetGame() {
    gameboard = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    currentPlayer = 'X';
    gameEnded = false;
    document.getElementById('winner-display').textContent = '';

    renderGameboard();
  }


  


  // Retorna un objeto que expone las funciones públicas
  return {
    makeMove,
    startGame,
    resetGame,
  };
})();

document.addEventListener('DOMContentLoaded', TicTacToe.renderGameboard);

// Event listener para el botón de iniciar/reiniciar juego
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', TicTacToe.startGame);

// Agrega el event listener al botón de reinicio
const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', TicTacToe.resetGame);

// Event listener para las celdas del tablero de juego
const cells = document.querySelectorAll('.cell');
cells.forEach((cell, index) => {
  const row = Math.floor(index / 3);
  const col = index % 3;

  cell.addEventListener('click', () => {
    TicTacToe.makeMove(row, col);
  });
});


/* 



1. Crear un tablero de juego de 3x3 (matriz) y establecer todas las celdas como vacías.
2. Crear una variable booleana llamada "gameEnded" e inicializarla como falsa.
3. Crear una variable de cadena llamada "currentPlayer" y establecerla como 'X'.
4. Mientras el juego no haya terminado:
     5. Mostrar el tablero de juego en la pantalla.
     6. Obtener la posición (fila y columna) del movimiento del jugador actual.
     7. Validar si la posición es válida (dentro de los límites del tablero y la celda está vacía).
     8. Si la posición es válida:
          9. Colocar el símbolo del jugador actual en la posición del tablero.
         10. Verificar si el jugador actual ha ganado (3 en línea en filas, columnas o diagonales).
         11. Si el jugador actual ha ganado:
                12. Mostrar un mensaje de victoria para el jugador actual.
                13. Establecer "gameEnded" como verdadero.
                14. Finalizar el juego.
         15. Si no hay ganador y el tablero está lleno:
                16. Mostrar un mensaje de empate.
                17. Establecer "gameEnded" como verdadero.
                18. Finalizar el juego.
         19. Si no hay ganador y el juego no ha terminado:
                20. Cambiar al siguiente jugador (de 'X' a 'O' o de 'O' a 'X').
21. Mostrar el tablero de juego final en la pantalla.
22. Preguntar al jugador si desea jugar nuevamente.
23. Si el jugador desea jugar nuevamente:
      24. Reiniciar el juego volviendo al paso 1.
25. Finalizar el juego.

 */