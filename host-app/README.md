# host-app

Shell application of the [microfrontends project](../README.md). It renders the header, the remote selector and the language switcher, and it loads `rickApp/App` and `potterApp/App` on demand through Module Federation.

- **Exposes:** `./i18n`, the configured `i18next` instance shared with the remotes.
- **Consumes:** `rickApp/App` (port 5173) and `potterApp/App` (port 4174). URLs can be configured in `.env.example`.
- **Port:** 5174.

| Command | Description |
|---|---|
| `npm run dev` | Development server (the remotes must be served) |
| `npm run build` | Type-check and production build |
| `npm run preview` | Serve the production build |
| `npm run lint` | ESLint |
| `npm test` / `npm run test:ci` | Vitest in watch mode / single run |

Federated imports do not exist on disk, so tests map them to per-remote stubs (`vitest.config.ts`, `src/test/`).

See the [root README](../README.md) for the architecture, setup and known limitations.
