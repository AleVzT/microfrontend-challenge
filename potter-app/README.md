# potter-app

Remote microfrontend of the [microfrontends project](../README.md). It lists characters from [HP-API](https://hp-api.onrender.com/).

- **Exposes:** `./App`, consumed by the host as `potterApp/App`.
- **Consumes:** `host/i18n` when it runs standalone (the host must be running). The URL can be configured in `.env.example`.
- **Port:** 4174.

| Command | Description |
|---|---|
| `npm run build` | Type-check and production build (generates `remoteEntry.js`) |
| `npm run preview` | Serve the build, which is how the host consumes this remote |
| `npm run dev` | Development server for standalone work |
| `npm run lint` | ESLint |
| `npm test` / `npm run test:ci` | Vitest in watch mode / single run |

Structure: `hooks/useCharacters` (data fetching), `pages/CharactersPage` (states and list), `components/CharacterCard` (presentation, house badge, image fallback).

The HP-API is hosted on a free tier and can be temporarily unavailable. In that case the app shows its error state.

See the [root README](../README.md) for the architecture, setup and known limitations.
