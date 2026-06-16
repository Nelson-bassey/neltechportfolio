<<<<<<< HEAD
<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
# 🚀 3D Portfolio Website

A modern and interactive 3D portfolio website built to showcase my projects, skills, and professional journey through immersive visuals, smooth animations, and a responsive user experience.

## ✨ Features

- Interactive 3D graphics and animations
- Responsive design for all devices
- Smooth transitions and user interactions
- Project showcase section
- Skills and technology overview
- Contact section for collaboration opportunities
- Optimized performance and clean UI

## 🛠️ Tech Stack

- React.js
- Three.js
- React Three Fiber
- Tailwind CSS
- Framer Motion
- Vite

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/your-username/portfolio.git
>>>>>>> ccd6cf6b9a3d359814508f16b393138c2d79ce7c
=======
🚀 3D Portfolio Website A modern and interactive 3D portfolio website built to showcase my projects, skills, and professional journey through immersive visuals, smooth animations, and a responsive user experience.  ✨ Features Interactive 3D graphics and animations Responsive design for all devices Smooth transitions and user interactions Project showcase section Skills and technology overview Contact section for collaboration opportunities Optimized performance and clean UI 🛠️ Tech Stack React.js Three.js React Three Fiber Tailwind CSS Framer Motion Vite 🚀 Getting Started
>>>>>>> b5a7833f75362951f445f4675ede70901d955e2c
# neltechportfolio
# neltechportfolio
