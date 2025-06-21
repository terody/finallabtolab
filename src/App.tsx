import { BrowserRouter } from "react-router-dom";
import Debug from "./components/Debug";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./context/AuthProvider";
import AppRoutes from "./routes/index";

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
