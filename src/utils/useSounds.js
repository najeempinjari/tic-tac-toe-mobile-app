import { useAudioPlayer } from "expo-audio";
import { useCallback } from "react";

const tapSound = require("../../assets/sounds/tap.mp3");
const winSound = require("../../assets/sounds/win.mp3");
const drawSound = require("../../assets/sounds/draw.mp3");

export function useSounds() {
  const tapPlayer = useAudioPlayer(tapSound);
  const winPlayer = useAudioPlayer(winSound);
  const drawPlayer = useAudioPlayer(drawSound);

  const playTap = useCallback(() => {
    tapPlayer.seekTo(0);
    tapPlayer.play();
  }, [tapPlayer]);
  const playWin = useCallback(() => {
    winPlayer.seekTo(0);
    winPlayer.play();
  }, [winPlayer]);
  const playDraw = useCallback(() => {
    drawPlayer.seekTo(0);
    drawPlayer.play();
  }, [drawPlayer]);

  return { playTap, playWin, playDraw };
}
