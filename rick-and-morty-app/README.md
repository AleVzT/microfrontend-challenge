# rick-and-morty-app

Remote microfrontend of the [microfrontends project](../README.md). It lists characters from [The Rick and Morty API](https://rickandmortyapi.com/).

- **Exposes:** `./App`, consumed by the host as `rickApp/App`.
- **Consumes:** `host/i18n` when it runs standalone (the host must be running). The URL can be configured in `.env.example`.
- **Port:** 5173.

| Command | Description |
|---|---|
| `npm run build` | Type-check and production build (generates `remoteEntry.js`) |
| `npm run preview` | Serve the build, which is how the host consumes this remote |
| `npm run dev` | Development server for standalone work |
| `npm run lint` | ESLint |
| `npm test` / `npm run test:ci` | Vitest in watch mode / single run |

Structure: `hooks/useCharacters` (data fetching), `pages/CharactersPage` (states and list), `components/CharacterCard` (presentation).

See the [root README](../README.md) for the architecture, setup and known limitations.
