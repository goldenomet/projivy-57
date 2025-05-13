
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from './App.tsx'
import './index.css'

const root = createRoot(document.getElementById("root")!);

// Create the query client inside the render function
root.render(
  <QueryClientProvider client={new QueryClient()}>
    <App />
  </QueryClientProvider>
);
