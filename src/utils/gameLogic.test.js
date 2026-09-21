import { bestMove, calculateWinner, isBoardFull } from "./gameLogic";

describe("calculateWinner", () => {
  test("detects a horizontal win", () => {
    const board = ["X", "X", "X", null, null, null, null, null, null];
    expect(calculateWinner(board).winner).toBe("X");
  });

  test("detects a vertical win", () => {
    const board = ["O", null, null, "O", null, null, "O", null, null];
    expect(calculateWinner(board).winner).toBe("O");
  });

  test("detects a diagonal win", () => {
    const board = ["X", null, null, null, "X", null, null, null, "X"];
    expect(calculateWinner(board).winner).toBe("X");
  });

  test("detects a vertical win for the other player", () => {
    const board = ["X", null, null, "X", null, null, "X", null, null];
    expect(calculateWinner(board).winner).toBe("X");
  });

  test("detects a diagonal win for the other player", () => {
    const board = ["O", null, null, null, "O", null, null, null, "O"];
    expect(calculateWinner(board).winner).toBe("O");
  });

  test("detects the other diagonal (anti-diagonal) win", () => {
    const board = [null, null, "X", null, "X", null, "X", null, null];
    expect(calculateWinner(board).winner).toBe("X");
  });

  test("returns null when there is no winner yet", () => {
    const board = ["X", "O", null, null, null, null, null, null, null];
    expect(calculateWinner(board)).toBeNull();
  });

  test("returns null on an empty board", () => {
    const board = Array(9).fill(null);
    expect(calculateWinner(board)).toBeNull();
  });
});

describe("isBoardFull", () => {
  test("returns true when every square is filled", () => {
    const board = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];
    expect(isBoardFull(board)).toBe(true);
  });

  test("returns false when at least one square is empty", () => {
    const board = ["X", "O", "X", "O", "X", "O", "O", "X", null];
    expect(isBoardFull(board)).toBe(false);
  });
});

describe("bestMove (AI)", () => {
  test("blocks an immediate opponent win", () => {
    // X is one move from winning the top row; O (AI) must block at index 2
    const board = ["X", "X", null, null, null, null, null, null, null];
    const move = bestMove(board, "O", "X");
    expect(move).toBe(2);
  });

  test("takes an immediate winning move when available", () => {
    // O is one move from winning the top row; AI should take index 2 to win
    const board = ["O", "O", null, "X", "X", null, null, null, null];
    const move = bestMove(board, "O", "X");
    expect(move).toBe(2);
  });
});

describe("draw detection", () => {
  test("a full board with no winning line is a draw, not a win", () => {
    // X O X
    // X O O
    // O X X
    const board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
    expect(calculateWinner(board)).toBeNull();
    expect(isBoardFull(board)).toBe(true);
  });
});
