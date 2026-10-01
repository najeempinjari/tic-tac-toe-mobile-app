import { StyleSheet, useWindowDimensions, View } from "react-native";
import Square from "./Square";

export default function Board({ squares, onSquarePress, winningLine, theme }) {
  const { width, height } = useWindowDimensions();
  const boardSize = Math.min(width, height) * 0.9;
  const boardSizeCapped = Math.min(boardSize, 420);
  const squareSize = boardSizeCapped / 3;

  return (
    <View
      style={[
        styles.board,
        {
          width: boardSizeCapped,
          height: boardSizeCapped,
          backgroundColor: theme.boardBg,
          borderRadius: 12,
          overflow: "hidden",
        },
      ]}
    >
      {squares.map((value, i) => (
        <Square
          key={i}
          value={value}
          size={squareSize}
          isWinning={winningLine?.includes(i)}
          onPress={() => onSquarePress(i)}
          theme={theme}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
  },
});
