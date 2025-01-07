import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/index';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Debug from './components/Debug';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
          <Debug />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}