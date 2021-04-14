## Project Structure

- [`/core`](core/readme.md) - reusable code that's shared between backend and frontend.
- [`/main`](main/readme.md) - backend code, Electron's main process, synchronous.
- [`/preload`](preload/readme.md) - exposes whitelisted node APIs to renderer.
- [`/renderer`](renderer/readme.md) - frontend code, using React and component design.