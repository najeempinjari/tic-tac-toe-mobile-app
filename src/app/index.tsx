import { useCallback, useEffect, useState } from "react";
import {
  Pressable,
  StatusBar as RNStatusBar,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Board from "../components/Board";
import { bestMove, calculateWinner, isBoardFull } from "../utils/gameLogic";
import { DEFAULT_THEME, THEMES } from "../utils/themes";

const EMPTY_BOARD: (string | null)[] = Array(9).fill(null);

export default function App() {
  const [squares, setSquares] = useState<(string | null)[]>(EMPTY_BOARD);
  const [xIsNext, setXIsNext] = useState(true);
  const [vsComputer, setVsComputer] = useState(false);
  const [theme, setTheme] = useState(DEFAULT_THEME);

  const winnerInfo = calculateWinner(squares);
  const draw = !winnerInfo && isBoardFull(squares);

  const handlePress = useCallback(
    (i: number) => {
      if (winnerInfo || draw || squares[i]) return;
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <RNStatusBar barStyle="light-content" />
      <Text style={[styles.title, { color: theme.titleColor }]}>
        Tic Tac Toe
      </Text>
      <Text style={[styles.status, { color: theme.statusColor }]}>
        {status}
      </Text>

      <Board
        squares={squares}
        onSquarePress={handlePress}
        winningLine={winnerInfo?.line}
        theme={theme}
      />

      <Pressable
        style={[styles.button, { backgroundColor: theme.buttonBg }]}
        onPress={resetGame}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>
          New Game
        </Text>
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

      <Text style={[styles.themeLabel, { color: theme.statusColor }]}>
        Theme
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.swatchRow}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {THEMES.map((t) => (
          <Pressable
            key={t.id}
            onPress={() => setTheme(t)}
            style={[
              styles.swatch,
              {
                backgroundColor: t.boardBg,
                borderColor: t.id === theme.id ? t.xColor : "transparent",
              },
            ]}
          />
        ))}
      </ScrollView>
      <Text style={[styles.credit, { color: theme.statusColor }]}>
        Made by Najeem Pinjari
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: { fontSize: 28, fontWeight: "800", marginBottom: 8 },
  status: { fontSize: 18, marginBottom: 20 },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  secondaryButton: { backgroundColor: "#3a3a3c", marginTop: 12 },
  buttonText: { color: "#ffffff", fontWeight: "600", fontSize: 16 },
  themeLabel: {
    marginTop: 28,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 1,
  },
  swatchRow: { maxHeight: 60 },
  swatch: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginHorizontal: 6,
    borderWidth: 3,
  },
  credit: { marginTop: 18, fontSize: 11, opacity: 0.6 },
});
