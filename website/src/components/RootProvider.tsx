'use client';

import React from 'react';
import { MantineProvider } from '@mantine/core';
import { Provider as JotaiProvider } from 'jotai';
import { NavigationProgress } from '@mantine/nprogress';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { theme } from '@assets';
import { HandleOnComplete } from '@libs/navigation-progress';

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const RootProvider: React.FC<Props> = ({ children }) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme={'dark'}>
      <NavigationProgress />
      <HandleOnComplete />
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          {children}
          {/*<DevTools />*/}
          <ReactQueryDevtools />
        </JotaiProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};
export default RootProvider;
