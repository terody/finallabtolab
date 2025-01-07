import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { initDatabase } from './lib/initDatabase';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Initialize database
initDatabase();

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);