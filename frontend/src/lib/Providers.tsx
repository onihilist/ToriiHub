import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';

interface AppProvidersProps {
  children: React.ReactNode;
}

// Wraps the app with the React Query client. Mounted high in the tree so every
// feature can call the data hooks.
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default AppProviders;
