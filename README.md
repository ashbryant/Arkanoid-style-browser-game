# Webanoid

A retro arcade brick-breaker inspired by the 1986 feel of Arkanoid. Built with Vue 3, Vite, and Canvas.

## Design Goals

- **Retro arcade first**: Fast, readable gameplay with pixel-era presentation and strong score-chasing feel
- **Web theme second**: Light web development theming in brick labels and level names (div, popup, cookie, CMS, widgets, plugins)
- **Authentic feel**: No modern redesign, no sleek mobile-app styling, no parody joke game

## Stack

- Vue 3 (Composition API)
- Vite
- JavaScript (no TypeScript)
- HTML, CSS
- Canvas for gameplay rendering

## Install

```bash
npm install
```

## Dev Server

```bash
npm run dev
```

Runs with hot reload. Open the URL shown (typically http://localhost:5173).

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

## Controls

- **Keyboard**: Arrow keys or A/D for paddle movement, Space to launch ball
- **Mouse**: Move to control paddle (desktop)
- **Touch**: Drag or tap to move paddle and launch ball (mobile)

## Mobile Behaviour

- Touch input supported; drag or tap to move paddle
- Landscape preferred; rotate-device prompt on small portrait screens
- `touch-action: none` on game area to prevent scroll during play

## Audio Controls

- Mute button (top-right during play) toggles all sound
- Preferences persisted in localStorage
- Retro-style synthesized tones via Web Audio API
- Audio starts only after user interaction (browser autoplay policy)

## Project Structure

```
src/
  components/     # TitleScreen, GameCanvas, GameHUD, GameOver, HighScoreEntry, etc.
  composables/    # useGameState, useAudio
  game/           # Canvas engine, collision, ball, paddle, bricks, levels
  stores/         # highScores (localStorage)
  styles/         # Global CSS
tests/            # Vitest tests
public/           # Static assets
```

## Where Level Data Lives

`src/game/levels.js` – `LEVELS` array and `LEVEL_NAMES`. Brick layouts are defined as character grids; types 1/2/3 map to web-theme labels (div, popup, !cookie).

## Where Assets Live

`public/` – favicon and any static assets. Audio is synthesized at runtime (no audio files).

## Known Limitations

- No background music (SFX only)
- No power-ups (wider paddle, multi-ball, etc.)
- 5 levels then loop

## Next Improvements

- Add one simple power-up (e.g. wider paddle)
- Optional CRT/scanline effect
- Background music track
