'use client';

import React from 'react';
import { theme } from '@assets';
import { DevTools } from 'jotai-devtools';
import { MantineProvider } from '@mantine/core';
import { Provider as JotaiProvider } from 'jotai';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
type Props = {
  children: React.ReactNode;
};
const queryClient = new QueryClient();
const RootProvider: React.FC<Props> = ({ children }) => {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          {children}
          <DevTools />
          <ReactQueryDevtools />
        </JotaiProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};
export default RootProvider;
