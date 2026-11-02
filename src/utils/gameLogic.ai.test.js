import { bestMove, calculateWinner, isBoardFull } from "./gameLogic";

// Human = X (moves first), AI = O.
// Tries EVERY possible human move at every turn; the AI answers via bestMove.
function humanNeverWins(board, humanTurn) {
  const result = calculateWinner(board);
  if (result) return result.winner !== "X";
  if (isBoardFull(board)) return true;

  if (humanTurn) {
    return board.every((cell, i) => {
      if (cell !== null) return true;
      const next = [...board];
      next[i] = "X";
      return humanNeverWins(next, false);
    });
  }

  const move = bestMove(board, "O", "X");
  const next = [...board];
  next[move] = "O";
  return humanNeverWins(next, true);
}

test("AI (O) never loses to any sequence of human (X) moves", () => {
  expect(humanNeverWins(Array(9).fill(null), true)).toBe(true);
});
