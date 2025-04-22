
# 🪄 Potter App - Microfrontend de Harry Potter

Este proyecto corresponde al microfrontend `potter-app`, el cual se integra dentro de la `host-app` usando **Module Federation** a través de `vite-plugin-federation`.

## 🚀 Tecnologías

- ⚡ [Vite](https://vitejs.dev/)
- 🧩 [vite-plugin-federation](https://github.com/originjs/vite-plugin-federation)
- ⚛️ React + TypeScript
- 🧪 [Vitest](https://vitest.dev/)
- 🌍 [i18next](https://www.i18next.com/) para internacionalización (i18n)

## 📦 Estructura del Proyecto

```
potter-app/
├── src/
│   ├── components/   # Componentes reutilizables
│   ├── hooks/        # Custom hooks
│   ├── pages/        # Páginas del microfrontend
│   ├── styles/       # Estilos globales y locales
│   └── types/        # Tipado y modelos
├── index.html
├── vite.config.ts    # Configuración de federación
└── ...
```

## 🔗 Dependencias Remotas

Este microfrontend consume recursos del `host-app`, como las traducciones i18n compartidas, mediante la configuración de `remotes`:

```ts
remotes: {
  host: 'http://localhost:5174/assets/remoteEntry.js'
}
```

## ⚙️ Scripts

| Comando       | Descripción                           |
|--------------|---------------------------------------|
| `npm run dev`     | Inicia el servidor de desarrollo      |
| `npm run build`   | Construye la aplicación para producción |
| `npm run preview` | Previsualiza el build de producción  |
| `npm run test`    | Ejecuta los tests con Vitest         |

## 🧪 Testing

El proyecto está configurado con **Vitest** y las siguientes herramientas para testing:

- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `jsdom`

Las pruebas están organizadas por componente y ubicadas dentro de cada carpeta correspondiente, con la convención `.test.tsx`.

```bash
npm run test
```

## 📦 Build y uso

Instalar dependencias:

```bash
npm install
```

Correr entorno de desarrollo (requiere que `host-app` esté levantado en el puerto `5174`):

```bash
npm run preview
```

## 💡 Notas

- Las traducciones se consumen desde el host de forma remota usando i18n.
- Este proyecto se desarrolló como parte de un challenge técnico.

## 👤 Autor

Alexandro García ✨  
Challenge técnico para [N5](https://www.n5now.com/)
