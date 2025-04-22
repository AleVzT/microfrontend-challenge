# 🧩 Microfrontends Challenge - N5

Este repositorio contiene una arquitectura de microfrontends construida con **Vite**, **React** y **Module Federation**, utilizando `vite-plugin-federation`.

El proyecto está compuesto por una aplicación contenedora (**host-app**) y dos microfrontends remotos (**potter-app** y **rick-and-morty-app**).

## 📁 Estructura del Monorepo

├── host-app/               # App contenedora principal
├── potter-app/             # Microfrontend de Harry Potter
├── rick-and-morty-app/     # Microfrontend de Rick and Morty
└── README.md               # Este archivo

Cada aplicación tiene su propio `README.md` con instrucciones detalladas, estructura, configuración y scripts.

## 🚀 Tecnologías utilizadas

- ⚡ [Vite](https://vitejs.dev/)
- 🧩 [vite-plugin-federation](https://github.com/originjs/vite-plugin-federation)
- ⚛️ React + TypeScript
- 🧪 [Vitest](https://vitest.dev/) para testing
- 🌐 `react-i18next` para internacionalización
- 🎨 Styled Components para estilos

## 🔗 Comunicación entre microfrontends

Se utiliza **Module Federation** para compartir recursos entre aplicaciones.  
Por ejemplo, `potter-app` consume la configuración de internacionalización desde `host-app` gracias a la federación.

## 🧪 Testing

Cada app incluye pruebas unitarias y de integración utilizando `Vitest` junto a `@testing-library/react`.

## ▶️ Cómo correr el proyecto

### 1. Cloná el repositorio:

```bash
git clone https://github.com/tu-usuario/microfrontends-challenge.git
cd microfrontends-challenge
```

### 2. Instalá las dependencias (en cada subproyecto):

```bash
cd host-app && npm install
cd ../potter-app && npm install
cd ../rick-and-morty-app && npm install
```

### 3. Iniciá todas las apps:

```bash
# En terminales separadas

# host-app
cd host-app && npm run preview

# potter-app
cd ../potter-app && npm run preview

# rick-and-morty-app
cd ../rick-and-morty-app && npm run preview
```

Asegurate de que cada app use su puerto correspondiente:

- host-app: 5174
- potter-app: 4174
- rick-and-morty-app: 5173

## 📸 Demo

Una vez que todas las apps estén corriendo, accedé a http://localhost:5174 para ver la integración en funcionamiento.

## 👨‍💻 Autor

Alexandro Garcia  
Challenge técnico para N5