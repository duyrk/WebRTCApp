'use client';
import { Welcome } from '@app/components/Welcome/Welcome';
import { ColorSchemeToggle } from '@app/components/ColorSchemeToggle/ColorSchemeToggle';
import React from 'react';

export default function RootPage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
