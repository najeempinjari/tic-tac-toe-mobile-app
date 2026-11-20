# Tic Tac Toe

[![Run Tests](https://github.com/najeempinjari/tic-tac-toe-mobile-app/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/najeempinjari/tic-tac-toe-mobile-app/actions/workflows/test.yml)

A responsive Tic Tac Toe game for Android, built with React Native and Expo. Play a friend on one device, or play a computer opponent that cannot be beaten. No ads, no accounts, and no personal data collected.

Available on the Indus AppStore.

## Features

- Two-player mode and a vs Computer mode (minimax search; the computer plays O)
- Four color themes: Harbor, Clay, Plum, and Meadow
- Tap, win, and draw sound effects
- A board that adapts to any screen size and orientation
- Screen-reader labels on every square
- Over-the-air updates for JavaScript changes

## Tech stack

- Expo SDK 57, React Native, and expo-router (file-based routing)
- TypeScript for screens; JavaScript for components and game logic
- Jest and React Native Testing Library
- GitHub Actions for CI/CD; EAS Build and EAS Update for builds and over-the-air updates

## Getting started

You need Node.js 22 or newer (CI runs 22; development uses 24), Git, and the Expo Go app on an Android phone.

```bash
git clone https://github.com/najeempinjari/tic-tac-toe-mobile-app.git
cd tic-tac-toe-mobile-app
npm ci
npx expo start
```

Scan the QR code with Expo Go, or press `a` to open an Android emulator.

## Scripts

| Command                              | Purpose                              |
| ------------------------------------ | ------------------------------------ |
| `npx expo start`                     | Start the development server         |
| `npx jest`                           | Run the tests                        |
| `npx jest --coverage`                | Run the tests with a coverage report |
| `npx expo lint`                      | Lint the code                        |
| `npx tsc --noEmit`                   | Type-check                           |
| `npx expo export --platform android` | Check that the app bundles           |

## Project structure

```
src/
  app/          screens and layout (expo-router)
  components/   Board and Square
  utils/        game logic, themes, sound hook, tests
  __tests__/    screen tests
docs/           privacy policy page (served by GitHub Pages)
.github/        CI/CD workflows
```

## Branches and delivery

| Branch    | Environment | Update channel |
| --------- | ----------- | -------------- |
| `develop` | Development | `development`  |
| `staging` | Staging     | `staging`      |
| `main`    | Production  | `production`   |

Work happens on short-lived `feature/*`, `fix/*`, `chore/*`, and `docs/*` branches created from `develop`. Each goes through a pull request with one approving review and passing CI checks. Merging into a long-lived branch publishes an over-the-air update to that environment. Native builds are triggered by tags (`dev-*`, `staging-*`, `v*`) and attached to GitHub Releases.

## Privacy

The app collects no personal data. Read the [privacy policy](https://najeempinjari.github.io/tic-tac-toe-mobile-app/privacy-policy.html).

## Third-Party Licenses

This app uses open-source libraries. View the full list in [Third-Party Licenses](docs/third-party-notices.md).

## Development

Open a pull request against `develop`. Add or update tests with your change, and run `npx expo lint`, `npx tsc --noEmit`, and `npx jest` before pushing.

## License

All Rights Reserved. See [LICENSE](LICENSE).

Made by Najeem Pinjari.
