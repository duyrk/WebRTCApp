import React from 'react';
import { Metadata } from 'next';
import '@mantine/core/styles.css';
import { ColorSchemeScript } from '@mantine/core';
import { RootProvider } from '@components';
import '@global/global.css';

export const metadata: Metadata = {
  title: 'Kurosaw Anime',
  description: 'Online Anime Streaming website',
};
export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
