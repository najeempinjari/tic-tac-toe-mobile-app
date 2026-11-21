const DOCS_BASE_URL = "https://najeempinjari.github.io/tic-tac-toe-mobile-app";
export const APP_CONFIG = {
  author: "Najeem Pinjari",
  links: {
    privacyPolicy: `${DOCS_BASE_URL}/privacy-policy.html`,
    thirdPartyNotices: `${DOCS_BASE_URL}/third-party-notices`,
  },
  game: {
    aiMoveDelayMs: 400,
    boardSize: 9,
  },
} as const;
