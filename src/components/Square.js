import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function Square({ value, onPress, isWinning, size }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.square,
        { width: size, height: size },
        isWinning && styles.winningSquare,
      ]}
      accessibilityRole="button"
      accessibilityLabel={value ? `Square marked ${value}` : 'Empty square'}
    >
      <Text style={[styles.text, { fontSize: size * 0.5 }]}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  square: {
    borderWidth: 1,
    borderColor: '#3a3a3c',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c1c1e',
  },
  winningSquare: {
    backgroundColor: '#2e5d34',
  },
  text: {
    fontWeight: '700',
    color: '#ffffff',
  },
});