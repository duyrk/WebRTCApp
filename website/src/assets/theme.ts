'use client';
import { groteskFont } from './font';
import { Button, createTheme, MantineColorsTuple } from '@mantine/core';
import { buttonStyles } from '@assets/styles';

interface IColors {
  [key: string]: MantineColorsTuple;
}

export const theme = createTheme({
  /* Put your mantine theme override here */
  fontFamily: groteskFont.style.fontFamily,
  components: {
    Button: Button.extend({
      classNames: buttonStyles,
    }),
  },
});
