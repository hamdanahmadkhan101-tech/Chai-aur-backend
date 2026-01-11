# VidTube Frontend

A modern, high-performance video sharing platform built with React 19, featuring glassmorphism design, adaptive video streaming, and optimized user experience.

## 🚀 Features

### Core Features

- ✅ **Video Playback**: Professional video player with HLS.js support for adaptive bitrate streaming
- ✅ **Authentication**: Secure JWT-based authentication with HTTP-only cookies
- ✅ **Video Feed**: Infinite scroll home feed with trending videos
- ✅ **Comments System**: Real-time comments with nested replies and likes
- ✅ **Subscriptions**: Channel subscription management
- ✅ **Search**: Debounced search with filters and sorting

### Technical Features

- 🎨 **Modern Design**: Glassmorphism/Liquid Lux aesthetic with OLED black theme
- ⚡ **Performance Optimized**:
  - Route-based code splitting with React.lazy
  - TanStack Query for server state caching
  - Virtualized lists for comments
  - Image lazy loading
- 🔒 **Security First**:
  - XSS protection with DOMPurify
  - HTTP-only cookie authentication
  - Protected routes
  - Input validation with Zod
- 📱 **Responsive**: Mobile-first design with adaptive layouts
- 🎭 **Smooth Animations**: Framer Motion for fluid UI transitions

## 📦 Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **TanStack Query** - Server state management
- **Zustand** - Lightweight client state
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library
- **React Hook Form + Zod** - Form validation
- **Axios** - HTTP client
- **HLS.js** - Adaptive video streaming
- **DOMPurify** - XSS sanitization

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running (see vidtube-backend)

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env`:

   ```env
   VITE_API_BASE_URL=http://localhost:8080/api/v1
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Design System

### Glassmorphism Theme

- **Background**: Pure OLED black (#000000)
- **Primary**: Purple (#8b5cf6)
- **Accent**: Blue (#3b82f6)
- **Glass Effects**: backdrop-blur with transparent backgrounds

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ using modern web technologies**

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

````

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
````
