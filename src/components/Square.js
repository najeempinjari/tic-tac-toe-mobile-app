import { Pressable, StyleSheet, Text } from "react-native";

export default function Square({ value, onPress, isWinning, size, theme }) {
  const bg = isWinning ? theme.winBg : theme.squareEmpty;
  const textColor =
    value === "X" ? theme.xColor : value === "O" ? theme.oColor : "transparent";

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.square,
        {
          width: size,
          height: size,
          backgroundColor: bg,
          borderColor: theme.squareBorder,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={value ? `Square marked ${value}` : "Empty square"}
    >
      <Text style={[styles.text, { fontSize: size * 0.5, color: textColor }]}>
        {value}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  square: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "800",
  },
});
