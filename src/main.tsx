import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
// Self-hosted webfonts (latin subset only, same weights as before)
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/latin-600.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/cormorant-garamond/latin-500-italic.css';
import '@fontsource/raleway/latin-300.css';
import '@fontsource/raleway/latin-400.css';
import '@fontsource/raleway/latin-500.css';
import '@fontsource/raleway/latin-600.css';
import './styles/index.css';

// Adobe Fonts (rl-limo) – loaded without blocking the first paint.
const typekit = document.createElement('link');
typekit.rel = 'stylesheet';
typekit.href = 'https://use.typekit.net/txv6ofc.css';
document.head.appendChild(typekit);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
