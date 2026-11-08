import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import App from "../app/index";

// expo-audio needs native code, which doesn't exist under Jest
const mockPlayTap = jest.fn();
const mockPlayWin = jest.fn();
const mockPlayDraw = jest.fn();

jest.mock("../utils/useSounds", () => ({
  useSounds: () => ({
    playTap: mockPlayTap,
    playWin: mockPlayWin,
    playDraw: mockPlayDraw,
  }),
}));

jest.setTimeout(15000);

beforeEach(() => jest.clearAllMocks());

const getSquares = () => screen.getAllByRole("button", { name: /square/i });

describe("Tic Tac Toe screen", () => {
  test("starts with X to move and nine empty squares", async () => {
    await render(<App />);
    expect(screen.getByText("X's turn")).toBeTruthy();
    expect(getSquares()).toHaveLength(9);
    expect(screen.getAllByLabelText("Empty square")).toHaveLength(9);
  });

  test("tapping a filled square does not change whose turn it is (regression)", async () => {
    await render(<App />);
    await fireEvent.press(getSquares()[0]); // X plays
    expect(screen.getByText("O's turn")).toBeTruthy();
    await fireEvent.press(getSquares()[0]); // tap the filled square again
    expect(screen.getByText("O's turn")).toBeTruthy();
    expect(screen.getAllByLabelText("Empty square")).toHaveLength(8);
  });

  test("X wins with the top row", async () => {
    await render(<App />);
    for (const i of [0, 3, 1, 4, 2]) {
      // X:0,1,2  O:3,4
      await fireEvent.press(getSquares()[i]);
    }
    expect(screen.getByText("X wins!")).toBeTruthy();
  });

  test("New Game clears the board", async () => {
    await render(<App />);
    await fireEvent.press(getSquares()[4]);
    await fireEvent.press(screen.getByText("New Game"));
    expect(screen.getByText("X's turn")).toBeTruthy();
    expect(screen.getAllByLabelText("Empty square")).toHaveLength(9);
  });

  test("mode toggle switches to vs Computer", async () => {
    await render(<App />);
    expect(screen.getByText(/Mode: 2 Player/)).toBeTruthy();
    await fireEvent.press(screen.getByText(/Mode:/));
    expect(screen.getByText(/Mode: vs Computer/)).toBeTruthy();
  });

  test("win sound plays once, even if the screen re-renders afterwards", async () => {
    const { rerender } = await render(<App />);
    for (const i of [0, 3, 1, 4, 2]) {
      await fireEvent.press(getSquares()[i]);
    }
    expect(mockPlayWin).toHaveBeenCalledTimes(1);
    await rerender(<App />);
    expect(mockPlayWin).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("in vs Computer mode, a tap during the computer turn is ignored", async () => {
    jest.useFakeTimers({
      doNotFake: ["nextTick", "queueMicrotask", "setImmediate"],
    });
    await render(<App />);
    await fireEvent.press(screen.getByText(/Mode:/)); // switch to vs Computer
    await fireEvent.press(getSquares()[0]); // X plays square 0
    await fireEvent.press(getSquares()[8]); // human taps again during the computer's turn
    expect(screen.getAllByLabelText("Empty square")).toHaveLength(8); // second tap must be ignored
  });

  test("in vs Computer mode, the computer still replies after a rejected tap", async () => {
    await render(<App />);
    await fireEvent.press(screen.getByText(/Mode:/));
    await fireEvent.press(getSquares()[0]); // X plays
    await fireEvent.press(getSquares()[8]); // ignored: computer's turn
    await waitFor(
      () => expect(screen.getAllByLabelText("Square marked O")).toHaveLength(1),
      { timeout: 3000 },
    );
    expect(screen.getByText("X's turn")).toBeTruthy();
  });

  test("in 2 Player mode, the second tap places an O", async () => {
    await render(<App />);
    await fireEvent.press(getSquares()[0]);
    await fireEvent.press(getSquares()[1]);
    expect(screen.getAllByLabelText("Square marked O")).toHaveLength(1);
    expect(screen.getByText("X's turn")).toBeTruthy();
  });
});
