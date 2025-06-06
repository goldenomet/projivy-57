
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './hooks/use-auth';

const root = createRoot(document.getElementById("root")!);

// Create the query client inside the render function
root.render(
  <BrowserRouter>
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
