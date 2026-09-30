import { useAudioPlayer } from "expo-audio";

const tapSound = require("../../assets/sounds/tap.mp3");
const winSound = require("../../assets/sounds/win.mp3");
const drawSound = require("../../assets/sounds/draw.mp3");

export function useSounds() {
  const tapPlayer = useAudioPlayer(tapSound);
  const winPlayer = useAudioPlayer(winSound);
  const drawPlayer = useAudioPlayer(drawSound);

  const playTap = () => {
    tapPlayer.seekTo(0);
    tapPlayer.play();
  };
  const playWin = () => {
    winPlayer.seekTo(0);
    winPlayer.play();
  };
  const playDraw = () => {
    drawPlayer.seekTo(0);
    drawPlayer.play();
  };

  return { playTap, playWin, playDraw };
}
