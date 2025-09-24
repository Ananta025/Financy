import { useContext } from 'react';
import { TradingStateContext, TradingDispatchContext } from './TradingContext.jsx';

export function useTradingState() {
  const context = useContext(TradingStateContext);
  if (context === undefined) {
    throw new Error('useTradingState must be used within a TradingProvider');
  }
  return context;
}

export function useTradingDispatch() {
  const context = useContext(TradingDispatchContext);
  if (context === undefined) {
    throw new Error('useTradingDispatch must be used within a TradingProvider');
  }
  return context;
}

// Combined hook for convenience
export function useTrading() {
  return {
    ...useTradingState(),
    dispatch: useTradingDispatch()
  };
}