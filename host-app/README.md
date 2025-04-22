
# 🧩 Host App - Microfrontend Container

Este proyecto es la aplicación contenedora principal (`host-app`) que integra dos microfrontends remotos: `potter-app` y `rick-and-morty-app`. La integración está hecha utilizando **Module Federation** a través de `vite-plugin-federation`.

## 🚀 Tecnologías

- ⚡ [Vite](https://vitejs.dev/) - Bundler ultrarrápido.
- 🧩 [vite-plugin-federation](https://github.com/originjs/vite-plugin-federation) - Soporte para microfrontends.
- ⚛️ React + TypeScript
- 🌐 [i18n](https://react.i18next.com/) - Soporte multilenguaje con `react-i18next`.
- 🧪 [Vitest](https://vitest.dev/) - Testing framework rápido y moderno.

## 📦 Estructura

```
host-app/
├── src/
│   ├── components/     # Componentes locales
│   ├── containers/     # Carga dinámica de microfrontends
│   ├── i18n/           # Configuración de internacionalización
│   ├── styles/         # Estilos globales y temas
│   └── App.tsx         # Configuración de rutas y layout
├── index.html          # Archivo HTML principal
├── vite.config.ts      # Configuración de federación
└── ...
```

## 🔗 Microfrontends Conectados

- [`potter-app`](../potter-app)
- [`rick-and-morty-app`](../rick-and-morty-app)

Ambos son consumidos dinámicamente como `remoteEntry` mediante `vite-plugin-federation`.

## ⚙️ Configuración de Federación

En `vite.config.ts`:

```ts
federation({
  name: 'host-app',
  remotes: {
    'potterApp': 'http://localhost:4174/assets/remoteEntry.js',
    'rickApp': 'http://localhost:5173/assets/remoteEntry.js'
  }
})
```

## 🛠️ Scripts

| Comando         | Descripción                                |
|-----------------|--------------------------------------------|
| `npm run dev`      | Levanta el servidor de desarrollo.         |
| `npm run build`    | Genera los archivos para producción.       |
| `npm run preview`  | Previsualiza el build generado.            |
| `npm run test`     | Ejecuta las pruebas con Vitest.           |

## 🧪 Testing

Este proyecto utiliza **Vitest** para las pruebas unitarias. Las pruebas están organizadas por componente y siguen la convención `.test.tsx`.

Para ejecutar las pruebas, simplemente utiliza:

```bash
npm run test
```

## 🧑‍💻 Cómo Correr el Proyecto

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el entorno de desarrollo (junto con los microfrontends remotos):

   ```bash
   npm run dev
   ```

> Asegúrate de tener corriendo también los proyectos `potter-app` y `rick-and-morty-app` en sus respectivos puertos (`4174` y `5173`).

## 🌐 Internacionalización

Este proyecto utiliza `react-i18next` para la gestión de traducciones, permitiendo soporte multilenguaje de forma escalable y mantenible.

## 📸 Demo

Una vez iniciado el proyecto, se verá un layout común que carga dinámicamente los microfrontends de `potter-app` y `rick-and-morty-app`. Cada uno se integra de forma aislada pero coherente visualmente.

## 💡 Notas

- Cada microfrontend está aislado en su propio repositorio, manteniendo la modularidad.
- Este proyecto fue diseñado como parte de un challenge técnico, con énfasis en modularidad, escalabilidad y rendimiento.

## 👤 Autor

Alexandro García ✨  
Challenge técnico para [N5](https://www.n5now.com/)