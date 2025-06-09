
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './hooks/use-auth';

const root = createRoot(document.getElementById("root")!);

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
