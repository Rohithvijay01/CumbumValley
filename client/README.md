# 🌿 AgriConnect - Client Application (Frontend)

React 19 single-page client powered by Vite 8, Redux Toolkit, and Tailwind CSS v4.

> 📖 **Main Documentation**: For the full system architecture, API documentation, screenshots, and setup instructions, please see the [Root README.md](../README.md).

## 🚀 Quick Start (Client Only)

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start Vite dev server
npm run dev
# Or run direct binary:
# node node_modules/vite/bin/vite.js
```

App will run at: `http://localhost:5173/`

## 🛠️ Key Frontend Highlights

- **React 19**: Modern component structure using Hooks, Suspense, and functional components.
- **Redux Toolkit**: Centralized state management for Authentication (`authSlice`) and User Info.
- **Tailwind CSS v4**: CSS-first design token setup with `@import "tailwindcss";` and `@theme`.
- **Global Theme Engine**: `ThemeContext` providing Light/Dark mode with automatic system preference detection and `localStorage` persistence.
- **AgriBrain AI Assistant**: Interactive modals with Recharts price forecasting visualizers.
