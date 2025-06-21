# GoGoPower UI

This is the frontend application for the GoGoPower platform, built using [Vue 3](https://vuejs.org/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), and [Pinia](https://pinia.vuejs.org/).

## 📦 Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Vite
- Tailwind CSS
- Pinia (State Management)
- Axios (HTTP requests)

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The app will be available at:

```
http://localhost:5173
```

> Make sure the backend server is running on `http://localhost:8080` (or the value defined in your API config).

### 4. Build for Production

```bash
npm run build
# or
yarn build
```

### 5. Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## ⚙️ Environment Configuration

Make sure to configure your API base URL. You can create a `config.ts` file or use `import.meta.env` variables via `.env` files like so:

```ts
// config.ts
export const API_BASE_URL = "http://localhost:8080";
```

## 📁 Project Structure (Simplified)

```
src/
├── components/         # Vue components (table, cards, modal)
├── stores/             # Pinia stores
├── views/              # Page-level components
├── App.vue             # Main app shell
├── main.ts             # App entry point
└── config.ts           # API base config
```

## 🛠 Styling

Tailwind CSS is used for styling. You can customize the theme in `tailwind.config.js`.
