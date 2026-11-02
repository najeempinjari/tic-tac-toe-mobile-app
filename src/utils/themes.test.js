import { DEFAULT_THEME, THEMES } from "./themes";

const REQUIRED_KEYS = [
  "id",
  "name",
  "background",
  "boardBg",
  "squareEmpty",
  "squareBorder",
  "xColor",
  "oColor",
  "winBg",
  "titleColor",
  "statusColor",
  "buttonBg",
  "buttonText",
];
const HEX = /^#[0-9a-fA-F]{6}$/;

describe("themes", () => {
  test.each(THEMES.map((t) => [t.id, t]))(
    "%s has every required key",
    (_id, theme) => {
      REQUIRED_KEYS.forEach((key) => expect(theme[key]).toBeDefined());
    },
  );

  test.each(THEMES.map((t) => [t.id, t]))(
    "%s uses valid hex colors",
    (_id, theme) => {
      REQUIRED_KEYS.filter((k) => k !== "id" && k !== "name").forEach((key) =>
        expect(theme[key]).toMatch(HEX),
      );
    },
  );

  test("theme ids are unique", () => {
    const ids = THEMES.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("DEFAULT_THEME is one of THEMES", () => {
    expect(THEMES).toContain(DEFAULT_THEME);
  });
});
