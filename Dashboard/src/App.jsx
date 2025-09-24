import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { TradingProvider } from './context/TradingContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <TradingProvider>
        <AppRoutes />
      </TradingProvider>
    </AuthProvider>
  );
}

export default App;
