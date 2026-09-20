import { useCallback, useEffect, useState } from "react";
import {
  Pressable,
  StatusBar as RNStatusBar,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Board from "../components/Board";
import { bestMove, calculateWinner, isBoardFull } from "../utils/gameLogic";

const EMPTY_BOARD: (string | null)[] = Array(9).fill(null);

export default function App() {
  const [squares, setSquares] = useState<(string | null)[]>(EMPTY_BOARD);
  const [xIsNext, setXIsNext] = useState(true);
  const [vsComputer, setVsComputer] = useState(false);

  const winnerInfo = calculateWinner(squares);
  const draw = !winnerInfo && isBoardFull(squares);

  const handlePress = useCallback(
    (i: number) => {
      if (winnerInfo || draw || squares[i]) return; // ignore clicks on filled squares or after game end
      const next = [...squares];
      next[i] = xIsNext ? "X" : "O";
      setSquares(next);
      setXIsNext((prev) => !prev);
    },
    [squares, xIsNext, winnerInfo, draw],
  );

  useEffect(() => {
    if (vsComputer && !xIsNext && !winnerInfo && !draw) {
      const timer = setTimeout(() => {
        const move = bestMove(squares, "O", "X");
        if (move !== undefined) {
          const next = [...squares];
          next[move] = "O";
          setSquares(next);
          setXIsNext(true);
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, vsComputer, squares, winnerInfo, draw]);

  const resetGame = () => {
    setSquares(EMPTY_BOARD);
    setXIsNext(true);
  };

  let status;
  if (winnerInfo) status = `${winnerInfo.winner} wins!`;
  else if (draw) status = "It's a draw!";
  else status = `${xIsNext ? "X" : "O"}'s turn`;

  return (
    <SafeAreaView style={styles.container}>
      <RNStatusBar barStyle="light-content" />
      <Text style={styles.title}>Tic Tac Toe 🎮</Text>
      <Text style={styles.status}>{status}</Text>

      <Board
        squares={squares}
        onSquarePress={handlePress}
        winningLine={winnerInfo?.line}
      />

      <Pressable style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>New Game</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.secondaryButton]}
        onPress={() => {
          setVsComputer((v) => !v);
          resetGame();
        }}
      >
        <Text style={styles.buttonText}>
          Mode: {vsComputer ? "vs Computer" : "2 Player"}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: { fontSize: 28, fontWeight: "800", color: "#ffffff", marginBottom: 8 },
  status: { fontSize: 18, color: "#c7c7cc", marginBottom: 20 },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#0a84ff",
    borderRadius: 10,
  },
  secondaryButton: { backgroundColor: "#3a3a3c", marginTop: 12 },
  buttonText: { color: "#ffffff", fontWeight: "600", fontSize: 16 },
});
