import React from 'react';
import { TradingProvider } from './context/TradingContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <TradingProvider>
      <AppRoutes />
    </TradingProvider>
  );
}

export default App;
