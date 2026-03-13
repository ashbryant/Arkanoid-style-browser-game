# Webanoid

A retro arcade brick-breaker inspired by the 1986 feel of Arkanoid. Built with Vue 3, Vite, and Canvas.

## Design Goals

- **Retro arcade first**: Fast, readable gameplay with pixel-era presentation and strong score-chasing feel
- **Web theme second**: Light web development theming in enemies, level art, and power-ups (broken layouts, cookie banners, CMS bricks, etc.)
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

- **Keyboard**: Arrow keys or A/D for paddle movement
- **Mouse**: Move to control paddle (desktop)
- **Touch**: Drag or tap to move paddle (mobile)

## Project Structure

```
src/
  components/     # Vue UI (TitleScreen, GameCanvas, overlays)
  composables/    # useGameState, useAudio
  game/           # Canvas engine, collision, ball, paddle, bricks
  styles/         # Global CSS
tests/            # Vitest tests
public/           # Static assets, audio
```

## Known Limitations

- In development; features added milestone by milestone

## Next Improvements

- See build order in development plan
