import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WarrantiesPage from "./pages/Warranties";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Main Application Component
 * 
 * Sets up routing, global providers, and the application structure.
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Main warranties page */}
          <Route path="/" element={<Navigate to="/warranties" replace />} />
          <Route path="/warranties" element={<WarrantiesPage />} />
          
          {/* Authentication */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  </QueryClientProvider>
);

export default App;
