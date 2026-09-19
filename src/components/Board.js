import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Square from './Square';

export default function Board({ squares, onSquarePress, winningLine }) {
  const { width, height } = useWindowDimensions();
  // Responsive: board is 90% of the smaller screen dimension, capped at 420
  const boardSize = Math.min(width, height) * 0.9;
  const boardSizeCapped = Math.min(boardSize, 420);
  const squareSize = boardSizeCapped / 3;

  return (
    <View style={[styles.board, { width: boardSizeCapped, height: boardSizeCapped }]}>
      {squares.map((value, i) => (
        <Square
          key={i}
          value={value}
          size={squareSize}
          isWinning={winningLine?.includes(i)}
          onPress={() => onSquarePress(i)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
});