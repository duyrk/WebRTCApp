'use client';
import { groteskFont } from './font';
import { createTheme, MantineColorsTuple } from '@mantine/core';
interface IColors {
  [key: string]: MantineColorsTuple;
}

export const theme = createTheme({
  /* Put your mantine theme override here */
  fontFamily: groteskFont.style.fontFamily,
});
