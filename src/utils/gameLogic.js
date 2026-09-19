// utils/gameLogic.js

export const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

export function calculateWinner(squares) {
  for (const [a, b, c] of LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export function isBoardFull(squares) {
  return squares.every((sq) => sq !== null);
}

// Simple unbeatable AI using minimax (optional vs-computer mode)
export function bestMove(squares, aiPlayer, humanPlayer) {
  function minimax(newSquares, player) {
    const winnerInfo = calculateWinner(newSquares);
    if (winnerInfo?.winner === aiPlayer) return { score: 10 };
    if (winnerInfo?.winner === humanPlayer) return { score: -10 };
    if (isBoardFull(newSquares)) return { score: 0 };

    const moves = [];
    newSquares.forEach((val, idx) => {
      if (val === null) {
        const boardCopy = [...newSquares];
        boardCopy[idx] = player;
        const result = minimax(boardCopy, player === aiPlayer ? humanPlayer : aiPlayer);
        moves.push({ index: idx, score: result.score });
      }
    });

    if (player === aiPlayer) {
      return moves.reduce((best, m) => (m.score > best.score ? m : best));
    }
    return moves.reduce((best, m) => (m.score < best.score ? m : best));
  }

  return minimax(squares, aiPlayer).index;
}